const Order = require('../../models/order.model');
const Shippers = require('../../models/shippers.model');

exports.getShippersActiveOrders = (req, res) => {
  console.log('Getting this Shipper\'s Active Orders...');
  let email = req.body.email;

  Shipper.findOne(
    {email: email},
    (err, shipper) => {
    if(err) return res.status(400).json(err);
    if(!shipper) return res.status(400).json({msg: 'There were no Shippers!'});
    if(shipper) {
      console.log('Active Orders: ');
      console.log(shipper.activeOrders);
      console.log('\n');
      return res.status(200).json({activeOrders: shipper.activeOrders});
    }
  })
}
exports.getShippersFutureOrders = (req, res) => {
  console.log('Getting this Shipper\'s Future Orders...');
  let email = req.body.email;

  Shipper.findOne(
    {email: email},
    (err, shipper) => {
    if(err) return res.status(400).json(err);
    if(!shipper) return res.status(400).json({msg: 'There were no Shippers!'});
    if(shipper) {
      console.log('Future Orders: ');
      console.log(shipper.futureOrders);
      console.log('\n');
      return res.status(200).json({futureOrders: shipper.futureOrders});
    }
  })
}
exports.getShippersPendingOrderDetails = (req, res) => {
  // Checks Orders Collection and Not Shippers Collection
  // Keeps Bonus Timer consistent with all users viewing pending order.
  // Shipper's version of Pending or does not have a timer.
  // console.log('Getting this Shipper\'s Pending Order Details...');
  let orderID = req.body.orderID;

  Order.findOne(
    {orderID: orderID},
    (err, order) => {
    if(err) return res.status(400).json(err);
    if(!order) return res.status(400).json({msg: 'There were no orders with that order ID!'});
    if(order) {
      // console.log('Pending Orders: ');
      // console.log(order);
      // console.log('\n');
      return res.status(200).json(order);
    }
  })
}
exports.getPendingOrderTimer = (req, res) => {
  // console.log('Getting this Pending Order\'s Bonus Timer ...');
  let orderID = req.body.orderID;

  Order.find(
    {orderID: orderID},
    (err, order) => {
    if(err) return res.status(400).json(err);
    if(!order) return res.status(400).json({msg: 'There were no Orders with that orderID!'});
    if(order) {
      if(order[0] === undefined) {
        return res.status(400).json({msg: 'Timer does not exist'})
      }
      return res.status(200).json(order[0].bonusTimer);
    }
  })
}
exports.deletePendingOrder = (req, res) => {
  console.log('Deleting Pending Order ...');
  let orderID = req.body.orderID;
  let email = req.body.creatorEmail;

  Shipper.findOneAndUpdate(
    {email: email},
    {$pull: { pendingOrders: orderID }},
    {new: true},
    (err, shipper) => {
      if(err) return res.status(400).json(err);
      if(!shipper) return res.status(400).json({msg: 'There were no Orders with that orderID!'});
      if(shipper)  {
        Order.findOneAndDelete(
          {orderID: orderID},
          (err, order) => {
          if(err) return res.status(400).json(err);
          if(!order) return res.status(400).json({msg: 'There were no Orders with that orderID!'});
          if(order) {
            // console.log(order);
            return res.status(200).json(order)
          }
        })
      }
    }
  )
}
exports.getShippersPendingOrders = (req, res) => {
  console.log('Getting this Shipper\'s Pending Orders...');
  let email = req.body.email;
  console.log(email);
  

  Order.find(
    {creatorEmail: email},
    (err, order) => {
    if(err) return res.status(400).json(err);
    if(!order) return res.status(400).json({msg: 'There were no Orders with that orderID!'});
    if(order) {
      console.log('Pending Orders: ');
      console.log(order);
      console.log('\n');
      return res.status(200).json(order);
    }
  })
}
exports.getShippersPastOrders = (req, res) => {
  console.log('Getting this Shipper\'s Past Orders...');
  let email = req.body.email;

  Shipper.findOne(
    {email: email},
    (err, shipper) => {
    if(err) return res.status(400).json(err);
    if(!shipper) return res.status(400).json({msg: 'There were no Shippers!'});
    if(shipper) {
      console.log('Past Orders: ');
      console.log(shipper.pastOrders);
      console.log('\n');
      return res.status(200).json({pastOrders: shipper.pastOrders});
    }
  })
}
exports.getAllShippersOrders = (req, res) => {
  console.log('Getting ALL this Shipper\'s Orders :');
  console.log('\n');

  let email = req.body.email;
  Shipper.findOne(
    {email: email},
    (err, shipper) => {
    if(err) return res.status(400).json(err);
    if(!shipper) return res.status(400).json({msg: 'There were no Shippers!'});
    if(shipper) {
      console.log('Active Orders');
      console.log(shipper.activeOrders);
      console.log('\n');
      console.log('Future Orders');
      console.log(shipper.futureOrders);
      console.log('\n');
      console.log('Pending Orders');
      console.log(shipper.pendingOrders);
      console.log('\n');
      console.log('Past Orders');
      console.log(shipper.pastOrders);
      console.log('\n');
      return res.status(200).json({
        activeOrders: shipper.activeOrders,
        futureOrders: shipper.futureOrders,
        pendingOrders: shipper.pendingOrders,
        pastOrders: shipper.pastOrders,
      });
    }
  })
}
exports.createOrder = (req, res) => {
  console.log('Attempting to Create New Order:');
  console.log('\n');
  function generateID() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    //return id of format 'aaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaa'
    return s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4();
  }
  Shippers.findOne(
      {email: req.body.creatorEmail},
      (err, shipper) => {
        if(err) return err;
        if(!shipper) return res.status(400).json({msg: 'No shipper with that email'})
        if(shipper) {


          let order = {
            bonusTimer: {},
            creatorEmail: req.body.creatorEmail,
            orderCreator:  {
            usertype: 'Shipper',
            name: shipper.firstName + shipper.lastName,
            phone: shipper.phone,
            email: shipper.email,
            businessLogo: shipper.businessLogo,
            stripeToken: shipper.stripeToken,
            businessProfile: {
              businessName: shipper.businessName,
              businessAddressOne: shipper.businessAddressOne,
              businessAddressTwo: shipper.businessAddressTwo,
              businessCity: shipper.businessCity,
              businessState: shipper.businessState,
              businessZip: shipper.businessZip,
              businessPhone: shipper.businessPhone,
              businessLogo: shipper.businessLogo
            }
            },
            status: 'PENDING',
            orderID: generateID(),
            dateCreated: req.body.dateCreated,
            carrier: req.body.carrier,
            startingRate: req.body.startingRate,
            truckType: req.body.truckType,
            weight: req.body.weight,
            loadDescription: req.body.loadDescription,
            specialRequest: req.body.specialRequest,
            photos: req.body.photos,
            broadcastRadius: req.body.broadcastRadius,
            PUDate: req.body.PUDate,
            PUAddressOne: req.body.PUAddressOne,
            PUAddressTwo: req.body.PUAddressTwo,
            PUCity: req.body.PUCity,
            PUState: req.body.PUState,
            PUZip: req.body.PUZip,
            DLDate: req.body.DLDate,
            DLAddressOne: req.body.DLAddressOne,
            DLAddressTwo: req.body.DLAddressTwo,
            DLCity: req.body.DLCity,
            DLState: req.body.DLState,
            DLZip: req.body.DLZip,
        }
        let newOrder = Order(order)
        // console.log(newOrder);

        newOrder.save((err, order) => {
          console.log('Attempting to Save Order to Database');
          if (err) return err;
          if (!order) {
            console.log('There was no order created');
            return res.status(200).json(order);
          };
          if (order) {
            console.log('Created new Order!\n');
            console.log(order._id);

            Shippers.findOneAndUpdate(
              {email: req.body.creatorEmail},
              {$push: { pendingOrders: order.orderID }},
              {new: true},
              (err, shipper) => {}
            )
            return res.status(200).json(order);
          }
        })
        }
  })
}