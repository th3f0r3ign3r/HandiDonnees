import Joi from 'joi';
import { objectId } from '../../core/utils/shared.utils';

/**
 * Validation user schema for creation
 */
const create = {
    body: Joi.object().keys({
        category: Joi.number().required(),
        title: Joi.string().required(),
        content: Joi.string().required(),
    }),
};

/**
 * Validation user schema for getting all users
 */
const find = {
    query: Joi.object().keys({
        title: Joi.string(),
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
            category: Joi.number(),
            title: Joi.string(),
            content: Joi.string(),
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
