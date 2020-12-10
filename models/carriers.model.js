const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const config = require('config');
const jwt = require('jsonwebtoken');

let CarriersSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 250
  },
  phone: {
    type: String,
    maxlength: 11
  },
  description: {
    type: String,
    maxlength: 300
  },
  email: {
    type: String,
    maxlength: 100
  },
  rating: {
    type: Number,
    default: 0
  },
  addressOne: {
    type: String,
    maxlength: 100
  },
  addressTwo: {
    type: String,
    maxlength: 100
  },
  zip: {
    type: String,
    maxlength: 100
  },
  city: {
    type: String,
    maxlength: 100
  },
  state: {
    type: String,
    maxlength: 100
  },
  usertype: {
    type: String,
    maxlength: 20
  },
  liscensePicture: {
    type: String,
    maxlength: 200
  },
  liscenseNumber: {
    type: String,
    maxlength: 200
  },
  insurance: {
    type: String,
    maxlength: 200
  },
  password: {
    type: String,
    minlength: 7
  }
})

// Called before save method on the carrier model
// Turns carrier entered password into a hash value, with salt
CarriersSchema.pre('save', function(next){
  // had to use a regular function ^ to get the correct scope of 'this'.
  var carrier = this;
  if (!carrier.isModified('password')) return next();

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(carrier.password, salt, (err, hash) => {
      if (err) return next(err);
      if(hash) {
        carrier.password = hash;
        this.password = carrier.password;
        console.log('Password Hashed');
        console.log(carrier.password);
        return next();
      }
    })
  })
  })
  
  CarriersSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    console.log('Password: ' + candidatePassword);
    console.log('Hashed Password: ' + this.password);
    console.log('Passwords Match: ' + isMatch);
    if (err) return cb(err);
    cb(null, isMatch);
  })
}
//custom method to generate authToken
CarriersSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({ _id: this._id }, config.get('myprivatekey')); //get the private key from the config file -> environment variable
  return token;
}

module.exports = Carrier = mongoose.model('Carrier', CarriersSchema);