import httpStatus from 'http-status';
import ApiError from '../../core/utils/api_error';
import { dbSource } from '../../core/database/db.source';
import { FindOptions } from 'typeorm';
import { SortByOrder } from '../../core/types/app.type';
import { Region } from './region.entity';

class RegionService {
    private static instance: RegionService;
    private repo;

    constructor() {
        this.repo = dbSource.getRepository(Region);
    }

    /**
     * Create a region
     */
    public async create(regionBody: Region): Promise<Region> {
        const data: Region = await this.repo.findOne({
            where: { name: regionBody.name },
        });
        if (data) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Name already taken');
        }

        const createdRegionData: Region = await this.repo.save({ ...regionBody });
        return createdRegionData;
    }

    /**
     * Query for regions
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

            const queryBuilder = this.repo.createQueryBuilder('region');

            // Apply filters
            if (filter) {
                queryBuilder.where(filter);
            }

            // Apply sorting
            if (sortBy) {
                const sortConditions = sortBy.split(';');
                sortConditions.forEach((sortCondition) => {
                    const [column, order] = sortCondition.split(':');
                    queryBuilder.addOrderBy(`region.${column}`, order.toUpperCase() as SortByOrder);
                });
            }

            // Count total results
            const totalResults = await queryBuilder.getCount();

            // Apply pagination
            queryBuilder.skip((page - 1) * limit).take(limit);

            // Get paginated regions
            const datas = await queryBuilder.getMany();

            const totalPages = Math.ceil(totalResults / limit);

            return {
                datas: datas as unknown as Region[],
                page,
                limit,
                totalPages,
                totalResults,
            };
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
        }
    }

    public async findAll(): Promise<Region[]> {
        const regions: Region[] = await this.repo.find();

        return regions;
    }
    /**
     * Get region by id
     */
    public async findById(id: number) {
        const data: Region = await this.repo.findOne({ where: { id: id } });

        if (!data) throw new ApiError(httpStatus.NOT_FOUND, "Region doesn't exist");

        return data;
    }

    /**
     * Update region by id
     */
    public async update(regionId: number, updateBody: Partial<Region>): Promise<Region> {
        const findRegion: Region = await this.repo.findOne({
            where: { id: regionId },
        });
        if (!findRegion) throw new ApiError(httpStatus.NOT_FOUND, "Region doesn't exist");

        const dataUpdated: Region = { ...findRegion, ...updateBody } as Region;

        await this.repo.save(dataUpdated);

        const data: Region = await this.repo.findOne({
            where: { id: regionId },
        });
        return data;
    }

    /**
     * Delete region by id
     * @param {ObjectId} regionId
     * @returns {Promise<Region>}
     */
    public async remove(regionId: number): Promise<Region> {
        const data: Region = await this.repo.findOne({ where: { id: regionId } });
        if (!data) {
            throw new ApiError(httpStatus.NOT_FOUND, "Region doesn't exist");
        }
        await this.repo.delete({ id: regionId });
        return data;
    }

    /**
     * Get an instance of this class
     * @returns {RegionService} RegionService instance
     */
    public static getInstance(): RegionService {
        if (!RegionService.instance) {
            RegionService.instance = new RegionService();
        }
        return RegionService.instance;
    }
}

export default RegionService.getInstance();
