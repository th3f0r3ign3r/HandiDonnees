import Joi from 'joi';
import { objectId } from '../../core/utils/shared.utils';

/**
 * Validation disability schema for creation
 */
const create = {
    body: Joi.object().keys({
        type: Joi.string().required(),
        description: Joi.string().required(),
    }),
};

/**
 * Validation disability schema for getting all disabilitys
 */
const find = {
    query: Joi.object().keys({
        type: Joi.string(),
        //= ====================================
        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
    }),
};

/**
 * Validation disability schema to get one disability by ID
 */
const findOne = {
    params: Joi.object().keys({
        id: Joi.string().custom(objectId),
    }),
};

/**
 * Validation disability schema for update
 * Should be used by admin
 */
const update = {
    params: Joi.object().keys({
        id: Joi.required().custom(objectId),
    }),
    body: Joi.object()
        .keys({
            type: Joi.string(),
            description: Joi.string(),
        })
        .min(1),
};

/**
 * Validation disability schema for deletion
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
