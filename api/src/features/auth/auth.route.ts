import { Router } from 'express';
import { FeatureRouter } from '../../core/interfaces/app.interface';
import { AuthController } from './auth.controller';

import authValidation from './auth.validation';
import { auth } from '../../core/middlewares/auth.middleware';
import validate from '../../core/middlewares/validate.middleware';

export default class AuthRouter implements FeatureRouter {
    public router: Router;
    public path: string;
    public controller: AuthController;

    constructor(path: string) {
        this.path = path;
        this.router = Router();
        this.controller = new AuthController();
        this.routes();
    }

    private routes() {
        this.router.post('/register', this.controller.register);
        this.router.post('/login', validate(authValidation.login), this.controller.login);
        this.router.post(
            '/send-person-otp',
            validate(authValidation.sendPersonOTP),
            this.controller.sendPersonOTP
        );
        this.router.post(
            '/verify-person-otp',
            validate(authValidation.sendPersonOTP),
            this.controller.verifyPersonOTP
        );

        this.router.post(
            '/logout',
            auth(),
            validate(authValidation.logout),
            this.controller.logout
        );
        this.router.post(
            '/refresh-tokens',
            validate(authValidation.refreshTokens),
            this.controller.refreshTokens
        );

        this.router.post(
            '/forgot-password',
            validate(authValidation.forgotPassword),
            this.controller.forgotPassword
        );
        this.router.post(
            '/reset-password',
            validate(authValidation.resestPassword),
            this.controller.resetPassword
        );
    }
}
