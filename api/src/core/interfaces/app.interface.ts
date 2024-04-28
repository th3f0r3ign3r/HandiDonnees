import { Request, Router } from 'express';
import { User } from '../../features/user/user.entity';

export interface AppRequest extends Request {
    user: User;
}

export interface FeatureRouter {
    path: string;
    router: Router;
    controller: any;
}
