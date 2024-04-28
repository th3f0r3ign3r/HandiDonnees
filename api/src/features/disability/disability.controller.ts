import httpStatus from 'http-status';
import { Request, Response } from 'express';
import userService from './disability.service';
import catchAsync from '../../core/utils/catch_async';
import ApiError from '../../core/utils/api_error';
import { pick } from '../../core/utils/shared.utils';

export default class DisabilityController {
    private service;
    constructor() {
        this.service = userService;
    }

    /**
     * Create a new disability
     */
    public create = catchAsync(async (req: Request, res: Response) => {
        const disability = await this.service.create(req.body);
        res.status(httpStatus.CREATED).json(disability);
    });

    /**
     * Get all users in paginated format
     */
    public find = catchAsync(async (req: Request, res: Response) => {
        const filter = pick(req.query, ['type']);
        const options = pick(req.query, ['sortBy', 'limit', 'page']);
        const result = await this.service.query(filter, options);
        res.status(httpStatus.OK).json(result);
    });

    /**
     * Get one disability by ID
     */
    public findOne = catchAsync(async (req: Request, res: Response) => {
        const disabilityId = Number(req.params.id);
        const disability = await this.service.findById(Number(disabilityId));
        if (!disability) throw new ApiError(httpStatus.NOT_FOUND, 'Disability not found');

        res.status(httpStatus.OK).json(disability);
    });

    /**
     * Update one disability
     */
    public update = catchAsync(async (req: Request, res: Response) => {
        const disabilityId = Number(req.params.id);
        const disability = await this.service.update(Number(disabilityId), req.body);
        res.status(httpStatus.OK).json(disability);
    });

    /**
     * delete one disability
     */
    public remove = catchAsync(async (req: Request, res: Response) => {
        await this.service.remove(Number(req.params.disabilityId));
        res.status(httpStatus.OK).json();
    });
}
