import { Router } from 'express';
import validate from '../../core/middlewares/validate.middleware';
import { auth } from '../../core/middlewares/auth.middleware';
import userValidation from '../user/user.validation';
import UserController from './disability.history.controller';
import { FeatureRouter } from '../../core/interfaces/app.interface';

export default class UserRouter implements FeatureRouter {
    public router: Router;
    public path: string;
    public controller: UserController;

    constructor(path: string) {
        this.path = path;
        this.router = Router();
        this.controller = new UserController();
        this.routes();
    }

    private routes() {
        this.router
            .route('/')
            .post(validate(userValidation.create), this.controller.create)
            .get(validate(userValidation.find), this.controller.find);

        this.router
            .route('/:id')
            .get(auth(), validate(userValidation.findOne), this.controller.findOne)
            .patch(auth(), validate(userValidation.update), this.controller.update)
            .delete(auth(), validate(userValidation.remove), this.controller.remove);
    }
}
