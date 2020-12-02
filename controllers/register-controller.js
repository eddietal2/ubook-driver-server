const Driver = require('../models/drivers.model');

exports.register = (req, res) => {
  console.log('Driver Registering ...');
  return res.status(200).send('Register');
}