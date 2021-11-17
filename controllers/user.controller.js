const {oAuth, User,} = require('../dataBase');
const {constants} = require('../config');
const passwordService = require('../services/password.service');
const userService = require('../services/user.service');

module.exports = {

    createUser: async (req, res, next) => {
        try {
            const user = await User.createUserWithHashPassword(req.body);

            const normUser = user.userNormalizer(user);

            res.status(201).json(normUser);
        } catch (e) {
            next(e);

        }
    },


    deleteUser: async (req, res, next) => {
        try {
            const {user_id} = req.params;

            await User.deleteOne({_id: user_id});

            await oAuth.deleteMany({user_id});

            res.json('deleted').status(constants.code204);
        } catch (e) {
            next(e);
        }
    },

    getUsers: async (req, res, next) => {
        try {
            const users = await userService.getAllUsers(req.query);

            const normUsers = [];

            users.forEach(user => {
                const normUser = user.userNormalizer(user);

                normUsers.push(normUser);
            });

            res.json(normUsers);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const {user_id} = req.params;
            const {
                email,
                userName,
                firstName,
                lastName,
                type,
                password
            } = req.body;

            let user = {};

            if (password) {
                const hashedPassword = await passwordService.hash(password);
                user = await User.findByIdAndUpdate(user_id, {
                    email,
                    userName,
                    firstName,
                    lastName,
                    type,
                    password: hashedPassword
                }, {new: true});

            }

            user = await User.findByIdAndUpdate(user_id, {
                email,
                userName,
                firstName,
                lastName,
                type
            }, {new: true});

            const newUser = user.userNormalizer(user);

            res.status(constants.code201).json(newUser);
        } catch (e) {
            next(e);
        }
    },
};
