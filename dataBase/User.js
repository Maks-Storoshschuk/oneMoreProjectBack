const {Schema, model} = require('mongoose');

const {constants} = require('../config');
const passwordService = require('../services/password.service');

const userSchema = new Schema({
    username: {
        type: String,
        trim: true,
    },
    firstName: {
        type: String,
        trim: true,
    },
    lastName: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        unique: true,
    },
    type: {
        type: String,
        default: constants.DRIVER,
        enum: [
            constants.ADMIN,
            constants.DRIVER,
        ]
    },
    password: {
        type: String,
        trim: true,
    },
}, {timestamps: true, toObject: {virtuals: true}, toJSON: {virtuals: true}});

userSchema.methods = {
    comparePassword(password) {
        return passwordService.compare(password, this.password);
    },

    userNormalizer(userToNormalize) {
        const object = userToNormalize.toObject();
        const fieldsToRemove = [
            'password',
            '__v',
        ];

        fieldsToRemove.forEach((field) => {
            delete object[field];
        });

        return object;
    }
};

userSchema.statics = {
    async createUserWithHashPassword(userObject) {
        const hashedPassword = await passwordService.hash(userObject.password);

        return this.create({...userObject, password: hashedPassword});

    }
};

module.exports = model('user', userSchema);
