module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'dev',

    MongoConnectUrl: process.env.MongoConnectUrl || 'mongodb://localhost:27017/MongooseDB',
    PORT: process.env.PORT || 5000,

    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || 'secret_word',
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'secret_word_refresh',

    ALLOWED_ORIGIN: process.env.ALLOWED_ORIGIN || 'http://localhost:3000',
};
