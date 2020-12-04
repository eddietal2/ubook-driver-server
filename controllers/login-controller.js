const Driver = require('../models/drivers.model');
const jwt = require('jsonwebtoken');
const config = require('../config/default.json');
const bcrypt = require("bcrypt");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

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

      driver.comparePassword(password, (err, isMatch) => {
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

exports.changePassword = (req, res) => {

  let phone = req.body.phone
  let newPassword = req.body.password

  Driver.findOne(
      {phone: phone},
      (err, driver) => {
        if (err) return res.status(400).json(err)
        if (!driver) return res.status(400).json({msg: 'There was no Driver with that Phone'})
        if (driver) {
          console.log('Current Password' + driver.password);

          driver.comparePassword(newPassword, (err, isMatch) => {
            console.log(isMatch);
            if (!isMatch && !err) {
              bcrypt.genSalt(10, (err, salt) => {

                if (err) return next(err);

                bcrypt.hash(newPassword, salt, (err, hash) => {

                    console.log('New Password Hashed: ' + hash);

                    let newPassword = hash;
                    let filter = { phone: phone };
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

exports.sendCode = (req, res) => {
  let type = req.body.type;
  let value = req.body.value;

  console.log(value);
  if (type === 'Phone') {
    console.log('User is recieving code through SMS');
    Driver.findOne(
      {phone: value},
      (err, driver) => {
        if (err) return res.status(400).json(err)
        if (!driver) {
          console.log('No Driver with that Phone Number');
          return res.status(400).json({msg: 'Driver with that phone number does not exist'})
        }
        if (driver) {
          console.log('Found Driver with that Phone Number');
          console.log(driver);
        }
      }
    )
    client.messages
      .create({
        body: this.code,
        from: '+12312626285',
        to: `+${value}`
   })
  .then(message => console.log(message.sid));
  }
  if (type === 'Email') {
    console.log('User is recieving code through Email');
    Driver.findOne(
      {email: value},
      (err, driver) => {
        if (err) return res.status(400).json(err)
        if (!driver) {
          console.log('No Driver with that Email');
          return res.status(400).json({msg: 'Driver with that email does not exist'})
        }
        if (driver) {
          console.log('Found Driver with that Email');
          console.log(driver);
        }
      }
    )
  }

  let code;
  function generateCode(length) {
    let result = '';
    const characters = '0123456789';
    const charactersLength = characters.length;

    for ( let i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    console.log('Generated Code: ' + result);
    return code = result;
  }
  generateCode(6);
  console.log('Attemtping to send SMS');

}
