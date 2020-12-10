const Shipper = require('../models/shippers.model');

// exports.getShippers = (req, res) => {
//   console.log('Getting all Shippers ...');
//   Shipper.find((err, shippers) => {
//     console.log(shippers);
//     if(err) return res.status(400).json(err);
//     if(!shippers) return res.status(400).json({msg: 'There were no Shippers!'});
//     if(shippers) {
//       console.log('All Shippers: ');
//       return res.status(200).json(shippers);
//     }
//   })
// }
exports.getShipper = (req, res) => {
  console.log('Getting Shipper ...');
  Shipper.find((err, shippers) => {
    console.log(shippers);
    if(err) return res.status(400).json(err);
    if(!shippers) return res.status(400).json({msg: 'There were no Shippers!'});
    if(shippers) {
      console.log('All Shippers: ');
      return res.status(200).json(shippers);
    }
  })
}