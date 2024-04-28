import dotenv from 'dotenv';
import Joi from 'joi';
import path from 'path';
import { IConfigEmail, IConfigJwt, IConfigDB, IConfigOTP } from '../interfaces/config.interface';

dotenv.config({ path: path.join(__dirname, '../../../.env') });

class AppConfig {
    private static instance: AppConfig;
    private envVarsSchema: Joi.ObjectSchema<any> = Joi.object()
        .keys({
            NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
            API_BASE_URL: Joi.string().required().description('The api base URL'),
            WEB_APP_BASE_URL: Joi.string().required().description('The web app base URL'),
            WEB_APP_RESET_PASSWORD_URL: Joi.string()
                .required()
                .description('The web app reset password URL'),
            PORT: Joi.number().default(3000),
            JWT_SECRET: Joi.string().required().description('JWT secret key'),
            JWT_ACCESS_EXPIRATION_MINUTES: Joi.number()
                .default(30)
                .description('minutes after which access tokens expire'),
            JWT_REFRESH_EXPIRATION_DAYS: Joi.number()
                .default(30)
                .description('days after which refresh tokens expire'),
            JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number()
                .default(10)
                .description('minutes after which reset password token expires'),
            JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: Joi.number()
                .default(10)
                .description('minutes after which verify email token expires'),
            SMTP_HOST: Joi.string().description('server that will send the emails'),
            SMTP_PORT: Joi.number().description('port to connect to the email server'),
            SMTP_USERNAME: Joi.string().description('username for email server'),
            SMTP_PASSWORD: Joi.string().description('password for email server'),
            EMAIL_FROM: Joi.string().description('the from field in the emails sent by the app'),
            DB_USER: Joi.string().description('the database user name to connect as'),
            DB_PASSWORD: Joi.string().description('the database password'),
            DB_HOST: Joi.string().description('the database host name or ip address'),
            DB_PORT: Joi.number().description('the database port'),
            DB_DATABASE: Joi.string().description('the database name'),
            DB_ENDPOINT_ID: Joi.string().description('the database endpoint id'),

            OTP_VALID_TIME_MINUTES: Joi.number()
                .default(5)
                .description('OTP valid time in minutes'),
            OTP_ATTEMPTS: Joi.number().default(5).description('OTP attempts'),

            OTP_BLOCK_UNTIL_MINUTES: Joi.number()
                .default(30)
                .description('OTP block until minutes'),
        })
        .unknown();

    public appUrl: string;
    public appFrontUrl: string;
    public appFrontResetPasswordUrl: string;
    public env: string;
    public isProduction: boolean;
    public port: number;
    public db: IConfigDB;
    public jwt: IConfigJwt;
    public email: IConfigEmail;
    public otp: IConfigOTP;

    constructor() {
        this.init();
    }

    init() {
        const { value: envVars, error } = this.envVarsSchema
            .prefs({ errors: { label: 'key' } })
            .validate(process.env);

        if (error) throw new Error(`Config validation error: ${error.message}`);

        // Set the config variables
        this.appUrl = envVars.API_BASE_URL;
        this.appFrontUrl = envVars.WEB_APP_BASE_URL;
        this.appFrontResetPasswordUrl = envVars.WEB_APP_RESET_PASSWORD_URL;
        this.isProduction = envVars.NODE_ENV === 'production';
        this.env = envVars.NODE_ENV;
        this.port = envVars.PORT;
        this.db = {
            host: envVars.DB_HOST,
            database: envVars.DB_DATABASE,
            username: envVars.DB_USER,
            password: envVars.DB_PASSWORD,
            port: envVars.DB_PORT,
            ssl: 'require',
            connection: {
                options: `project=${envVars.DB_ENDPOINT_ID}`,
            },
        };
        this.jwt = {
            secret: envVars.JWT_SECRET,
            accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
            refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
            resetPasswordExpirationMinutes: envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
            verifyEmailExpirationMinutes: envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
        };
        this.email = {
            smtp: {
                host: envVars.SMTP_HOST,
                port: envVars.SMTP_PORT,
                auth: {
                    user: envVars.SMTP_USERNAME,
                    pass: envVars.SMTP_PASSWORD,
                },
            },
            from: envVars.EMAIL_FROM,
        };
        this.otp = {
            attempts: envVars.OTP_ATTEMPTS,
            validTimeMinutes: envVars.OTP_VALID_TIME_MINUTES,
            blockUntilMinutes: envVars.OTP_BLOCK_UNTIL_MINUTES,
        };
    }

    /**
     * Get an instance of this class
     * @returns {AppConfig} AppConfig instance
     */
    public static getInstance(): AppConfig {
        if (!AppConfig.instance) {
            AppConfig.instance = new AppConfig();
        }
        return AppConfig.instance;
    }
}

export default AppConfig.getInstance();
