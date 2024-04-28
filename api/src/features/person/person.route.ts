import { Router } from 'express';
import validate from '../../core/middlewares/validate.middleware';
import { auth } from '../../core/middlewares/auth.middleware';
import personValidation from './person.validation';
import PersonController from './person.controller';
import { FeatureRouter } from '../../core/interfaces/app.interface';

export default class PersonRouter implements FeatureRouter {
    public router: Router;
    public path: string;
    public controller: PersonController;

    constructor(path: string) {
        this.path = path;
        this.router = Router();
        this.controller = new PersonController();
        this.routes();
    }

    private routes() {
        this.router
            .route('/')
            .post(auth(), validate(personValidation.create), this.controller.create)
            .get(auth(), validate(personValidation.find), this.controller.find);

        this.router
            .route('/:id')
            .get(auth(), validate(personValidation.findOne), this.controller.findOne)
            .patch(auth(), validate(personValidation.update), this.controller.update)
            .delete(auth(), validate(personValidation.remove), this.controller.remove);
    }
}
