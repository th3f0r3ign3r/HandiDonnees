import httpStatus from 'http-status';
import { Request, Response } from 'express';
import jobOfferService from './job.offer.service';
import catchAsync from '../../core/utils/catch_async';
import ApiError from '../../core/utils/api_error';
import { pick } from '../../core/utils/shared.utils';
import { AppRequest } from 'src/core/interfaces/app.interface';

export default class JobOfferController {
    private service;
    constructor() {
        this.service = jobOfferService;
    }

    /**
     * Create a new jobOffer
     */
    public create = catchAsync(async (req: AppRequest, res: Response) => {
        req.body.createdBy = req.user.id;
        const jobOffer = await this.service.create(req.body);
        res.status(httpStatus.CREATED).json(jobOffer);
    });

    /**
     * Get all jobOffers in paginated format
     */
    public find = catchAsync(async (req: Request, res: Response) => {
        const filter = pick(req.query, ['title', 'employer']);
        const options = pick(req.query, ['sortBy', 'limit', 'page']);
        const result = await this.service.query(filter, options);
        res.status(httpStatus.OK).json(result);
    });

    /**
     * Get one jobOffer by ID
     */
    public findOne = catchAsync(async (req: Request, res: Response) => {
        const jobOfferId = Number(req.params.id);
        const jobOffer = await this.service.findById(Number(jobOfferId));
        if (!jobOffer) throw new ApiError(httpStatus.NOT_FOUND, 'JobOffer not found');

        res.status(httpStatus.OK).json(jobOffer);
    });

    /**
     * Update one jobOffer
     */
    public update = catchAsync(async (req: Request, res: Response) => {
        const jobOfferId = Number(req.params.id);
        const jobOffer = await this.service.update(Number(jobOfferId), req.body);
        res.status(httpStatus.OK).json(jobOffer);
    });

    /**
     * delete one jobOffer
     */
    public remove = catchAsync(async (req: Request, res: Response) => {
        await this.service.remove(Number(req.params.id));
        res.status(httpStatus.OK).json();
    });
}
