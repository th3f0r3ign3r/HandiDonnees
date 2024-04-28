import { Router } from 'express';
import validate from '../../core/middlewares/validate.middleware';
import { auth } from '../../core/middlewares/auth.middleware';
import regionValidation from './region.validation';
import RegionController from './region.controller';
import { FeatureRouter } from '../../core/interfaces/app.interface';

export default class RegionRouter implements FeatureRouter {
    public router: Router;
    public path: string;
    public controller: RegionController;

    constructor(path: string) {
        this.path = path;
        this.router = Router();
        this.controller = new RegionController();
        this.routes();
    }

    private routes() {
        this.router
            .route('/')
            .post(auth(), validate(regionValidation.create), this.controller.create)
            .get(auth(), validate(regionValidation.find), this.controller.find);

        this.router
            .route('/:id')
            .get(auth(), validate(regionValidation.findOne), this.controller.findOne)
            .patch(auth(), validate(regionValidation.update), this.controller.update)
            .delete(auth(), validate(regionValidation.remove), this.controller.remove);
    }
}
