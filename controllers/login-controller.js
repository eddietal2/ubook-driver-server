const Driver = require('../models/drivers.model');
const jwt = require('jsonwebtoken');
const config = require('../config/default.json');
const bcrypt = require("bcrypt");

function createToken(driver) {
  return jwt.sign({ id: driver.id, email: driver.email }, config.jwtSecret, {
      expiresIn: 200 // 86400 expires in 24 hours
    });
}

exports.login = (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  if (!email || !password) {
      return res.status(400).send({ 'msg': 'You need to send email and password' });
  }

  console.log(`Attemping to log in as ${email}`);

  Driver.findOne({ email: email }, (err, driver) => {
      if (err) {
          return res.status(400).send({ 'msg': err });
      }

      if (!Driver) {
          return res.status(400).json({ 'msg': 'The Driver does not exist' });
      }

      Driver.comparePassword(password, (err, isMatch) => {
          if (isMatch && !err) {
              console.log('Logged in as: ' + driver.email);
              res.status(200).json({
                  token: createToken(driver)
              });
          } else {
              return res.status(400).json({ msg: 'The email and password don\'t match.' });
          }
      });
  });
}

exports.forgotPassword = (req, res) => {

  let email = req.body.email
  let newPassword = req.body.newPassword

  Driver.findOne(
      {email: email},
      (err, driver) => {
        if (err) return res.status(400).json(err)
        if (!driver) return res.status(400).json({msg: 'There was no Driver with that Email'})
        if (driver) {
          console.log('Current Password' + driver.password);
          Driver.comparePassword(newPassword, (err, isMatch) => {
            console.log(isMatch);
            if (isMatch && !err) {
                console.log('Passwords Match. Use a new password');
                return res.status(401).json({ msg: 'Passwords Match. Use a new password' });
            } else {
              // Create new hashed password
              bcrypt.genSalt(10, (err, salt) => {

              if (err) return next(err);

                bcrypt.hash(newPassword, salt, (err, hash) => {

                  console.log('New Password Hashed: ' + hash);

                  let newPassword = hash;
                  let filter = { email: email };
                  let update = { password: newPassword }

                  Driver.updateOne(filter, update)
                  .then( data => {
                    console.log('Updated Password: ' + JSON.stringify(data));
                    return res.status(200).json({msg: 'Password Changed'});
                  })
                  .catch( err => {
                    console.log(err);
                    res.status(400).end('There was an error');
                  })
                })
              })
            }
        });
        }
      }
      )
};