import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import config from '../configs/app.config';
import logger from '../utils/logger';
import ApiError from '../utils/api_error';
import { TypeORMError } from 'typeorm';

const handleCastErrorDB = (err: any) => {
    const message = `Invalid ${err.path}: ${err.value}.`;
    return new ApiError(httpStatus.BAD_REQUEST, message, false, err.stack);
};

const handleDuplicateFieldsDB = (err: any) => {
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];

    const message = `Duplicate field value: ${value}. Please use another value!`;
    return new ApiError(httpStatus.BAD_REQUEST, message, false, err.stack);
};

const handleValidationErrorDB = (err: any) => {
    const errors = Object.values(err.errors).map((el: any) => el.message);

    const message = `Invalid input data. ${errors.join('. ')}`;
    return new ApiError(httpStatus.BAD_REQUEST, message, false, err.stack);
};

const handleJWTError = () =>
    new ApiError(httpStatus.UNAUTHORIZED, 'Invalid token. Please log in again!');

const handleJWTExpiredError = () =>
    new ApiError(httpStatus.UNAUTHORIZED, 'Your token has expired! Please log in again.');

export const errorConverter = (err: any, req: Request, res: Response, next: NextFunction) => {
    let error = err;

    if (!(error instanceof ApiError)) {
        if (error.statuscode === 11000) error = handleDuplicateFieldsDB(error);
        else {
            switch (error.name) {
                case 'CastError':
                    error = handleCastErrorDB(error);
                    break;
                case 'ValidationError':
                    error = handleValidationErrorDB(error);
                    break;
                case 'JsonWebTokenError':
                    error = handleJWTError();
                    break;
                case 'TokenExpiredError':
                    error = handleJWTExpiredError();
                    break;
                default:
                    const statusCode =
                        error.statusCode || error instanceof TypeORMError
                            ? httpStatus.BAD_REQUEST
                            : httpStatus.INTERNAL_SERVER_ERROR;

                    const message = error.message || httpStatus[statusCode];
                    error = new ApiError(statusCode, message, false, err.stack);
                    break;
            }
        }
    }
    next(error);
};

export const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction
) => {
    let { statusCode, message } = err;
    if (config.env === 'production' && !err.isOperational) {
        statusCode = httpStatus.INTERNAL_SERVER_ERROR;
        message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
    }
    // res.locals.errorMessage = err.message;

    const response = {
        code: statusCode,
        message,
        ...(config.env === 'development' && { stack: err.stack }),
    };

    if (config.env === 'development') logger.error(err);

    res.status(statusCode).json(response);
};

export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Unknown route'));
};
