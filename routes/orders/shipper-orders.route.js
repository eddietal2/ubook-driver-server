const express = require("express");
const router = express.Router();
const shippersOrdersController  = require('../../controllers/orders/shippers-orders-controller');

router.post('/active-orders', shippersOrdersController.getShippersActiveOrders);

router.post('/future-orders', shippersOrdersController.getShippersFutureOrders);

router.post('/pending-orders', shippersOrdersController.getShippersPendingOrders);
router.post('/pending-order-details', shippersOrdersController.getShippersPendingOrderDetails);
router.post('/pending-order-timer', shippersOrdersController.getPendingOrderTimer);
router.post('/delete-pending-order', shippersOrdersController.deletePendingOrder);

router.post('/past-orders', shippersOrdersController.getShippersPastOrders);
router.post('/all-orders', shippersOrdersController.getAllShippersOrders);
router.post('/create-order', shippersOrdersController.createOrder);

module.exports = router;