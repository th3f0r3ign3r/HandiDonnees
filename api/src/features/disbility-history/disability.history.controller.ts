import httpStatus from 'http-status';
import { Request, Response } from 'express';
import disabilityHistoryService from './disability.history.service';
import catchAsync from '../../core/utils/catch_async';
import ApiError from '../../core/utils/api_error';
import { pick } from '../../core/utils/shared.utils';

export default class DisabilityHistoryController {
    private service;
    constructor() {
        this.service = disabilityHistoryService;
    }

    /**
     * Create a new disabilityHistory
     */
    public create = catchAsync(async (req: Request, res: Response) => {
        const disabilityHistory = await this.service.create(req.body);
        res.status(httpStatus.CREATED).json(disabilityHistory);
    });

    /**
     * Get all disabilityHistories in paginated format
     */
    public find = catchAsync(async (req: Request, res: Response) => {
        const filter = pick(req.query, ['date']);
        const options = pick(req.query, ['sortBy', 'limit', 'page']);
        const result = await this.service.query(filter, options);
        res.status(httpStatus.OK).json(result);
    });

    /**
     * Get one disabilityHistory by ID
     */
    public findOne = catchAsync(async (req: Request, res: Response) => {
        const disabilityHistoryId = Number(req.params.id);
        const disabilityHistory = await this.service.findById(Number(disabilityHistoryId));
        if (!disabilityHistory)
            throw new ApiError(httpStatus.NOT_FOUND, 'DisabilityHistory not found');

        res.status(httpStatus.OK).json(disabilityHistory);
    });

    /**
     * Update one disabilityHistory
     */
    public update = catchAsync(async (req: Request, res: Response) => {
        const disabilityHistoryId = Number(req.params.id);
        const disabilityHistory = await this.service.update(Number(disabilityHistoryId), req.body);
        res.status(httpStatus.OK).json(disabilityHistory);
    });

    /**
     * delete one disabilityHistory
     */
    public remove = catchAsync(async (req: Request, res: Response) => {
        await this.service.remove(Number(req.params.id));
        res.status(httpStatus.OK).json();
    });
}
