const express = require("express");
const router = express.Router();
const loginController  = require('../controllers/login-carrier-controller');

router.post('/', loginController.login);
router.post('/change-password', loginController.changePassword);
router.post('/forgot-password-send-code', loginController.sendSMSCode);

// router.get('/', loginController.loginGoogle);
// router.get('/', loginController.loginFacebook);
// router.get('/', loginController.loginApple);

module.exports = router;