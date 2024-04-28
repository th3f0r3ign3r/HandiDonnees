import httpStatus from 'http-status';
import ApiError from '../../core/utils/api_error';
import { Person } from './person.entity';
import { dbSource } from '../../core/database/db.source';
import { FindOptions } from 'typeorm';
import { SortByOrder } from '../../core/types/app.type';
import { DisabilityHistory } from '../disability-history/disability.history.entity';

class PersonService {
    private static instance: PersonService;
    private repo;
    private repoDisabilityHistory;

    constructor() {
        this.repo = dbSource.getRepository(Person);
        this.repoDisabilityHistory = dbSource.getRepository(DisabilityHistory);
    }

    /**
     * Register a new person
     */
    public async create(personBody: Person): Promise<Person> {
        const data: Person = await this.repo.findOne({
            where: { npi: personBody.npi },
        });
        if (data) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'NPI already taken');
        }

        const personDisabilities: DisabilityHistory[] = personBody.disabilities;
        delete personBody.disabilities;

        const person = new Person();
        Object.assign(person, personBody);
        await this.repo.save(person);

        // record all person disabilities
        personDisabilities.forEach(async (disabilityHistory) => {
            await this.repoDisabilityHistory.save({
                ...disabilityHistory,
                person,
            });
        });

        return await this.repo.findOne({
            where: { npi: personBody.npi },
            relations: {
                disabilities: { disability: true },
            },
        });
    }

    /**
     * Query for persons
     */
    public async query(
        filter: FindOptions,
        options: {
            sortBy?: string;
            limit?: number;
            page?: number;
        }
    ) {
        try {
            const { sortBy, limit = 10, page = 1 } = options;

            const queryBuilder = this.repo.createQueryBuilder('person');

            // Apply filters
            if (filter) {
                queryBuilder.where(filter);
            }

            // Apply sorting
            if (sortBy) {
                const sortConditions = sortBy.split(';');
                sortConditions.forEach((sortCondition) => {
                    const [column, order] = sortCondition.split(':');
                    queryBuilder.addOrderBy(`person.${column}`, order.toUpperCase() as SortByOrder);
                });
            }

            // Count total results
            const totalResults = await queryBuilder.getCount();

            // Apply pagination
            queryBuilder.skip((page - 1) * limit).take(limit);

            // Get paginated persons
            const datas = await queryBuilder.getMany();

            const totalPages = Math.ceil(totalResults / limit);

            return {
                datas: datas as unknown as Person[],
                page,
                limit,
                totalPages,
                totalResults,
            };
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
        }
    }

    public async findAll(): Promise<Person[]> {
        const persons: Person[] = await this.repo.find({
            relations: { region: true, disabilities: { disability: true } },
        });

        return persons;
    }
    /**
     * Get person by id
     */
    public async findById(id: number) {
        const data: Person = await this.repo.findOne({
            where: { id },
            relations: { region: true, disabilities: { disability: true } },
        });

        if (!data) throw new ApiError(httpStatus.NOT_FOUND, "Person doesn't exist");

        return data;
    }

    /**
     * Get person by email
     */
    public async findByEmail(email: string) {
        const data: Person = await this.repo.findOne({
            where: { email },
            relations: { region: true, disabilities: { disability: true } },
        });
        if (!data) throw new ApiError(httpStatus.NOT_FOUND, "Person doesn't exist");
        return data;
    }

    /**
     * Get person by email
     */
    public async findByNPI(npi: string) {
        const data: Person = await this.repo.findOne({
            where: { npi },
            relations: { region: true, disabilities: { disability: true } },
        });
        if (!data) throw new ApiError(httpStatus.NOT_FOUND, "Person doesn't exist");

        return data;
    }

    /**
     * Update person by id
     */
    public async update(personId: number, updateBody: Partial<Person>): Promise<Person> {
        const findPerson: Person = await this.repo.findOne({
            where: { id: personId },
            relations: {
                disabilities: { disability: true },
            },
        });
        if (!findPerson) throw new ApiError(httpStatus.NOT_FOUND, "Person doesn't exist");

        if (updateBody.disabilities) {
            // Ensure new data disabilities History are not duplicated
            updateBody.disabilities = Array.from(new Set(updateBody.disabilities));
            // Create new disabilities history if the disability is not already in the person disabilities
            // update others disabilities history if the disability is already in the person disabilities
        }

        const dataUpdated: Person = { ...findPerson, ...updateBody } as Person;
        delete updateBody.disabilities;

        await this.repo.save(dataUpdated);

        const data: Person = await this.repo.findOne({
            where: { id: personId },
        });
        return data;
    }

    /**
     * Delete person by id
     * @param {ObjectId} personId
     * @returns {Promise<Person>}
     */
    public async remove(personId: number): Promise<Person> {
        const data: Person = await this.repo.findOne({ where: { id: personId } });
        if (!data) {
            throw new ApiError(httpStatus.NOT_FOUND, "Person doesn't exist");
        }
        await this.repo.delete({ id: personId });
        return data;
    }

    /**
     * Get an instance of this class
     * @returns {PersonService} PersonService instance
     */
    public static getInstance(): PersonService {
        if (!PersonService.instance) {
            PersonService.instance = new PersonService();
        }
        return PersonService.instance;
    }
}

export default PersonService.getInstance();
