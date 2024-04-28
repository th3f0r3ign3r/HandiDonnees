import httpStatus from 'http-status';
import { Request, Response } from 'express';
import articleCategoryService from './article.category.service';
import catchAsync from '../../core/utils/catch_async';
import ApiError from '../../core/utils/api_error';
import { pick } from '../../core/utils/shared.utils';

export default class ArticleCategoryController {
    private service;
    constructor() {
        this.service = articleCategoryService;
    }

    /**
     * Create a new articleCategory
     */
    public create = catchAsync(async (req: Request, res: Response) => {
        const articleCategory = await this.service.create(req.body);
        res.status(httpStatus.CREATED).json(articleCategory);
    });

    /**
     * Get all articleCategorys in paginated format
     */
    public find = catchAsync(async (req: Request, res: Response) => {
        const filter = pick(req.query, ['name']);
        const options = pick(req.query, ['sortBy', 'limit', 'page']);
        const result = await this.service.query(filter, options);
        res.status(httpStatus.OK).json(result);
    });

    /**
     * Get one articleCategory by ID
     */
    public findOne = catchAsync(async (req: Request, res: Response) => {
        const articleCategoryId = Number(req.params.id);
        const articleCategory = await this.service.findById(Number(articleCategoryId));
        if (!articleCategory) throw new ApiError(httpStatus.NOT_FOUND, 'ArticleCategory not found');

        res.status(httpStatus.OK).json(articleCategory);
    });

    /**
     * Update one articleCategory
     */
    public update = catchAsync(async (req: Request, res: Response) => {
        const articleCategoryId = Number(req.params.id);
        const articleCategory = await this.service.update(Number(articleCategoryId), req.body);
        res.status(httpStatus.OK).json(articleCategory);
    });

    /**
     * delete one articleCategory
     */
    public remove = catchAsync(async (req: Request, res: Response) => {
        await this.service.remove(Number(req.params.id));
        res.status(httpStatus.OK).json();
    });
}
