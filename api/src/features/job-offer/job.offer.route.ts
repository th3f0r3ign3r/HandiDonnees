import { Router } from 'express';
import validate from '../../core/middlewares/validate.middleware';
import { auth } from '../../core/middlewares/auth.middleware';
import jobOfferValidation from '../user/user.validation';
import JobOfferController from './job.offer.controller';
import { FeatureRouter } from '../../core/interfaces/app.interface';

export default class UserRouter implements FeatureRouter {
    public router: Router;
    public path: string;
    public controller: JobOfferController;

    constructor(path: string) {
        this.path = path;
        this.router = Router();
        this.controller = new JobOfferController();
        this.routes();
    }

    private routes() {
        this.router
            .route('/')
            .post(validate(jobOfferValidation.create), this.controller.create)
            .get(validate(jobOfferValidation.find), this.controller.find);

        this.router
            .route('/:id')
            .get(auth(), validate(jobOfferValidation.findOne), this.controller.findOne)
            .patch(auth(), validate(jobOfferValidation.update), this.controller.update)
            .delete(auth(), validate(jobOfferValidation.remove), this.controller.remove);
    }
}
