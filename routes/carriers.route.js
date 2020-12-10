const express = require("express");
const router = express.Router();
const driversController  = require('../controllers/carriers-controller');

// router.get('/', driversController.getAllCarriers);
router.post('/get-carrier', driversController.getCarrier);

module.exports = router;