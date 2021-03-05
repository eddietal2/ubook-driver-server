const Carrier = require('../../models/carriers.model');

// exports.getAllCarrier = (req, res) => {
//   console.log('Getting all Carriers ...');
//   Carrier.find((err, carriers) => {
//     console.log(carriers);
//   })
// }
exports.getCarrier = (req, res) => {
  let email = req.body.email;
  let usertype = req.body.usertype;
  console.log('Getting Carrier Information ...');
  Carrier.findOne(
    {email: email},
    (err, carrier) => {
    if (err) {
      console.log(err);
      return err;
    }
    if (!carrier) {
      console.log('There was no Carrier with that email');
      return res.status(400).json({msg: 'There was no Carrier with that email'});
    }
    if (carrier) {
      console.log(carrier);
      return res.status(200).json(carrier);
    }
  })
}