import httpStatus from 'http-status';
import ApiError from '../../core/utils/api_error';
import { Article } from './article.entity';
import { dbSource } from '../../core/database/db.source';
import { FindOptions } from 'typeorm';
import { SortByOrder } from '../../core/types/app.type';

class ArticleService {
    private static instance: ArticleService;
    private repo;

    constructor() {
        this.repo = dbSource.getRepository(Article);
    }

    /**
     * Create a article
     */
    public async create(articleBody: Article): Promise<Article> {
        const data: Article = await this.repo.findOne({
            where: { title: articleBody.title },
        });
        if (data) {
            throw new ApiError(httpStatus.BAD_REQUEST, "Ce titre d'article exist déjà");
        }

        const createdArticleData: Article = await this.repo.save({ ...articleBody });
        return createdArticleData;
    }

    /**
     * Query for articles
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

            const queryBuilder = this.repo.createQueryBuilder('article');

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
                        `article.${column}`,
                        order.toUpperCase() as SortByOrder
                    );
                });
            }

            // Count total results
            const totalResults = await queryBuilder.getCount();

            // Apply pagination
            queryBuilder.skip((page - 1) * limit).take(limit);

            // Get paginated articles
            const datas = await queryBuilder.getMany();

            const totalPages = Math.ceil(totalResults / limit);

            return {
                datas: datas as unknown as Article[],
                page,
                limit,
                totalPages,
                totalResults,
            };
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
        }
    }

    public async findAll(): Promise<Article[]> {
        const articles: Article[] = await this.repo.find();

        return articles;
    }
    /**
     * Get article by id
     */
    public async findById(id: number) {
        const data: Article = await this.repo.findOne({ where: { id: id } });

        if (!data) throw new ApiError(httpStatus.NOT_FOUND, "Article doesn't exist");

        return data;
    }

    /**
     * Get article by email
     */
    public async findByTitle(title: string) {
        const data: Article = await this.repo.findOne({ where: { title } });
        if (!data) {
            throw new ApiError(httpStatus.NOT_FOUND, "Article doesn't exist");
        }

        return data;
    }

    /**
     * Update article by id
     */
    public async update(articleId: number, updateBody: Partial<Article>): Promise<Article> {
        const findArticle: Article = await this.repo.findOne({
            where: { id: articleId },
        });
        if (!findArticle) throw new ApiError(httpStatus.NOT_FOUND, "Article doesn't exist");

        const dataUpdated: Article = {
            ...findArticle,
            ...updateBody,
        } as Article;

        await this.repo.save(dataUpdated);

        const data: Article = await this.repo.findOne({
            where: { id: articleId },
        });
        return data;
    }

    /**
     * Delete article by id
     * @param {ObjectId} articleId
     * @returns {Promise<Article>}
     */
    public async remove(articleId: number): Promise<Article> {
        const data: Article = await this.repo.findOne({ where: { id: articleId } });
        if (!data) {
            throw new ApiError(httpStatus.NOT_FOUND, "Article doesn't exist");
        }
        await this.repo.delete({ id: articleId });
        return data;
    }

    /**
     * Get an instance of this class
     * @returns {ArticleService} ArticleService instance
     */
    public static getInstance(): ArticleService {
        if (!ArticleService.instance) {
            ArticleService.instance = new ArticleService();
        }
        return ArticleService.instance;
    }
}

export default ArticleService.getInstance();
