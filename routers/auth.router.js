const router = require('express').Router();

const {authController} = require('../controllers');
const {authMiddleware} = require('../middlewares');

router.post(
    '/',
    authMiddleware.isAuthValid,
    authMiddleware.logInMiddleware,
    authController.logIn
);

router.post(
    '/refresh',
    authMiddleware.checkRefreshToken,
    authController.refreshToken,
);

router.post(
    '/logOut',
    authMiddleware.checkAccessToken,
    authController.logOut
);

module.exports = router;
