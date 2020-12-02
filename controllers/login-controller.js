const Driver = require('../models/drivers.model');

exports.login = (req, res) => {
  console.log('Driver logging in..');
  return res.status(200).send('wassup');
}