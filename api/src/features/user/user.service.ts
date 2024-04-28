import httpStatus from 'http-status';
import ApiError from '../../core/utils/api_error';
import { User } from './user.entity';
import { dbSource } from '../../core/database/db.source';
import { FindOptions } from 'typeorm';
import { SortByOrder } from '../../core/types/app.type';

class UserService {
    private static instance: UserService;
    private repo;

    constructor() {
        this.repo = dbSource.getRepository(User);
    }

    /**
     * Create a user
     */
    public async create(userBody: User): Promise<User> {
        const data: User = await this.repo.findOne({
            where: { email: userBody.email },
        });
        if (data) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
        }

        const createdUserData: User = await this.repo.save({ ...userBody });
        return createdUserData;
    }

    /**
     * Query for users
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

            const queryBuilder = this.repo.createQueryBuilder('user');

            // Apply filters
            if (filter) {
                queryBuilder.where(filter);
            }

            // Apply sorting
            if (sortBy) {
                const sortConditions = sortBy.split(';');
                sortConditions.forEach((sortCondition) => {
                    const [column, order] = sortCondition.split(':');
                    queryBuilder.addOrderBy(`user.${column}`, order.toUpperCase() as SortByOrder);
                });
            }

            // Count total results
            const totalResults = await queryBuilder.getCount();

            // Apply pagination
            queryBuilder.skip((page - 1) * limit).take(limit);

            // Get paginated users
            const datas = await queryBuilder.getMany();

            const totalPages = Math.ceil(totalResults / limit);

            return {
                datas: datas as unknown as User[],
                page,
                limit,
                totalPages,
                totalResults,
            };
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
        }
    }

    public async findAll(): Promise<User[]> {
        const users: User[] = await this.repo.find();

        return users;
    }
    /**
     * Get user by id
     */
    public async findById(id: number) {
        const data: User = await this.repo.findOne({ where: { id: id } });

        if (!data) throw new ApiError(httpStatus.NOT_FOUND, "User doesn't exist");

        return data;
    }

    /**
     * Get user by email
     */
    public async findByEmail(email: string) {
        const data: User = await this.repo.findOne({
            where: { email },
            select: [
                'email',
                'id',
                'password',
                'fullname',
                'role',
                'isEmailVerified',
                'createdAt',
                'updatedAt',
            ],
        });
        if (!data) {
            throw new ApiError(httpStatus.NOT_FOUND, "User doesn't exist");
        }

        return data;
    }

    /**
     * Update user by id
     */
    public async update(userId: number, updateBody: Partial<User>): Promise<User> {
        const findUser: User = await this.repo.findOne({
            where: { id: userId },
        });
        if (!findUser) throw new ApiError(httpStatus.NOT_FOUND, "User doesn't exist");

        const dataUpdated: User = {
            ...findUser,
            ...updateBody,
        } as User;

        await this.repo.save(dataUpdated);

        const data: User = await this.repo.findOne({
            where: { id: userId },
        });
        return data;
    }

    /**
     * Delete user by id
     * @param {ObjectId} userId
     * @returns {Promise<User>}
     */
    public async remove(userId: number): Promise<User> {
        const data: User = await this.repo.findOne({ where: { id: userId } });
        if (!data) {
            throw new ApiError(httpStatus.NOT_FOUND, "User doesn't exist");
        }
        await this.repo.delete({ id: userId });
        return data;
    }

    /**
     * Get an instance of this class
     * @returns {UserService} UserService instance
     */
    public static getInstance(): UserService {
        if (!UserService.instance) {
            UserService.instance = new UserService();
        }
        return UserService.instance;
    }
}

export default UserService.getInstance();
