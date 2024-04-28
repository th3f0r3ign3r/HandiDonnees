import { Application } from 'express';
import express from 'express';
import http from 'http';
import logger from './core/utils/logger';
import { FeatureRouter } from './core/interfaces/app.interface';
import config from './core/configs/app.config';
import morgan from './core/utils/morgan';
import cors from 'cors';
import compression from 'compression';
import helmet, { contentSecurityPolicy } from 'helmet';
import cookieParser from 'cookie-parser';
import path from 'path';

import * as rateLimiter from './core/middlewares/rate_limiter.middleware';
import * as errorHelper from './core/middlewares/error.middleware';
import { dbSource } from './core/database/db.source';

export default class App {
    private app: Application;
    private port: string | number;
    public server: http.Server;

    constructor(routers: FeatureRouter[]) {
        this.app = express();

        this.initializeMiddlewares();
        this.initializeRoutes(routers);
        this.initializeErrorHandling();

        this.port = config.port || 9999;
        this.server = http.createServer(this.app);
    }

    public initializeMiddlewares() {
        // Trust proxy
        this.app.set('trust proxy', true);

        if (config.env !== 'test') {
            this.app.use(morgan.successHandler);
            this.app.use(morgan.errorHandler);
        }
        // Set EJS as the view engine
        this.app.set('view engine', 'ejs');

        // set security HTTP headers
        this.app.use(
            helmet({
                crossOriginResourcePolicy: false,
            })
        );
        this.app.use((req, res, next) => {
            contentSecurityPolicy({
                useDefaults: true,
                directives: {
                    scriptSrc: ["'self'", `'nonce-${res.locals.nonce}'`],
                },
            })(req, res, next);
        });

        // parse json request body
        this.app.use(express.json({ limit: '50mb' }));

        // parse urlencoded request body
        this.app.use(
            express.urlencoded({
                limit: '50mb',
                parameterLimit: 100000,
                extended: true,
            })
        );

        this.app.use(cookieParser());

        // Serve static files from public folder
        this.app.use(express.static(path.join(`${__dirname}/../public`)));

        // gzip compression
        this.app.use(compression());

        // enable cors
        const corsOptions = {
            origin: '*',
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
            credentials: true,
        };
        this.app.use(cors(corsOptions));

        if (config.env === 'production') {
            this.app.use('/v1/auth', rateLimiter.authLimiter);
        }
    }

    public initializeRoutes(routers: FeatureRouter[]) {
        routers.forEach((featurRouter) => {
            this.app.use(featurRouter.path, featurRouter.router);
        });
    }

    public initializeErrorHandling() {
        // send back a 404 error for any unknown api request
        this.app.use(errorHelper.notFoundHandler);

        // convert error to ApiError, if needed
        this.app.use(errorHelper.errorConverter);

        // handle error
        this.app.use(errorHelper.errorHandler);
    }

    public listen() {
        this.server.listen(this.port, () => {
            logger.info(`🚀 App Started 🚀  on port ${this.port}`);
        });
    }

    public bootstrap() {
        dbSource
            .initialize()
            .then(() => {
                logger.info('🤖 Connected to the database');

                this.listen();
            })
            .catch(async (error) => {
                logger.error(`💥 Can't connect to database...\n\n ${error}`);
            });
    }
}
