import { Router } from 'express';
import validate from '../../core/middlewares/validate.middleware';
import { auth } from '../../core/middlewares/auth.middleware';
import userValidation from './user.validation';
import UserController from './user.controller';
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
            .post(auth('createUsers'), validate(userValidation.create), this.controller.create)
            .get(auth('getUsers'), validate(userValidation.find), this.controller.find);

        this.router
            .route('/profile')
            .get(auth(), validate(userValidation.getMe), this.controller.getMe)
            .patch(auth(), validate(userValidation.updateMe), this.controller.updateMe);

        this.router
            .route('/:id')
            .get(auth('getUser'), validate(userValidation.findOne), this.controller.findOne)
            .patch(auth('updateUsers'), validate(userValidation.update), this.controller.update)
            .delete(auth('deleteUsers'), validate(userValidation.remove), this.controller.remove);
    }
}
