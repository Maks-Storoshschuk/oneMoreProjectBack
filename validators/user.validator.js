const Joi = require('joi');

const {constants, regExp} = require('../config');

const createUserValidator = Joi.object({
    userName: Joi
        .string()
        .alphanum()
        .min(2)
        .max(30)
        .trim()
        .required(),
    firstName: Joi
        .string()
        .alphanum()
        .min(2)
        .max(30)
        .trim()
        .required(),
    lastName: Joi
        .string()
        .alphanum()
        .min(2)
        .max(30)
        .trim()
        .required(),
    email: Joi
        .string()
        .regex(regExp.emailRegExp)
        .trim()
        .required(),
    type: Joi
        .string()
        .allow(
            constants.DRIVER,
            constants.ADMIN,
        ),
    password: Joi
        .string()
        .trim()
        .regex(regExp.passwordRegExp)
        .required(),
});

const updateUserValidator = Joi.object({
    userName: Joi
        .string()
        .alphanum()
        .min(2)
        .max(30)
        .trim(),
    firstName: Joi
        .string()
        .alphanum()
        .min(2)
        .max(30)
        .trim(),
    lastName: Joi
        .string()
        .alphanum()
        .min(2)
        .max(30)
        .trim(),
    email: Joi
        .string()
        .regex(regExp.emailRegExp)
        .trim(),
    type: Joi
        .string()
        .allow(
            constants.DRIVER,
            constants.ADMIN,
        ),
    password: Joi
        .string()
        .trim()
        .regex(regExp.passwordRegExp)
});

module.exports = {
    createUserValidator
};
