import httpStatus from 'http-status';
import moment from 'moment';
import catchAsync from '../../core/utils/catch_async';
import authService from './auth.service';
import tokenService from './token.service';
import userService from '../user/user.service';
import personService from '../person/person.service';
import emailService from '../../core/services/email.service';
import { Request, Response } from 'express';
import config from '../../core/configs/app.config';
import { AppRequest } from '../../core/interfaces/app.interface';
import { Person } from '../person/person.entity';
import ApiError from '../../core/utils/api_error';

export class AuthController {
    private service;
    private userService;
    private personService;
    private emailService;
    constructor() {
        this.service = authService;
        this.userService = userService;
        this.personService = personService;
        this.emailService = emailService;
    }

    /**
     * Register a new user and return
     * new user information and associated tokens
     */
    register = catchAsync(async (req: Request, res: Response) => {
        const user = await userService.create(req.body);
        const tokens = await tokenService.generateAuthTokens(user);
        // Set cookie
        res.cookie('jwt', tokens.access.token, {
            expires: moment().add(config.jwt.accessExpirationMinutes, 'minutes').toDate(),
            httpOnly: true,
            secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
        });

        // Send response
        res.status(httpStatus.CREATED).send({ user, tokens });
    });

    /**
     * Log a user and return
     * user information and associated tokens
     */
    login = catchAsync(async (req: Request, res: Response) => {
        const { email, password } = req.body;
        console.log('email==>', email);
        console.log('password==>', password);
        const user = await authService.loginUserWithEmailAndPassword(email, password);
        const tokens = await tokenService.generateAuthTokens(user);

        // Remove user password
        delete user.password;

        // Set cookied
        res.cookie('jwt', tokens.access.token, {
            expires: moment().add(config.jwt.accessExpirationMinutes, 'minutes').toDate(),
            httpOnly: true,
            secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
        });

        // Send response
        res.status(httpStatus.OK).send({ user, tokens });
    });

    /**
     * Log a user and return
     * user information and associated tokens
     */
    sendPersonOTP = catchAsync(async (req: Request, res: Response) => {
        const { npi, tel } = req.body;

        const person: Person = await personService.findByNPI(npi);

        if (!person) throw new ApiError(httpStatus.NOT_FOUND, 'Person not yet registered');

        const otp: number = await authService.generatePersonOTP(person);

        // Send SMS to person
        // Send Email to person
        await emailService.sendOtpEmail(person.email, otp);

        // Send response
        res.status(httpStatus.NO_CONTENT).send({ npi, tel, otp });
    });

    /**
     * Log a user and return
     * person information and associated tokens
     */
    verifyPersonOTP = catchAsync(async (req: Request, res: Response) => {
        const { npi, otp } = req.body;

        const person = await authService.verifyPersonOTP(npi, otp);

        const tokens = await tokenService.generatePersonAuthTokens(person);

        // Send response
        res.status(httpStatus.OK).send({ person, tokens });
    });

    /**
     * Take care of logging user out
     */
    logout = catchAsync(async (req: AppRequest, res: Response) => {
        // await authService.logout(req.user.id);
        // Clear the JWT infos on the client side
        // res.clearCookie("jwt");

        res.status(httpStatus.NO_CONTENT).send();
    });

    /**
     * Provide new access token
     */
    refreshTokens = catchAsync(async (req: Request, res: Response) => {
        const tokens = await authService.refreshAuth(req.body.refreshToken);

        res.status(httpStatus.OK).send({ ...tokens });
    });

    /**
     * Send reset password email
     */
    forgotPassword = catchAsync(async (req: Request, res: Response) => {
        const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email);
        await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);

        res.status(httpStatus.NO_CONTENT).send();
    });

    /**
     * Reset password
     */
    resetPassword = catchAsync(async (req: Request, res: Response) => {
        const token: string = req.query.token as string;
        await authService.resetPassword(token, req.body.password);

        res.status(httpStatus.NO_CONTENT).send();
    });
}
