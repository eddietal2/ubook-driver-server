const Driver = require('../models/drivers.model');

exports.getDrivers = (req, res) => {
  console.log('Getting all Drivers ...');
  Driver.find((err, drivers) => {
    console.log(drivers);
    
  })
}