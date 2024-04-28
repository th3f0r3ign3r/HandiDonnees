import { Router } from 'express';
import validate from '../../core/middlewares/validate.middleware';
import { auth } from '../../core/middlewares/auth.middleware';
import disabilityValidation from './disability.validation';
import DisabilityController from './disability.controller';
import { FeatureRouter } from '../../core/interfaces/app.interface';

export default class DisabilityRouter implements FeatureRouter {
    public router: Router;
    public path: string;
    public controller: DisabilityController;

    constructor(path: string) {
        this.path = path;
        this.router = Router();
        this.controller = new DisabilityController();
        this.routes();
    }

    private routes() {
        this.router
            .route('/')
            .post(auth(), validate(disabilityValidation.create), this.controller.create)
            .get(auth(), validate(disabilityValidation.find), this.controller.find);

        this.router
            .route('/:id')
            .get(auth(), validate(disabilityValidation.findOne), this.controller.findOne)
            .patch(auth(), validate(disabilityValidation.update), this.controller.update)
            .delete(auth(), validate(disabilityValidation.remove), this.controller.remove);
    }
}
