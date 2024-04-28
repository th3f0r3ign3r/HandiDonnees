import Joi, { CustomHelpers } from 'joi';

/**
 * Create an object composed of the picked object properties
 * @param {Object} object
 * @param {string[]} keys
 * @returns {Object}
 */
export const pick = (object: { [key: string]: any }, keys: string[]) => {
    return keys.reduce((obj: { [key: string]: any }, key) => {
        if (object && Object.prototype.hasOwnProperty.call(object, key)) {
            obj[key] = object[key];
        }
        return obj;
    }, {});
};

export const objectId: Joi.CustomValidator<any, any> = (
    value: string,
    helpers: CustomHelpers<any>
) => {
    if (!value.match(/^[0-9a-fA-F]{24}$/)) {
        return helpers.message({
            'string.pattern.base': `"{{#label}}" must be a valid id`,
        });
    }
    return value;
};

export const password: Joi.CustomValidator<any, any> = (
    value: string,
    helpers: CustomHelpers<any>
) => {
    if (value.length < 8) {
        return helpers.message({
            'string.pattern.base': 'password must be at least 8 characters',
        });
    }
    if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
        return helpers.message({
            'string.pattern.base': 'password must contain at least 1 letter and 1 number',
        });
    }
    return value;
};
