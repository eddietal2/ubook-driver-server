const express = require("express");
const router = express.Router();
const registerController  = require('../../controllers/recievers/register-reciever-controller');

router.post('/', registerController.register);
router.post('/send-sms-code', registerController.sendSMSCodeReciever);
router.post('/send-email-code', registerController.sendEmailCode);
router.post('/check-email-and-phone', registerController.checkEmailAndPhone);

module.exports = router;