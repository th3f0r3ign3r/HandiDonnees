import Joi from 'joi';
import { objectId } from '../../core/utils/shared.utils';

/**
 * Validation user schema for creation
 */
const create = {
    body: Joi.object().keys({
        title: Joi.string().required(),
        employer: Joi.string().required(),
        description: Joi.string().required(),
        contract: Joi.string().required(),
        location: Joi.string().required(),
        postedAt: Joi.date().required(),
        expiresAt: Joi.date().required(),
    }),
};

/**
 * Validation user schema for getting all users
 */
const find = {
    query: Joi.object().keys({
        title: Joi.string(),
        employer: Joi.string(),
        //= ====================================
        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
    }),
};

/**
 * Validation user schema to get one user by ID
 */
const findOne = {
    params: Joi.object().keys({
        id: Joi.string().custom(objectId),
    }),
};

/**
 * Validation user schema for update
 * Should be used by admin
 */
const update = {
    params: Joi.object().keys({
        id: Joi.required().custom(objectId),
    }),
    body: Joi.object()
        .keys({
            title: Joi.string(),
            employer: Joi.string(),
            description: Joi.string(),
            contract: Joi.string(),
            location: Joi.string(),
            postedAt: Joi.date(),
            expiresAt: Joi.date(),
        })
        .min(1),
};

/**
 * Validation user schema for deletion
 */
const remove = {
    params: Joi.object().keys({
        id: Joi.string().custom(objectId),
    }),
};

export default {
    create,
    find,
    findOne,
    update,
    remove,
};
