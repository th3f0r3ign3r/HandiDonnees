import { Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import ApiError from '../utils/api_error';
import { roleRights } from '../configs/roles.config';
import config from '../configs/app.config';
import { User } from '../../features/user/user.entity';
import catchAsync from '../utils/catch_async';
import tokenTypes from '../configs/token.config';
import { AppRequest } from '../interfaces/app.interface';
import userService from '../../features/user/user.service';

/**
 * Check if a user have required right based on given rights
 * @param {*} user
 * @param  {...any} requiredRights
 * @returns
 */
export const checkIfUserHasRequiredRights = (user: User, ...requiredRights: string[]) => {
    if (requiredRights.length) {
        const userRights = roleRights.get(user.role);
        const hasRequiredRights = requiredRights.every((requiredRight) =>
            userRights.includes(requiredRight)
        );

        if (!hasRequiredRights) return false;
    }
    return true;
};

export const auth = (...requiredRights: string[]) =>
    catchAsync(async (req: AppRequest, res: Response, next: NextFunction) => {
        // Check if access token is there
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
            token = req.headers.authorization.split(' ')[1];

        if (!token) return next(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate!'));

        // Token verification
        const decoded: any = jwt.verify(token, config.jwt.secret) as jwt.JwtPayload;

        if (decoded.type !== tokenTypes.ACCESS) return next(new Error('Invalid token type'));

        const user = await userService.findById(decoded.sub);
        if (!user) return next(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate!'));

        // USER IS AUTHENTICATED
        req.user = user;

        // CHECK IF USER HAS REQUIRED RIGHTS
        if (!checkIfUserHasRequiredRights(user, ...requiredRights))
            next(new ApiError(httpStatus.FORBIDDEN, 'Access denied!'));
        else next();
    });
