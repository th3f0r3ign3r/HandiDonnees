import { NextFunction, Request, Response } from 'express';

const catchAsync =
    (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
    (req: Request, res: Response, next: NextFunction) =>
        fn(req, res, next).catch((err) => next(err));

export default catchAsync;
