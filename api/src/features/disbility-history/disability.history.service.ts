import httpStatus from 'http-status';
import ApiError from '../../core/utils/api_error';
import { DisabilityHistory } from './disability.history.entity';
import { dbSource } from '../../core/database/db.source';
import { FindOptions } from 'typeorm';
import { SortByOrder } from '../../core/types/app.type';

class DisabilityHistoryService {
    private static instance: DisabilityHistoryService;
    private repo;

    constructor() {
        this.repo = dbSource.getRepository(DisabilityHistory);
    }

    /**
     * Create a disabilityHistory
     */
    public async create(disabilityHistoryBody: DisabilityHistory): Promise<DisabilityHistory> {
        const data: DisabilityHistory = await this.repo.findOne({
            where: { disability: disabilityHistoryBody.id },
        });
        if (data) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Disability History already exist');
        }

        const createdDisabilityHistoryData: DisabilityHistory = await this.repo.save({
            ...disabilityHistoryBody,
        });
        return createdDisabilityHistoryData;
    }

    /**
     * Query for disabilityHistorys
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

            const queryBuilder = this.repo.createQueryBuilder('disabilityHistory');

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
                        `disabilityHistory.${column}`,
                        order.toUpperCase() as SortByOrder
                    );
                });
            }

            // Count total results
            const totalResults = await queryBuilder.getCount();

            // Apply pagination
            queryBuilder.skip((page - 1) * limit).take(limit);

            // Get paginated disabilityHistorys
            const datas = await queryBuilder.getMany();

            const totalPages = Math.ceil(totalResults / limit);

            return {
                datas: datas as unknown as DisabilityHistory[],
                page,
                limit,
                totalPages,
                totalResults,
            };
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
        }
    }

    public async findAll(): Promise<DisabilityHistory[]> {
        const disabilityHistorys: DisabilityHistory[] = await this.repo.find();

        return disabilityHistorys;
    }
    /**
     * Get disabilityHistory by id
     */
    public async findById(id: number) {
        const data: DisabilityHistory = await this.repo.findOne({ where: { id: id } });

        if (!data) throw new ApiError(httpStatus.NOT_FOUND, "DisabilityHistory doesn't exist");

        return data;
    }

    /**
     * Update disabilityHistory by id
     */
    public async update(
        disabilityHistoryId: number,
        updateBody: Partial<DisabilityHistory>
    ): Promise<DisabilityHistory> {
        const findDisabilityHistory: DisabilityHistory = await this.repo.findOne({
            where: { id: disabilityHistoryId },
        });
        if (!findDisabilityHistory)
            throw new ApiError(httpStatus.NOT_FOUND, "DisabilityHistory doesn't exist");

        const dataUpdated: DisabilityHistory = {
            ...findDisabilityHistory,
            ...updateBody,
        } as DisabilityHistory;

        await this.repo.save(dataUpdated);

        const data: DisabilityHistory = await this.repo.findOne({
            where: { id: disabilityHistoryId },
        });
        return data;
    }

    /**
     * Delete disabilityHistory by id
     * @param {ObjectId} disabilityHistoryId
     * @returns {Promise<DisabilityHistory>}
     */
    public async remove(disabilityHistoryId: number): Promise<DisabilityHistory> {
        const data: DisabilityHistory = await this.repo.findOne({
            where: { id: disabilityHistoryId },
        });
        if (!data) {
            throw new ApiError(httpStatus.NOT_FOUND, "DisabilityHistory doesn't exist");
        }
        await this.repo.delete({ id: disabilityHistoryId });
        return data;
    }

    /**
     * Get an instance of this class
     * @returns {DisabilityHistoryService} DisabilityHistoryService instance
     */
    public static getInstance(): DisabilityHistoryService {
        if (!DisabilityHistoryService.instance) {
            DisabilityHistoryService.instance = new DisabilityHistoryService();
        }
        return DisabilityHistoryService.instance;
    }
}

export default DisabilityHistoryService.getInstance();
