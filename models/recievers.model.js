const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const config = require('config');
const jwt = require('jsonwebtoken');

let RecieversSchema = new mongoose.Schema({
  usertype: {
    type: String,
    maxlength: 20,
  },
  rating: {
    type: Number,
    default: 0
  },
  firstName: {
    type: String,
    maxlength: 30
  },
  lastName: {
    type: String,
    maxlength: 30
  },
  phone: {
    type: String,
    maxlength: 11
  },
  profilePicture: {
    type: String,
  },
  email: {
    type: String,
    maxlength: 100
  },
  businessAddressOne: {
    type: String,
    maxlength: 600
  },
  businessAddressTwo: {
    type: String,
    maxlength: 200
  },
  businessCity: {
    type: String,
    maxlength: 200
  },
  businessState: {
    type: String,
    maxlength: 100
  },
  businessZip: {
    type: String,
    maxlength: 100
  },
  businessPhone: {
    type: String,
    maxlength: 16
  },
  businessName: {
    type: String,
  },
  businessLogo: {
    type: String,
  },
  activeOrders: {
    type: Array,
    default: []
  },
  pastOrders: {
    type: Array,
    default: []
  },
  futureOrders: {
    type: Array,
    default: []
  },
  pendingOrders: {
    type: Array,
    default: []
  },
  stripeToken: {
    type: Array,
    default: Object
  },
  password: {
    type: String,
  },
})

// Called before save method on the Reciever model
// Turns Reciever entered password into a hash value, with salt
RecieversSchema.pre('save', function(next){
  // had to use a regular function ^ to get the correct scope of 'this'.
  var reciever = this;
  if (!reciever.isModified('password')) return next();

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(reciever.password, salt, (err, hash) => {
      if (err) return next(err);
      if(hash) {
        reciever.password = hash;
        this.password = reciever.password;
        console.log('Password Hashed');
        console.log(reciever.password);
        return next();
      }
    })
  })
  })
RecieversSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    console.log('Candidate Password: ' + candidatePassword);
    console.log('Hashed Password: ' + this.password);
    console.log('Passwords Match: ' + isMatch);
    if (err) return cb(err);
    cb(null, isMatch);
  })
}
//custom method to generate authToken
RecieversSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({ _id: this._id }, config.get('myprivatekey')); //get the private key from the config file -> environment variable
  return token;
}

module.exports = Reciever = mongoose.model('Reciever', RecieversSchema);