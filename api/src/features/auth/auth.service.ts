const httpStatus = require('http-status');
import userService from '../user/user.service';
import tokenService from './token.service';
import { Token } from './token.entity';
import ApiError from '../../core/utils/api_error';
import tokenTypes from '../../core/configs/token.config';
import { dbSource } from '../../core/database/db.source';
import { User } from '../user/user.entity';
import { Person } from '../person/person.entity';
import * as otpGenerator from 'otp-generator';
import config from '../../core/configs/app.config';

class AuthService {
    private static instance: AuthService;
    private repoToken;
    private repoPerson;

    constructor() {
        this.repoToken = dbSource.getRepository(Token);
        this.repoPerson = dbSource.getRepository(Person);
    }

    /**
     * Login with username and password
     * @returns {Promise<User>}
     */
    public async loginUserWithEmailAndPassword(email: string, password: string): Promise<User> {
        const user = await userService.findByEmail(email);
        console.log('user==>', user);

        if (!user || !(await user.isPasswordMatch(password))) {
            throw new ApiError(httpStatus.UNAUTHORIZED, 'Email or password is incorrect');
        }

        return user;
    }

    /**
     * Logout
     * @param {string} refreshToken
     * @returns {Promise}
     */
    async logout(refreshToken: string): Promise<void> {
        const refreshTokenDoc = await tokenService.findOneWhereConditions({
            token: refreshToken,
            type: tokenTypes.REFRESH,
            blacklisted: false,
        });

        if (!refreshTokenDoc) {
            throw new ApiError(httpStatus.NOT_FOUND, 'Resfresh token not found');
        }
        return await tokenService.deleteOne(refreshTokenDoc);
    }

    /**
     * Reset password
     * @param {string} resetPasswordToken
     * @param {string} newPassword
     * @returns {Promise}
     */
    public async resetPassword(resetPasswordToken: string, newPassword: string): Promise<void> {
        const resetPasswordTokenDoc = await tokenService.verifyToken(
            resetPasswordToken,
            tokenTypes.RESET_PASSWORD
        );

        const user = await userService.findById(resetPasswordTokenDoc.user.id);

        if (!user) {
            throw new ApiError(httpStatus.NOT_FOUND, "Cet utilisateur n'existe pas");
        }
        await userService.update(user.id, {
            password: newPassword,
        } as User);

        await tokenService.deleteManyByUserId(user.id, [tokenTypes.RESET_PASSWORD]);
    }

    async refreshAuth(refreshToken: string): Promise<Object> {
        try {
            const refreshTokenDoc = await tokenService.verifyToken(
                refreshToken,
                tokenTypes.REFRESH
            );

            console.log('TOKEN REFRESH ***** ');
            console.log(refreshTokenDoc);
            console.log('TOKEN REFRESH ***** ');
            console.log('TOKEN REFRESH ', refreshTokenDoc.user.id);
            const user = await userService.findById(refreshTokenDoc.user.id);

            if (!user) {
                throw new ApiError(httpStatus.NOT_FOUND, "Cet utilisateur n'existe pas");
            }
            await tokenService.deleteOne(refreshTokenDoc);

            const token = await tokenService.generateAuthTokens(user);
            return token;
        } catch (error) {
            throw new ApiError(httpStatus.UNAUTHORIZED, 'Veuillez vous connecter');
        }
    }

    async refreshPersonAuth(refreshToken: string): Promise<Object> {
        try {
            const refreshTokenDoc = await tokenService.verifyPersonToken(
                refreshToken,
                tokenTypes.REFRESH
            );
            const user = await userService.findById(refreshTokenDoc.person.id);

            if (!user) {
                throw new ApiError(httpStatus.NOT_FOUND, 'This person do not exist');
            }
            await tokenService.deleteOne(refreshTokenDoc);

            const token = await tokenService.generatePersonAuthTokens(user);
            return token;
        } catch (error) {
            throw new ApiError(httpStatus.UNAUTHORIZED, 'Veuillez vous connecter');
        }
    }

    public async generatePersonOTP(person: Person): Promise<number> {
        if (person.isBlocked) {
            const currentTime = new Date();
            if (currentTime < person.blockUntil) {
                throw new ApiError(httpStatus.FORBIDDEN, 'Account blocked. Try after some time.');
            } else {
                person.isBlocked = false;
                person.otpAttempts = 0;
            }
        }

        // Check for minimum 1-minute gap between OTP requests
        const lastOtpTime: Date = person.otpCreatedAt;
        const currentTime: Date = new Date();

        if (lastOtpTime && currentTime.getTime() - lastOtpTime.getTime() < 60000)
            throw new ApiError(
                httpStatus.FORBIDDEN,
                'Minimum 1-minute gap required between OTP requests'
            );

        const otp = Number(
            otpGenerator.generate(6, {
                lowerCaseAlphabets: false,
                specialChars: false,
                upperCaseAlphabets: false,
            })
        );
        person.otp = otp;
        person.otpCreatedAt = currentTime;

        await this.repoPerson.save(person);
        return otp;
    }

    /**
     * Check if the OTP is valid and return the person if valid
     * @param npi
     * @param otp
     * @returns
     */
    public async verifyPersonOTP(npi: string, otp: number): Promise<Person> {
        const person: Person = await this.repoPerson.findOne({ where: { npi } });
        if (!person) throw new ApiError(httpStatus.NOT_FOUND, 'Person not found');

        if (person.isBlocked) {
            const currentTime = new Date();
            if (currentTime < person.blockUntil) {
                throw new ApiError(httpStatus.FORBIDDEN, 'Account blocked. Try after some time.');
            } else {
                person.isBlocked = false;
                person.otpAttempts = 0;
            }
        }

        // Check OTP
        if (person.otp !== otp) {
            person.otpAttempts++;
            // If OTP attempts >= 5, block user for 1 hour
            if (person.otpAttempts >= config.otp.attempts) {
                person.isBlocked = true;
                const blockUntil = new Date();
                blockUntil.setHours(blockUntil.getMinutes() + config.otp.blockUntilMinutes);
                person.blockUntil = blockUntil;
            }
            await this.repoPerson.save(person);
            throw new ApiError(httpStatus.FORBIDDEN, 'Invalid OTP');
        }

        const currentTime: number = new Date().getTime();

        if (currentTime - person.otpCreatedAt.getTime() > config.otp.validTimeMinutes * 60 * 1000)
            throw new ApiError(httpStatus.FORBIDDEN, 'OTP expired');

        person.otpAttempts = 0;

        return await this.repoPerson.save(person);
    }

    /**
     * Get an instance of this class
     * @returns {AuthService} AuthService instance
     */
    static getInstance() {
        if (!AuthService.instance) {
            AuthService.instance = new AuthService();
        }
        return AuthService.instance;
    }
}

export default AuthService.getInstance();
