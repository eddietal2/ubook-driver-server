const express = require("express");
const router = express.Router();
const registerController  = require('../controllers/register-controller');

router.post('/', registerController.register);
router.post('/send-sms-code', registerController.sendSMSCode);
router.post('/send-email-code', registerController.sendEmailCode);
router.post('/check-email-and-phone', registerController.checkEmailAndPhone);

module.exports = router;