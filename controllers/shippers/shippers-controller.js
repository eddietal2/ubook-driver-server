const Shipper = require('../../models/shippers.model');

exports.getShippers = (req, res) => {
  console.log('Getting all Shippers ...');
  Shipper.find((err, shippers) => {
    console.log(shippers);
    if(err) return res.status(400).json(err);
    if(!shippers) return res.status(400).json({msg: 'There were no Shippers!'});
    if(shippers) {
      console.log('All Shippers: ');
      return res.status(200).json(shippers);
    }
  })
}
exports.getShipper = (req, res) => {
  console.log('Getting Shipper ...');
  let shipperEmail = req.body.email;
  if(!shipperEmail) {
    return res.status(400).json({msg: 'Request had no email.'})
  }
  if(shipperEmail) {
    Shipper.findOne(
      {email: shipperEmail},
      (err, shipper) => {
      console.log(shipper);
      if(err) return res.status(400).json(err);
      if(!shipper) return res.status(400).json({msg: 'There were no Shipper with that email!'});
      if(shipper) {
        console.log('Shipper: ');
        console.log(shipper);
        return res.status(200).json(shipper);
      }
    })
  }
  
}
exports.editShipperName = (req, res) => {
  let email = req.body.email;
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;

  Shipper.findOneAndUpdate({
    email: email
  },
  {
    firstName: firstName,
    lastName: lastName
  },
  {
    new: true
  },
  (err, shipper) => {
    if(err) { return res.status(400).json(err)}
    if(!shipper) { return res.status(400).json({msg: 'There was no shipper with that email'})}
    if(shipper) {
      console.log('Successfully editted Shipper Name!');
      return res.status(200).json(shipper)
  }
})
}
exports.editShipperEmail = (req, res) => {
  let email = req.body.email;
  let newEmail = req.body.newEmail;
  console.log('Getting Shipper Email ...');

  Shipper.findOneAndUpdate({
    email: email
  },
  {
    email: newEmail,
  },
  {
    new: true
  },
  (err, shipper) => {
    if(err) { return res.status(400).json(err)}
    if(!shipper) { return res.status(400).json({msg: 'There was no shipper with that email'})}
    if(shipper) {
      console.log('Successfully editted Shipper Email!');
      return res.status(200).json(shipper)
  }
  })
}
exports.editShipperPhone = (req, res) => {
  let email = req.body.email;
  let newPhone = req.body.newPhone;
  console.log('Getting Shipper Phone ...');
  Shipper.findOneAndUpdate({
    email: email
  },
  {
    phone: newPhone,
  },
  {
    new: true
  },
  (err, shipper) => {
    if(err) { return res.status(400).json(err)}
    if(!shipper) { return res.status(400).json({msg: 'There was no shipper with that email'})}
    if(shipper) {
      console.log('Successfully editted Shipper Phone!');
      return res.status(200).json(shipper)
  }
  })
}
exports.editShipperBusinessProfile = (req, res) => {
  let email = req.body.email;
  let businessName = req.body.businessName;
  let businessAddressOne = req.body.businessAddressOne;
  let businessAddressTwo = req.body.businessAddressTwo;
  let businessCity = req.body.businessCity;
  let businessState = req.body.businessState;
  let businessZip = req.body.businessZip;
  let businessPhone = req.body.businessPhone;Shipper.findOneAndUpdate({
    email: email
  },
  {
    businessName: businessName,
    businessAddressOne: businessAddressOne,
    businessAddressTwo: businessAddressTwo,
    businessCity: businessCity,
    businessState: businessState,
    businessZip: businessZip,
    businessPhone: businessPhone,

  },
  {
    new: true
  },
  (err, shipper) => {
    if(err) { return res.status(400).json(err)}
    if(!shipper) { return res.status(400).json({msg: 'There was no shipper with that email'})}
    if(shipper) {
      console.log('Successfully editted Shipper Business Profile!');
      return res.status(200).json(shipper)
  }
  })


}
exports.editShipperBusinessLogo = (req, res) => {
  let email = req.body.email;
  let businessLogo = req.body.businessLogo;
}
exports.editShipperPayment = (req, res) => {
  let email = req.body.email;
  let stripeToken = req.body.stripeToken;
}
exports.editShipperPassword = (req, res) => {
  let email = req.body.email;
  let oldPassword = req.body.oldPassword;
  let newPassword = req.body.newPassword;
}
exports.editShipperPicture = (req, res) => {
  let email = req.body.email;
  let picture = req.body.picture;
}

