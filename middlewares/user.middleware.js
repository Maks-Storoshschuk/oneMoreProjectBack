const {constants} = require('../config');
const {userValidator} = require('../validators');
const {ErrorBuilder, Errors} = require('../errorHandler');
const {User} = require('../dataBase');

module.exports = {
    createUserMiddleware: async (req, res, next) => {
        try {
            const {email} = req.body;

            const userByEmail = await User.findOne({email});
            if (userByEmail) {
                ErrorBuilder(Errors.err409);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    updateUserMiddleware: (req, res, next) => {
        try {
            const {error, value} = userValidator.updateUserValidator.validate(req.body);

            if (error) {
                next({
                    message: error.details[0].message,
                    status: constants.code400
                });
            }

            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserValid: (req, res, next) => {
        try {
            console.log(req.body);
            const {error, value} = userValidator.createUserValidator.validate(req.body);


            if (error) {
                next({
                    message: error.details[0].message,
                    status: constants.code400
                });
            }

            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    },

    userIdMiddleware: async (req, res, next) => {
        try {

            const {user_id} = req.params;
            const checkId = await User.findById(user_id);

            if (!checkId) {
                ErrorBuilder(Errors.err404WI);
            }

            req.user = checkId;

            next();
        } catch (e) {
            next(e);
        }
    }
};


