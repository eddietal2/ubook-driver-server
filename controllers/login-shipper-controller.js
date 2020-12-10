const Shipper = require('../models/shippers.model');
const jwt = require('jsonwebtoken');
const config = require('../config/default.json');
const bcrypt = require("bcrypt");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

function createToken(shipper) {
  return jwt.sign({ id: shipper.id, email: shipper.email, usertype: shipper.usertype, name: shipper.name, rating: shipper.rating, title: shipper.title}, config.jwtSecret, {
      expiresIn: 200 // 86400 expires in 24 hours
    });
}

exports.login = (req, res) => {
  let email = req.body.email;
  let usertype = req.body.usertype;
  let password = req.body.password;

  if (!email || !password || !usertype) {
      return res.status(400).send({ 'msg': 'You need to send email, usertype, and password' });
  }

  console.log(`Attemping to log in as ${email}`);

  Shipper.findOne({ email: email }, (err, shipper) => {
      if (err) {
          return res.status(400).send({ msg: err });
      }

      if (!shipper) {
          return res.status(400).json({ msg: 'The Shipper does not exist' });
      }

      shipper.comparePassword(password, (err, isMatch) => {
          if (isMatch && !err) {
              console.log('Logged in as: ' + shipper.email);
              res.status(200).json({
                  token: createToken(shipper)
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

  Shipper.findOne(
      {phone: phone},
      (err, shipper) => {
        if (err) return res.status(400).json(err)
        if (!shipper) return res.status(400).json({msg: 'There was no Shipper with that Phone'})
        if (shipper) {
          console.log('Current Password' + shipper.password);

          shipper.comparePassword(newPassword, (err, isMatch) => {
            console.log(isMatch);
            if(isMatch) {
              return res.status(401).json({msg: 'Please enter a password that you have not used before.'})
            }
            if (!isMatch && !err) {
              bcrypt.genSalt(10, (err, salt) => {

                if (err) return next(err);

                bcrypt.hash(newPassword, salt, (err, hash) => {

                    console.log('New Password Hashed: ' + hash);

                    let newPassword = hash;
                    let filter = { phone: phone };
                    let update = { password: newPassword }

                    Shipper.updateOne(filter, update)
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

exports.sendSMSCode = (req, res) => {
  let phone = req.body.phone;
  let code;

  if (!phone) {
    return res.status(400).json({msg: 'There was no phone number in the request'});
  } else {
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
      console.log(phone);
      client.messages.create({
        body: code,
        from: '+12312626285',
        to: `+${phone}`
      }).then(message => console.log(message.sid));

      return res.status(200).json({code: code})
  }
}
