const express = require("express");
const router = express.Router();
const loginController  = require('../controllers/login-controller');

router.get('/', loginController.login);
// router.get('/', loginController.forgotPassword);

// router.get('/', loginController.loginGoogle);
// router.get('/', loginController.loginFacebook);
// router.get('/', loginController.loginApple);

module.exports = router;