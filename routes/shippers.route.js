const express = require("express");
const router = express.Router();
const shippersController  = require('../controllers/shippers-controller');

// router.get('/', shippersController.getShippers);
router.get('/get-shipper', shippersController.getShipper);

module.exports = router;