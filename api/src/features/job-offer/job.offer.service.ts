import httpStatus from 'http-status';
import ApiError from '../../core/utils/api_error';
import { JobOffer } from './job.offer.entity';
import { dbSource } from '../../core/database/db.source';
import { FindOptions } from 'typeorm';
import { SortByOrder } from '../../core/types/app.type';

class JobOfferService {
    private static instance: JobOfferService;
    private repo;

    constructor() {
        this.repo = dbSource.getRepository(JobOffer);
    }

    /**
     * Create a jobOffer
     */
    public async create(jobOfferBody: JobOffer): Promise<JobOffer> {
        const createdJobOfferData: JobOffer = await this.repo.save({ ...jobOfferBody });
        return createdJobOfferData;
    }

    /**
     * Query for jobOffers
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

            const queryBuilder = this.repo.createQueryBuilder('jobOffer');

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
                        `jobOffer.${column}`,
                        order.toUpperCase() as SortByOrder
                    );
                });
            }

            // Count total results
            const totalResults = await queryBuilder.getCount();

            // Apply pagination
            queryBuilder.skip((page - 1) * limit).take(limit);

            // Get paginated jobOffers
            const datas = await queryBuilder.getMany();

            const totalPages = Math.ceil(totalResults / limit);

            return {
                datas: datas as unknown as JobOffer[],
                page,
                limit,
                totalPages,
                totalResults,
            };
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
        }
    }

    public async findAll(): Promise<JobOffer[]> {
        const jobOffers: JobOffer[] = await this.repo.find();

        return jobOffers;
    }
    /**
     * Get jobOffer by id
     */
    public async findById(id: number) {
        const data: JobOffer = await this.repo.findOne({ where: { id: id } });

        if (!data) throw new ApiError(httpStatus.NOT_FOUND, "JobOffer doesn't exist");

        return data;
    }

    /**
     * Update jobOffer by id
     */
    public async update(jobOfferId: number, updateBody: Partial<JobOffer>): Promise<JobOffer> {
        const findJobOffer: JobOffer = await this.repo.findOne({
            where: { id: jobOfferId },
        });
        if (!findJobOffer) throw new ApiError(httpStatus.NOT_FOUND, "JobOffer doesn't exist");

        const dataUpdated: JobOffer = {
            ...findJobOffer,
            ...updateBody,
        } as JobOffer;

        await this.repo.save(dataUpdated);

        const data: JobOffer = await this.repo.findOne({
            where: { id: jobOfferId },
        });
        return data;
    }

    /**
     * Delete jobOffer by id
     * @param {ObjectId} jobOfferId
     * @returns {Promise<JobOffer>}
     */
    public async remove(jobOfferId: number): Promise<JobOffer> {
        const data: JobOffer = await this.repo.findOne({ where: { id: jobOfferId } });
        if (!data) {
            throw new ApiError(httpStatus.NOT_FOUND, "JobOffer doesn't exist");
        }
        await this.repo.delete({ id: jobOfferId });
        return data;
    }

    /**
     * Get an instance of this class
     * @returns {JobOfferService} JobOfferService instance
     */
    public static getInstance(): JobOfferService {
        if (!JobOfferService.instance) {
            JobOfferService.instance = new JobOfferService();
        }
        return JobOfferService.instance;
    }
}

export default JobOfferService.getInstance();
