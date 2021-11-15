const router = require('express').Router();

const {authMiddleware, userMiddleware} = require('../middlewares');
const {userController} = require('../controllers');

router.post(
    '/',
    userMiddleware.isUserValid,
    userMiddleware.checkEmailMiddleware,
    userController.createUser
);
router.get(
    '/',
    authMiddleware.checkAccessToken,
    userController.getUsers
);

router.delete(
    '/:user_id',
    authMiddleware.checkAccessToken,
    userMiddleware.userIdMiddleware,
    userController.deleteUser
);
router.put(
    '/:user_id',
    authMiddleware.checkAccessToken,
    userMiddleware.updateUserMiddleware,
    userMiddleware.userIdMiddleware,
    userController.updateUser
);

module.exports = router;
