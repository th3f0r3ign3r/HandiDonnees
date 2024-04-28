import Joi from 'joi';

const genders = ['male', 'female'];

/**
 * Validation user schema for creation
 */
const create = {
    body: Joi.object().keys({
        npi: Joi.string().required(),
        email: Joi.string().email().required(),
        tel: Joi.string().required(),
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        birthDate: Joi.date().required(),
        gender: Joi.string()
            .required()
            .valid(...genders),
        address: Joi.string().required(),
        region: Joi.number().required(),
        disabilities: Joi.array()
            .items(
                Joi.object().keys({
                    disability: Joi.number().required(),
                    date: Joi.date().required(),
                    gravity: Joi.string().required(),
                })
            )
            .min(1)
            .required(),
    }),
};

/**
 * Validation user schema for getting all users
 */
const find = {
    query: Joi.object().keys({
        email: Joi.string().email(),
        npi: Joi.string(),
        tel: Joi.string(),
        gender: Joi.string().valid(...genders),
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
        id: Joi.number().required(),
    }),
};

/**
 * Validation user schema for update
 * Should be used by admin
 */
const update = {
    params: Joi.object().keys({
        id: Joi.number().required(),
    }),
    body: Joi.object()
        .keys({
            npi: Joi.string(),
            email: Joi.string().email(),
            tel: Joi.string(),
            firstname: Joi.string(),
            lastname: Joi.string(),
            birthDate: Joi.date(),
            gender: Joi.string().valid(...genders),
            address: Joi.string(),
            region: Joi.number(),
            disabiities: Joi.array().items(
                Joi.object().keys({
                    id: Joi.number(),
                    disability: Joi.number(),
                    date: Joi.date(),
                    gravity: Joi.string(),
                    isActive: Joi.boolean(),
                    isValid: Joi.boolean(),
                })
            ),
        })
        .min(1),
};

/**
 * Validation user schema for deletion
 */
const remove = {
    params: Joi.object().keys({
        id: Joi.number(),
    }),
};

export default {
    create,
    find,
    findOne,
    update,
    remove,
};
