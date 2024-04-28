import httpStatus from 'http-status';
import { Request, Response } from 'express';
import personService from './person.service';
import catchAsync from '../../core/utils/catch_async';
import ApiError from '../../core/utils/api_error';
import { pick } from '../../core/utils/shared.utils';
import { DisabilityHistory } from '../disbility-history/disability.history.entity';
import { AppRequest } from 'src/core/interfaces/app.interface';

export default class PersonController {
    private service;
    constructor() {
        this.service = personService;
    }

    /**
     * Create a new person
     */
    public create = catchAsync(async (req: AppRequest, res: Response) => {
        const currentUser = req.user;
        req.body.registeredBy = currentUser.id;
        const person = await this.service.create(req.body);
        res.status(httpStatus.CREATED).json(person);
    });

    /**
     * Get all persons in paginated format
     */
    public find = catchAsync(async (req: Request, res: Response) => {
        const filter = pick(req.query, ['npi', 'email', 'gender', 'tel']);
        const options = pick(req.query, ['sortBy', 'limit', 'page']);
        const result = await this.service.query(filter, options);
        res.status(httpStatus.OK).json(result);
    });

    /**
     * Get one person by ID
     */
    public findOne = catchAsync(async (req: Request, res: Response) => {
        const personId = Number(req.params.id);
        console.log('personId=>', personId);
        const person = await this.service.findById(Number(personId));
        if (!person) throw new ApiError(httpStatus.NOT_FOUND, 'Person not found');

        res.status(httpStatus.OK).json(person);
    });

    /**
     * Update one person
     */
    public update = catchAsync(async (req: Request, res: Response) => {
        const personId = Number(req.params.id);
        if (req.body.disabilities) {
            req.body.disabilities = (req.body.disabilities as DisabilityHistory[]).map(
                (disabilityHistory) => {
                    return { ...disabilityHistory, person: personId };
                }
            );
        }
        const person = await this.service.update(Number(personId), req.body);

        // Send an email & message to notify the person registration if information have been validated

        res.status(httpStatus.OK).json(person);
    });

    /**
     * delete one person
     */
    public remove = catchAsync(async (req: Request, res: Response) => {
        await this.service.remove(Number(req.params.id));
        res.status(httpStatus.OK).json();
    });
}
