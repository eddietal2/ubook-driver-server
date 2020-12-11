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
  console.log(phone);
  

  if (!phone) {
    return res.status(400).json({msg: 'There was no phone number in the request'});
  } else {
      Shipper.findOne(
        {phone: phone},
        (err, shipper) => {
          if (err) {
            return res.status(400).json(err);
          }
          if (!shipper) {
            return res.status(400).json({msg: 'There was no Shipper with that Phone Number'});
          }
          if (shipper) {
            generateCode(6);
            console.log('Attemtping to send SMS to Shipper');
            console.log(phone);
            client.messages.create({
              body: code,
              from: '+12312626285',
              to: `+${phone}`
            }).then(message => console.log(message.sid));
            return res.status(200).json({code: code})
          }
        }
      )
  }
}

exports.sendEmailCode = (req, res) => {
  
  let email = req.body.email;
  let code = req.body.code;
  console.log(`Sending code to ${email}`);

  if (!email) {
    return res.status(400).json({msg: 'There was no email address in the request'});
  }
  if (!code) {
    return res.status(400).json({msg: 'There was no code in the request'});
  }

  // Set transport service which will send the emails
  var transporter =  nodemailer.createTransport({
    service: 'gmail',
    auth: {
          user: 'eddielacrosse2@gmail.com',
          pass: 'taliaferro2'
      },
      // debug: true, // show debug output
      // logger: true // log information in console
  });

  //  configuration for email details
  const mailOptions = {
  from: 'eddielacrosse2@gmail.com', // sender address
  to: email, // list of receivers
  subject: `Forgot Password Code`,
  html: `
    <h1>${code}</h1>
  `,
  // attachments: [
  //   {
  //     filename: 'fyf-logo-2.png',
  //     path: './assets/fyf-logo-2.png',
  //     cid: 'unique@logo.ee' //same cid value as in the html img src
  //   },
  //   {
  //     filename: `${mentorMessage.studentName}'s Profile Picture.jpg`,
  //     path: `${mentorMessage.studentProfilePic}`,
  //     cid: 'unique@profile.ee'
  //   },
  // ]
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if(err)
      console.log(err)
    else
      console.log(info);
  });
}

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
