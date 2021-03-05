const Shipper = require('../../models/recievers.model');

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
exports.getReciever = (req, res) => {
  console.log('Getting Reciever ...');
  Shipper.find((err, recievers) => {
    console.log(recievers);
    if(err) return res.status(400).json(err);
    if(!recievers) return res.status(400).json({msg: 'There were no Recievers!'});
    if(recievers) {
      console.log('All Reciever: ');
      return res.status(200).json(recievers);
    }
  })
}