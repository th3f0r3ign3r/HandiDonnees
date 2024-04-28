import httpStatus from 'http-status';
import { Request, Response } from 'express';
import userService from './registration.request.service';
import catchAsync from '../../core/utils/catch_async';
import ApiError from '../../core/utils/api_error';
import { pick } from '../../core/utils/shared.utils';
import { AppRequest } from '../../core/interfaces/app.interface';

export default class UserController {
    private service;
    constructor() {
        this.service = userService;
    }

    /**
     * Create a new user
     */
    public create = catchAsync(async (req: Request, res: Response) => {
        const user = await this.service.create(req.body);
        res.status(httpStatus.CREATED).json(user);
    });

    /**
     * Get all users in paginated format
     */
    public find = catchAsync(async (req: Request, res: Response) => {
        const filter = pick(req.query, ['firstname', 'role', 'lastname']);
        const options = pick(req.query, ['sortBy', 'limit', 'page']);
        const result = await this.service.query(filter, options);
        res.status(httpStatus.OK).json(result);
    });

    /**
     * Get one user by ID
     */
    public findOne = catchAsync(async (req: Request, res: Response) => {
        const userId = Number(req.params.userId);
        const user = await this.service.findById(Number(userId));
        if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');

        res.status(httpStatus.OK).json(user);
    });

    /**
     * Get Current user infos
     */
    public getMe = catchAsync(async (req: AppRequest, res: Response) => {
        const userId = Number(req.user.id);
        const user = await this.service.findById(userId);
        if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');

        res.status(httpStatus.OK).json(user);
    });

    /**
     * Update one user
     */
    public update = catchAsync(async (req: Request, res: Response) => {
        const userId = Number(req.params.userId);
        const user = await this.service.update(Number(userId), req.body);
        res.status(httpStatus.OK).json(user);
    });

    /**
     * Update current user informations
     */
    public updateMe = catchAsync(async (req: AppRequest, res: Response) => {
        const currentUserId = req.user.id;
        const user = await this.service.update(currentUserId, req.body);
        res.status(httpStatus.OK).json(user);
    });

    /**
     * delete one user
     */
    public remove = catchAsync(async (req: Request, res: Response) => {
        await this.service.remove(Number(req.params.userId));
        res.status(httpStatus.OK).json();
    });
}
