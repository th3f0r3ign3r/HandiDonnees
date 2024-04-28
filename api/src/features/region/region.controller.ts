import httpStatus from 'http-status';
import { Request, Response } from 'express';
import regionService from './region.service';
import catchAsync from '../../core/utils/catch_async';
import ApiError from '../../core/utils/api_error';
import { pick } from '../../core/utils/shared.utils';

export default class RegionController {
    private service;
    constructor() {
        this.service = regionService;
    }

    /**
     * Create a new region
     */
    public create = catchAsync(async (req: Request, res: Response) => {
        const region = await this.service.create(req.body);
        res.status(httpStatus.CREATED).json(region);
    });

    /**
     * Get all regions in paginated format
     */
    public find = catchAsync(async (req: Request, res: Response) => {
        const filter = pick(req.query, ['name']);
        const options = pick(req.query, ['sortBy', 'limit', 'page']);
        const result = await this.service.query(filter, options);
        res.status(httpStatus.OK).json(result);
    });

    /**
     * Get one region by ID
     */
    public findOne = catchAsync(async (req: Request, res: Response) => {
        const regionId = Number(req.params.id);
        const region = await this.service.findById(Number(regionId));
        if (!region) throw new ApiError(httpStatus.NOT_FOUND, 'Region not found');

        res.status(httpStatus.OK).json(region);
    });

    /**
     * Update one region
     */
    public update = catchAsync(async (req: Request, res: Response) => {
        const regionId = Number(req.params.id);
        const region = await this.service.update(Number(regionId), req.body);
        res.status(httpStatus.OK).json(region);
    });

    /**
     * delete one region
     */
    public remove = catchAsync(async (req: Request, res: Response) => {
        await this.service.remove(Number(req.params.id));
        res.status(httpStatus.OK).json();
    });
}
