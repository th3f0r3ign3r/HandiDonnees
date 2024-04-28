import httpStatus from 'http-status';
import { Request, Response } from 'express';
import articleService from './article.service';
import catchAsync from '../../core/utils/catch_async';
import ApiError from '../../core/utils/api_error';
import { pick } from '../../core/utils/shared.utils';
import { AppRequest } from 'src/core/interfaces/app.interface';

export default class ArticleController {
    private service;
    constructor() {
        this.service = articleService;
    }

    /**
     * Create a new article
     */
    public create = catchAsync(async (req: AppRequest, res: Response) => {
        req.body.author = req.user.id;
        const article = await this.service.create(req.body);
        res.status(httpStatus.CREATED).json(article);
    });

    /**
     * Get all articles in paginated format
     */
    public find = catchAsync(async (req: Request, res: Response) => {
        const filter = pick(req.query, ['title']);
        const options = pick(req.query, ['sortBy', 'limit', 'page']);
        const result = await this.service.query(filter, options);
        res.status(httpStatus.OK).json(result);
    });

    /**
     * Get one article by ID
     */
    public findOne = catchAsync(async (req: Request, res: Response) => {
        const articleId = Number(req.params.id);
        const article = await this.service.findById(Number(articleId));
        if (!article) throw new ApiError(httpStatus.NOT_FOUND, 'Article not found');

        res.status(httpStatus.OK).json(article);
    });

    /**
     * Update one article
     */
    public update = catchAsync(async (req: Request, res: Response) => {
        const articleId = Number(req.params.id);
        const article = await this.service.update(Number(articleId), req.body);
        res.status(httpStatus.OK).json(article);
    });

    /**
     * delete one article
     */
    public remove = catchAsync(async (req: Request, res: Response) => {
        await this.service.remove(Number(req.params.id));
        res.status(httpStatus.OK).json();
    });
}
