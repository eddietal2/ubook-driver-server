const Order = require('../../models/order.model');
const Carriers = require('../../models/carriers.model');

exports.getCarriersActiveOrders = (req, res) => {
  console.log('Getting this Carrier\'s Active Orders...');
  let email = req.body.email;

}
exports.getCarriersFutureOrders = (req, res) => {
  console.log('Getting this Carrier\'s Future Orders...');
  let email = req.body.email;

}
exports.getCarriersPendingOrders = (req, res) => {
  console.log('Getting this Carrier\'s Pending Orders...');
  let email = req.body.email;

}
exports.getCarriersOpenOrders = (req, res) => {
  console.log('Getting this Carrier\'s Open Orders...');
  Order.find(
    {status: "PENDING"},
    (err, order) => {
      if(err) return err;
      if(!order) return res.status(400).json({msg: 'There were no Orders with that orderID!'});
      if(order) {
        console.log('Amount of Open Orders: ');
        console.log(order.length);
        return res.status(200).json(order)
      }
    }
    
  )

}
exports.getCarriersOpenOrderDetails = (req, res) => {
  let orderID = req.body.orderID;
  console.log('Getting this Carrier\'s Open Orders...');
  Order.find(
    {status: "PENDING", orderID},
    (err, order) => {
      if(err) return err;
      if(!order) return res.status(400).json({msg: 'There were no Orders with that orderID!'});
      if(order) {
        console.log('Amount of Open Orders: ');
        console.log(order.length);
        return res.status(200).json(order)
      }
    }
    
  )

}
exports.getCarriersOpenOrderTimer = (req, res) => {
   console.log('Getting this Open Order\'s Bonus Timer ...');
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
exports.getCarriersPastOrders = (req, res) => {
  console.log('Getting this Carrier\'s Past Orders...');
  let email = req.body.email;

}