const express = require("express");
const router = express.Router();
const recieverController  = require('../../controllers/recievers/recievers-controller');

// router.get('/', recieverController.getShippers);
router.get('/get-reciever', recieverController.getReciever);

module.exports = router;