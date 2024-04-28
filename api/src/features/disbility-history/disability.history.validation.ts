import Joi from 'joi';
import { objectId } from '../../core/utils/shared.utils';

/**
 * Validation user schema for creation
 */
const create = {
    body: Joi.object().keys({
        date: Joi.string().required(),
        gravity: Joi.string().required(),
        disability: Joi.number().required(),
        person: Joi.number().required(),
        isActive: Joi.boolean().required(),
        isValid: Joi.boolean().required(),
    }),
};

/**
 * Validation user schema for getting all users
 */
const find = {
    query: Joi.object().keys({
        date: Joi.string().email(),
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
            date: Joi.string(),
            gravity: Joi.string(),
            disability: Joi.string(),
            isActive: Joi.boolean(),
            isValid: Joi.boolean(),
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
