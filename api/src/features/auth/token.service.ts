const httpStatus = require('http-status');
import moment, { Moment } from 'moment';
import jwt from 'jsonwebtoken';
import userService from '../user/user.service';
import { Token } from './token.entity';
import ApiError from '../../core/utils/api_error';
import config from '../../core/configs/app.config';
import tokenTypes from '../../core/configs/token.config';
import { dbSource } from '../../core/database/db.source';
import { User } from '../user/user.entity';
import { Secret } from '../../core/types/app.type';
import { Person } from '../person/person.entity';

class TokenService {
    private static instance: TokenService;
    private repoToken;

    constructor() {
        this.repoToken = dbSource.getRepository(Token);
    }

    /**
     * Verify token and return token doc (or throw an error if it is not valid)
     * @param {string} token
     * @param {string} type
     * @returns {Promise<Token>}
     */
    public async verifyToken(token: string, type: string): Promise<Token> {
        const payload: any = jwt.verify(token, config.jwt.secret);
        const tokenDoc = await this.repoToken.findOne({
            where: {
                token,
                type,
                user: { id: payload.sub },
                blacklisted: false,
            },
            relations: {
                user: true,
            },
        });

        if (!tokenDoc) {
            throw new ApiError(httpStatus.NOT_FOUND, 'No token found to verify');
        }
        return tokenDoc;
    }

    /**
     * Verify token for person and return token doc (or throw an error if it is not valid)
     * @param {string} token
     * @param {string} type
     * @returns {Promise<Token>}
     */
    public async verifyPersonToken(token: string, type: string): Promise<Token> {
        const payload: any = jwt.verify(token, config.jwt.secret);
        const tokenDoc = await this.repoToken.findOne({
            where: {
                token,
                type,
                person: { id: payload.sub },
                blacklisted: false,
            },
            relations: {
                person: true,
            },
        });

        if (!tokenDoc) {
            throw new ApiError(httpStatus.NOT_FOUND, 'No token found to verify');
        }
        return tokenDoc;
    }

    public async generateToken(
        userId: number,
        expires: Moment,
        type: string,
        secret: Secret = config.jwt.secret
    ): Promise<string> {
        try {
            const payload = {
                sub: userId,
                iat: moment().unix(),
                exp: expires.unix(),
                type,
            };

            const token = jwt.sign(payload, secret);
            return token;
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, (error as any).message);
        }
    }

    public async saveToken(
        token: string,
        userId: number,
        expires: Moment,
        type: string,
        blacklisted = false
    ): Promise<Token> {
        try {
            const tokenDoc = await this.repoToken.save({
                user: { id: userId },
                expires: expires.toDate(),
                type,
                token,
                blacklisted,
            });
            return tokenDoc;
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, (error as any).message);
        }
    }

    public async savePersonToken(
        token: string,
        personId: number,
        expires: Moment,
        type: string,
        blacklisted = false
    ): Promise<Token> {
        try {
            const tokenDoc = await this.repoToken.save({
                person: { id: personId },
                expires: expires.toDate(),
                type,
                token,
                blacklisted,
            });
            return tokenDoc;
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, (error as any).message);
        }
    }

    public async generateAuthTokens(user: Partial<User>): Promise<{
        access: { token: string; expires: Date };
        refresh: { token: string; expires: Date };
    }> {
        try {
            const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
            const accessToken = await this.generateToken(
                user.id,
                accessTokenExpires,
                tokenTypes.ACCESS
            );

            const refreshTokenExpires = moment().add(config.jwt.refreshExpirationDays, 'days');
            const refreshToken = await this.generateToken(
                user.id,
                refreshTokenExpires,
                tokenTypes.REFRESH
            );

            await this.saveToken(refreshToken, user.id, refreshTokenExpires, tokenTypes.REFRESH);

            return {
                access: {
                    token: accessToken,
                    expires: accessTokenExpires.toDate(),
                },
                refresh: {
                    token: refreshToken,
                    expires: refreshTokenExpires.toDate(),
                },
            };
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, (error as any).message);
        }
    }

    public async generatePersonAuthTokens(person: Partial<Person>): Promise<{
        access: { token: string; expires: Date };
        refresh: { token: string; expires: Date };
    }> {
        try {
            const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
            const accessToken = await this.generateToken(
                person.id,
                accessTokenExpires,
                tokenTypes.ACCESS
            );

            const refreshTokenExpires = moment().add(config.jwt.refreshExpirationDays, 'days');
            const refreshToken = await this.generateToken(
                person.id,
                refreshTokenExpires,
                tokenTypes.REFRESH
            );

            await this.savePersonToken(
                refreshToken,
                person.id,
                refreshTokenExpires,
                tokenTypes.REFRESH
            );

            return {
                access: {
                    token: accessToken,
                    expires: accessTokenExpires.toDate(),
                },
                refresh: {
                    token: refreshToken,
                    expires: refreshTokenExpires.toDate(),
                },
            };
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, (error as any).message);
        }
    }

    public async generateResetPasswordToken(email: string): Promise<string> {
        try {
            const user = await userService.findByEmail(email);

            if (!user) {
                throw new ApiError(httpStatus.NOT_FOUND, 'No user found with this email');
            }
            const expires = moment().add(config.jwt.resetPasswordExpirationMinutes, 'minutes');
            const resetPasswordToken = await this.generateToken(
                user.id,
                expires,
                tokenTypes.RESET_PASSWORD
            );

            await this.saveToken(resetPasswordToken, user.id, expires, tokenTypes.RESET_PASSWORD);

            return resetPasswordToken;
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, (error as any).message);
        }
    }

    public async deleteMany(ids: number[]): Promise<any> {
        try {
            const deletions = await this.repoToken
                .createQueryBuilder()
                .delete()
                .from(Token)
                .where('id IN (:...ids)', { ids })
                .execute();
            return deletions;
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, (error as any).message);
        }
    }

    public async deleteManyByUserId(userId: number, types: string[]): Promise<any> {
        try {
            const deletions = await this.repoToken
                .createQueryBuilder()
                .delete()
                .from(Token)
                .where('user_id = :userId', { userId })
                .andWhere('type IN (:...types)', { types })
                .execute();

            return deletions;
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, (error as any).message);
        }
    }

    public async findOneWhereConditions(options: any): Promise<Token> {
        try {
            const token = await this.repoToken.findOne({
                where: options,
            });

            return token as Token;
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, (error as any).message);
        }
    }

    public async deleteOne(data: Token): Promise<any> {
        try {
            const deletion = this.repoToken.remove(data);
            return deletion;
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, (error as any).message);
        }
    }

    /**
     * Get an instance of this class
     * @returns {TokenService} TokenService instance
     */
    static getInstance() {
        if (!TokenService.instance) {
            TokenService.instance = new TokenService();
        }
        return TokenService.instance;
    }
}

export default TokenService.getInstance();
