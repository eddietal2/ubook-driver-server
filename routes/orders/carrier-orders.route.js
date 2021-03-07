const express = require("express");
const router = express.Router();
const carriersOrdersController  = require('../../controllers/orders/carriers-orders-controller');

router.post('/active-orders', carriersOrdersController.getCarriersActiveOrders);

router.post('/future-orders', carriersOrdersController.getCarriersFutureOrders);

router.post('/pending-orders', carriersOrdersController.getCarriersPendingOrders);

router.get('/open-orders', carriersOrdersController.getCarriersOpenOrders);
router.post('/open-order-details', carriersOrdersController.getCarriersOpenOrderDetails);
router.post('/open-order-timer', carriersOrdersController.getCarriersOpenOrderTimer);

router.post('/past-orders', carriersOrdersController.getCarriersPastOrders);

module.exports = router;