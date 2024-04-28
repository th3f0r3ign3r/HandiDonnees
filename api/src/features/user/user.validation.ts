import Joi from 'joi';
import { password, objectId } from '../../core/utils/shared.utils';
import { roles } from '../../core/configs/roles.config';

/**
 * Validation user schema for creation
 */
const create = {
    body: Joi.object().keys({
        fullname: Joi.string().required(),
        ifu: Joi.string(),
        email: Joi.string().email().required(),
        // password: Joi.string().required().custom(password),
        role: Joi.string().valid(...roles),
    }),
};

/**
 * Validation user schema for getting all users
 */
const find = {
    query: Joi.object().keys({
        email: Joi.string().email(),
        ifu: Joi.string(),
        fullname: Joi.string(),
        role: Joi.string().valid(...roles),
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
        userId: Joi.string().custom(objectId),
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
            fullname: Joi.string(),
            role: Joi.string().valid(...roles),
            ifu: Joi.string().valid(...roles),
            isVerifiedEmail: Joi.boolean(),
        })
        .min(1),
};

/**
 * Validation user schema for owner
 * update profile information
 */
const updateMe = {
    body: Joi.object()
        .keys({
            fullname: Joi.string(),
            password: Joi.string().custom(password),
        })
        .min(1),
};

/**
 * Validation user schema to get logged user profile information
 */
const getMe = {};

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
    getMe,
    update,
    updateMe,
    remove,
};
