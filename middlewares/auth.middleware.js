const {oAuth, User} = require('../dataBase');
const {authValidator} = require('../validators');
const {constants, tokenTypeEnum} = require('../config');
const {ErrorBuilder, Errors} = require('../errorHandler');
const jwtService = require('../services/jwt.service');

module.exports = {
    isAuthValid: (req, res, next) => {
        try {
            const {password, email} = req.body;

            if (!password || !email ) {
                ErrorBuilder(Errors.err422R);
            }

            const {error, value} = authValidator.authValidator.validate({password, email});

            if (error) {
                ErrorBuilder(Errors.err422E);
            }

            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    },

    logInMiddleware: async (req, res, next) => {
        try {
            const {email} = req.body;

            const checkEmail = await User.findOne({email});

            if (!checkEmail) {
                ErrorBuilder(Errors.err404);
            }

            req.user = checkEmail;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkUserType: (roleArr = []) => (req, res, next) => {
        try {
            const {type} = req.user;

            if (!roleArr.includes(type)) {
                ErrorBuilder(Errors.err403);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkAccessToken: async (req, res, next) => {
        console.log(req.body);
        try {
            const token = req.get(constants.AUTHORIZATION);

            if (!token) {
                ErrorBuilder(Errors.err401);
            }

            await jwtService.verifyToken(token);

            const tokenResponse = await oAuth.findOne({access_token: token});

            if (!tokenResponse) {
                ErrorBuilder(Errors.err401);
            }

            req.token = token;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkRefreshToken: async (req, res, next) => {
        try {
            const token = req.get(constants.AUTHORIZATION);

            if (!token) {
                ErrorBuilder(Errors.err401);
            }

            await jwtService.verifyToken(token, tokenTypeEnum.REFRESH);

            const tokenResponse = await oAuth.findOne({refresh_token: token});

            if (!tokenResponse) {
                ErrorBuilder(Errors.err401);
            }

            req.token = tokenResponse;

            next();
        } catch (e) {
            next(e);
        }
    },

};
