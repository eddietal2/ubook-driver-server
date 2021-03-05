const Reciever = require('../../models/recievers.model');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const nodemailer = require('nodemailer');

exports.register = (req, res) => {
  console.log('Registering Reciever ...');
  console.log(req.body);
  
  Reciever.findOne({ email: req.body.email },
    (err, reciever) => {
      if(err) return res.status(400).json(err);
      if(reciever) return res.status(400).json({msg: 'There is already a Reciever registered with that email'})
      if(!reciever) {

        let reciever = {
          usertype: req.body.usertype,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          phone: req.body.phone,
          profilePicture: req.body.profilePicture,
          businessName: req.body.businessName,
          businessAddressOne: req.body.businessAddressOne,
          businessAddressTwo: req.body.businessAddressTwo,
          businessCity: req.body.businessCity,
          businessState: req.body.businessState,
          businessZip: req.body.businessZip,
          businessPhone: req.body.businessPhone,
          businessLogo: req.body.businessLogo,
          stripeToken: req.body.stripeToken,
          password: req.body.password
        }

        console.log(reciever);
        

        let newReciever = Reciever(reciever);

        newReciever.save((err, reciever) => {
          if (err) return err;
          if (!reciever) {
            console.log('There was no Reciever saved');
            return res.status(200).json(reciever);
          };
          if (reciever) {
            console.log('Registered Reciever\n');
            console.log(reciever);
            return res.status(200).json(reciever);
          }
        });
      }
    });
}
exports.checkEmailAndPhone = (req, res) => {
  console.log('Checking Email and Phone ...');
  let email = req.body.email;
  let phone = req.body.phone;

  console.log(email);
  console.log(phone);
  

  Reciever.findOne({ phone: phone },
    (err, reciever) => {
      if(err) return res.status(400).json(err);
      if(Reciever) return res.status(400).json({msg: 'There is already a Reciever registered with that Phone Number'})
      if(!reciever) {
        Reciever.findOne({ email: email },
          (err, reciever) => {
            if(err) return res.status(400).json(err);
            if(reciever) return res.status(400).json({msg: 'There is already a Reciever registered with the Email Address'})
            if(!reciever) {
              return res.status(200).json({msg: 'This user is qualified to register.'})
            }
        });
      }
  });
}
exports.sendSMSCodeReciever = (req, res) => {
  console.log('');
  
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