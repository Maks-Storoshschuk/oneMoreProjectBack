const jwt = require('jsonwebtoken');

const {
    JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET,
} = require('../config/config');
const {ErrorBuilder, Errors} = require('../errorHandler');
const {tokenTypeEnum} = require('../config');

module.exports = {
    generateTokenPair: () => {
        const access_token = jwt.sign({}, JWT_ACCESS_SECRET, {expiresIn: '15m'});
        const refresh_token = jwt.sign({}, JWT_REFRESH_SECRET, {expiresIn: '30d'});

        return {
            access_token,
            refresh_token
        };
    },

    verifyToken: async (token, tokenType = tokenTypeEnum.ACCESS) => {
        try {
            let secret = '';
            switch (tokenType) {
                case tokenTypeEnum.ACCESS:
                    secret = JWT_ACCESS_SECRET;
                    break;
                case tokenTypeEnum.REFRESH:
                    secret = JWT_REFRESH_SECRET;
                    break;
            }

            await jwt.verify(token, secret);
        } catch (e) {
            ErrorBuilder(Errors.err401);
        }
    },
};
