const express = require("express");
const router = express.Router();
const loginController  = require('../controllers/login-controller');

router.get('/', loginController.login);
router.post('/forgot-password', loginController.forgotPassword);
router.post('/forgot-password-send-code', loginController.sendCode);

// router.get('/', loginController.loginGoogle);
// router.get('/', loginController.loginFacebook);
// router.get('/', loginController.loginApple);

module.exports = router;