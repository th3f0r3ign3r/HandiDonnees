import httpStatus from 'http-status';
import ApiError from '../../core/utils/api_error';
import { ArticleCategory } from './article.category.entity';
import { dbSource } from '../../core/database/db.source';
import { FindOptions } from 'typeorm';
import { SortByOrder } from '../../core/types/app.type';

class ArticleCategoryService {
    private static instance: ArticleCategoryService;
    private repo;

    constructor() {
        this.repo = dbSource.getRepository(ArticleCategory);
    }

    /**
     * Create a articleCategory
     */
    public async create(articleCategoryBody: ArticleCategory): Promise<ArticleCategory> {
        const data: ArticleCategory = await this.repo.findOne({
            where: { name: articleCategoryBody.name },
        });
        if (data) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Name already taken');
        }

        const createdArticleCategoryData: ArticleCategory = await this.repo.save({
            ...articleCategoryBody,
        });
        return createdArticleCategoryData;
    }

    /**
     * Query for articleCategorys
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

            const queryBuilder = this.repo.createQueryBuilder('articleCategory');

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
                        `articleCategory.${column}`,
                        order.toUpperCase() as SortByOrder
                    );
                });
            }

            // Count total results
            const totalResults = await queryBuilder.getCount();

            // Apply pagination
            queryBuilder.skip((page - 1) * limit).take(limit);

            // Get paginated articleCategorys
            const datas = await queryBuilder.getMany();

            const totalPages = Math.ceil(totalResults / limit);

            return {
                datas: datas as unknown as ArticleCategory[],
                page,
                limit,
                totalPages,
                totalResults,
            };
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
        }
    }

    public async findAll(): Promise<ArticleCategory[]> {
        const articleCategorys: ArticleCategory[] = await this.repo.find();

        return articleCategorys;
    }
    /**
     * Get articleCategory by id
     */
    public async findById(id: number) {
        const data: ArticleCategory = await this.repo.findOne({ where: { id: id } });

        if (!data) throw new ApiError(httpStatus.NOT_FOUND, "ArticleCategory doesn't exist");

        return data;
    }

    /**
     * Get articleCategory by name
     */
    public async findByName(name: string) {
        const data: ArticleCategory = await this.repo.findOne({ where: { name } });
        if (!data) {
            throw new ApiError(httpStatus.NOT_FOUND, "ArticleCategory doesn't exist");
        }

        return data;
    }

    /**
     * Update articleCategory by id
     */
    public async update(
        articleCategoryId: number,
        updateBody: Partial<ArticleCategory>
    ): Promise<ArticleCategory> {
        const findArticleCategory: ArticleCategory = await this.repo.findOne({
            where: { id: articleCategoryId },
        });
        if (!findArticleCategory)
            throw new ApiError(httpStatus.NOT_FOUND, "ArticleCategory doesn't exist");

        const dataUpdated: ArticleCategory = {
            ...findArticleCategory,
            ...updateBody,
        } as ArticleCategory;

        await this.repo.save(dataUpdated);

        const data: ArticleCategory = await this.repo.findOne({
            where: { id: articleCategoryId },
        });
        return data;
    }

    /**
     * Delete articleCategory by id
     * @param {ObjectId} articleCategoryId
     * @returns {Promise<ArticleCategory>}
     */
    public async remove(articleCategoryId: number): Promise<ArticleCategory> {
        const data: ArticleCategory = await this.repo.findOne({ where: { id: articleCategoryId } });
        if (!data) {
            throw new ApiError(httpStatus.NOT_FOUND, "ArticleCategory doesn't exist");
        }
        await this.repo.delete({ id: articleCategoryId });
        return data;
    }

    /**
     * Get an instance of this class
     * @returns {ArticleCategoryService} ArticleCategoryService instance
     */
    public static getInstance(): ArticleCategoryService {
        if (!ArticleCategoryService.instance) {
            ArticleCategoryService.instance = new ArticleCategoryService();
        }
        return ArticleCategoryService.instance;
    }
}

export default ArticleCategoryService.getInstance();
