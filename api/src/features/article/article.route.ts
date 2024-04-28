import { Router } from 'express';
import validate from '../../core/middlewares/validate.middleware';
import { auth } from '../../core/middlewares/auth.middleware';
import articleValidation from '../user/user.validation';
import ArticleController from './article.controller';
import { FeatureRouter } from '../../core/interfaces/app.interface';

export default class UserRouter implements FeatureRouter {
    public router: Router;
    public path: string;
    public controller: ArticleController;

    constructor(path: string) {
        this.path = path;
        this.router = Router();
        this.controller = new ArticleController();
        this.routes();
    }

    private routes() {
        this.router
            .route('/')
            .post(validate(articleValidation.create), this.controller.create)
            .get(validate(articleValidation.find), this.controller.find);

        this.router
            .route('/:id')
            .get(auth(''), validate(articleValidation.findOne), this.controller.findOne)
            .patch(auth(''), validate(articleValidation.update), this.controller.update)
            .delete(auth(''), validate(articleValidation.remove), this.controller.remove);
    }
}
