const Driver = require('../models/drivers.model');

exports.register = (req, res) => {
  console.log('Driver Registering ...');
  let name = req.body.name;
  let email = req.body.email;
  let phone = "1" + req.body.phone;
  let password = req.body.password;

  Driver.findOne({ email: req.body.email },
    (err, driver) => {
      if(err) return res.status(400).json(err);
      if(driver) return res.status(400).json({msg: 'There is already a Driver registered with that email'})
      if(!driver) {
        let driver = {
          name: name,
          email: email,
          phone: phone,
          password: password
        }

        let newDriver = Driver(driver);

        newDriver.save((err, driver) => {
          if (err) return err;
          if (!driver) {
            console.log('There was no driver saved');
            return res.status(200).json(driver);
          };
          if (driver) {
            console.log('Registered driver\n');
            console.log(driver);
            return res.status(200).json(driver);
          }
        });
      }
    });
}