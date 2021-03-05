const express = require("express");
const router = express.Router();
const shippersController  = require('../../controllers/shippers/shippers-controller');

router.get('/', shippersController.getShippers);
router.post('/get-shipper', shippersController.getShipper);
router.post('/edit-shipper-name', shippersController.editShipperName);
router.post('/edit-shipper-email', shippersController.editShipperEmail);
router.post('/edit-shipper-phone', shippersController.editShipperPhone);
router.post('/edit-shipper-business-profile', shippersController.editShipperBusinessProfile);
// router.post('/edit-shipper-business-logo', shippersController.editShipperBusinessLogo);
// router.post('/edit-shipper-payment', shippersController.editShipperPayment);
// router.post('/edit-shipper-password', shippersController.editShipperPassword);
// router.post('/edit-shipper-profile-picture', shippersController.editShipperPicture);

module.exports = router;