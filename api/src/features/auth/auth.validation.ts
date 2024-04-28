import Joi from 'joi';

/**
 * Validation auth schema for user login
 */
const login = {
    body: Joi.object().keys({
        email: Joi.string().required(),
        password: Joi.string().required(),
    }),
};

/**
 * Validation auth schema for sending OTP to person
 */
const sendPersonOTP = {
    body: Joi.object().keys({
        npi: Joi.string().required(),
        tel: Joi.string().required(),
    }),
};

/**
 * Validation auth schema for sending OTP to person
 */
const verifyPersonOTP = {
    body: Joi.object().keys({
        npi: Joi.string().required(),
        otp: Joi.string().required(),
    }),
};

/**
 * Validation auth schema for user logout
 */
const logout = {
    body: Joi.object().keys({
        refreshToken: Joi.string(),
    }),
};

/**
 * Validation auth schema to refres tokens
 */
const refreshTokens = {
    body: Joi.object().keys({
        refreshToken: Joi.string().required(),
    }),
};

/**
 * Validation schema for forgot password
 */
const forgotPassword = {
    body: Joi.object().keys({
        email: Joi.string().email().required(),
    }),
};

/**
 * Validation schema for reset password
 */
const resestPassword = {
    query: Joi.object().keys({
        token: Joi.string().required(),
    }),
    body: Joi.object().keys({
        password: Joi.string().required(),
    }),
};

export default {
    login,
    logout,
    refreshTokens,
    forgotPassword,
    resestPassword,
    sendPersonOTP,
    verifyPersonOTP,
};
