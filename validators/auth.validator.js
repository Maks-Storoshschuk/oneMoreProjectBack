const Joi = require('joi');

const {regExp} = require('../config');

const authValidatorEmail = Joi.object({
    email: Joi
        .string()
        .regex(regExp.emailRegExp)
        .trim()
        .required(),
    password: Joi
        .string()
        .trim()
        .regex(regExp.passwordRegExp)
        .required(),
});

module.exports = {
    authValidatorEmail
};
