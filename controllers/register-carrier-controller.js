const Carrier = require('../models/carriers.model');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const nodemailer = require('nodemailer');


exports.register = (req, res) => {
  console.log('Carrier Registering ...');
  let name = req.body.name;
  let email = req.body.email;
  let phone = req.body.phone;
  let password = req.body.password;

  Carrier.findOne({ email: email },
    (err, carrier) => {
      if(err) return res.status(400).json(err);
      if(carrier) return res.status(400).json({msg: 'There is already a Carrier registered with that email'})
      if(!carrier) {
        console.log('Yooo');
        
        let carrier = {
          name: name,
          email: email,
          phone: phone,
          password: password
        }

        let newCarrier = Carrier(carrier);

        console.log(newCarrier);

        newCarrier.save((err, carrier) => {
          if (err) return res.status(400).json(err);
          if (!carrier) {
            console.log('There was no carrier saved');
            return res.status(200).json(carrier);
          };
          if (carrier) {
            console.log('Registered carrier\n');
            console.log(carrier);
            return res.status(200).json(carrier);
          }
        });
      }
    });
}
exports.checkEmailAndPhone = (req, res) => {
  let email = req.body.email;
  let phone = req.body.phone;
  console.log('Checking Email and Phone ...');
  console.log(email);
  console.log(phone);

  Carrier.findOne({ phone: phone },
    (err, carrier) => {
      if(err) return res.status(400).json(err);
      if(carrier) return res.status(400).json({msg: 'There is already a Carrier registered with that Phone Number'})
      if(!carrier) {
        Carrier.findOne({ email: email },
          (err, carrier) => {
            if(err) return res.status(400).json(err);
            if(carrier) return res.status(400).json({msg: 'There is already a Carrier registered with the Email Address'})
            if(!carrier) {
              return res.status(200).json({msg: 'This user is qualified to register.'})
            }
        });
      }
  });
}
exports.sendSMSCode = (req, res) => {
  let phone = req.body.phone;
  let code;

  if (!phone) {
    return res.status(400).json({msg: 'There was no phone number in the request'});
  } else {
      let code = generateCode(6);
      console.log('Attemtping to send SMS');
      console.log(phone);
      client.messages.create({
        body: `${code}`,
        from: '+12312626285',
        to: `+17342237792`
      }).then(message => console.log(message.sid));

      return res.status(200).json({code: code})
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
  return this.code = result;
    }
