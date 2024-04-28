import httpStatus from 'http-status';
import ApiError from '../../core/utils/api_error';
import { Disability } from './disability.entity';
import { dbSource } from '../../core/database/db.source';
import { FindOptions } from 'typeorm';
import { SortByOrder } from '../../core/types/app.type';

class DisabilityService {
    private static instance: DisabilityService;
    private repo;

    constructor() {
        this.repo = dbSource.getRepository(Disability);
    }

    /**
     * Create a disability
     */
    public async create(disabilityBody: Disability): Promise<Disability> {
        const data: Disability = await this.repo.findOne({
            where: { type: disabilityBody.type },
        });
        if (data) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Type already taken');
        }

        const createdDisabilityData: Disability = await this.repo.save({ ...disabilityBody });
        return createdDisabilityData;
    }

    /**
     * Query for disabilitys
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

            const queryBuilder = this.repo.createQueryBuilder('disability');

            // Apply filters
            if (filter) {
                queryBuilder.where(filter);
            }

            // Apply sorting
            if (sortBy) {
                const sortConditions = sortBy.split(';');
                sortConditions.forEach((sortCondition) => {
                    const [column, order] = sortCondition.split(':');
                    queryBuilder.addOrderBy(
                        `disability.${column}`,
                        order.toUpperCase() as SortByOrder
                    );
                });
            }

            // Count total results
            const totalResults = await queryBuilder.getCount();

            // Apply pagination
            queryBuilder.skip((page - 1) * limit).take(limit);

            // Get paginated disabilitys
            const datas = await queryBuilder.getMany();

            const totalPages = Math.ceil(totalResults / limit);

            return {
                datas: datas as unknown as Disability[],
                page,
                limit,
                totalPages,
                totalResults,
            };
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
        }
    }

    public async findAll(): Promise<Disability[]> {
        const disabilitys: Disability[] = await this.repo.find();

        return disabilitys;
    }
    /**
     * Get disability by id
     */
    public async findById(id: number) {
        const data: Disability = await this.repo.findOne({ where: { id: id } });

        if (!data) throw new ApiError(httpStatus.NOT_FOUND, "Disability doesn't exist");

        return data;
    }

    /**
     * Update disability by id
     */
    public async update(
        disabilityId: number,
        updateBody: Partial<Disability>
    ): Promise<Disability> {
        const findDisability: Disability = await this.repo.findOne({
            where: { id: disabilityId },
        });
        if (!findDisability) throw new ApiError(httpStatus.NOT_FOUND, "Disability doesn't exist");

        const dataUpdated: Disability = {
            ...findDisability,
            ...updateBody,
        } as Disability;

        await this.repo.save(dataUpdated);

        const data: Disability = await this.repo.findOne({
            where: { id: disabilityId },
        });
        return data;
    }

    /**
     * Delete disability by id
     * @param {ObjectId} disabilityId
     * @returns {Promise<Disability>}
     */
    public async remove(disabilityId: number): Promise<Disability> {
        const data: Disability = await this.repo.findOne({ where: { id: disabilityId } });
        if (!data) {
            throw new ApiError(httpStatus.NOT_FOUND, "Disability doesn't exist");
        }
        await this.repo.delete({ id: disabilityId });
        return data;
    }

    /**
     * Get an instance of this class
     * @returns {DisabilityService} DisabilityService instance
     */
    public static getInstance(): DisabilityService {
        if (!DisabilityService.instance) {
            DisabilityService.instance = new DisabilityService();
        }
        return DisabilityService.instance;
    }
}

export default DisabilityService.getInstance();
