import { join } from 'path';
import { DataSource } from 'typeorm';
import config from '../configs/app.config';
import logger from '../utils/logger';

/** TypeORM DataSource object (type: postgres) */
export const dbSource = new DataSource({
    type: 'postgres',
    username: config.db.username,
    password: config.db.password,
    host: config.db.host,
    port: Number(config.db.port),
    database: config.db.database,
    installExtensions: true,
    migrationsRun: config.isProduction ? false : true,
    synchronize: config.isProduction ? false : true,
    entities: [
        join(__dirname, '..', '..', 'features', '**', '*.entity.ts'),
        join(__dirname, '..', '..', 'core', 'database', '**', '*.entity.ts'),
    ],
    migrations: [join(__dirname, 'migrations', '*.ts')],
    subscribers: [join(__dirname, '..', '..', 'features', '**', '*.subscriber.ts')],
    poolErrorHandler: (err: any) => {
        logger.error('poolErrorHandler: ', err);
    },
    ssl: true,
    extra: {
        ssl: {
            rejectUnauthorized: false,
        },
    },
});
