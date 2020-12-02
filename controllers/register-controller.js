const Driver = require('../models/drivers.model');

exports.register = (req, res) => {
  console.log('Driver Registering ...');
  Driver.findOne({ email: req.body.email },
    (err, driver) => {
      if(err) return res.status(400).json(err);
      if(driver) return res.status(400).json({msg: 'There is already a Driver registered with that email'})
      if(!driver) {
        let driver = {
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        }

        let newDriver = Driver(driver);

        newDriver.save((err, driver) => {
          if (err) return err;
          if (!driver) {
            console.log('There was no driver saved');
            return res.status(200).json(driver);
          };
          if (driver) {
            console.log('Registered Driver\n');
            console.log(driver);
            return res.status(200).json(driver);
          }
        });
      }
    });
}