const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const config = require('config');
const jwt = require('jsonwebtoken');

let DriversSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 250
  },
  phone: {
    type: Number,
    maxlength: 10
  },
  email: {
    type: String,
    maxlength: 100
  },
  password: {
    type: String,
    minlength: 7
  }
})

// Called before save method on the driver model
// Turns driver entered password into a hash value, with salt
DriversSchema.pre('save', function(next){
  // had to use a regular function ^ to get the correct scope of 'this'.
  var driver = this;
  if (!driver.isModified('password')) return next();

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(driver.password, salt, (err, hash) => {
      if (err) return next(err);
      if(hash) {
        driver.password = hash;
        this.password = driver.password;
        console.log('Password Hashed');
        console.log(driver.password);
        return next();
      }
    })
  })
  })
  
  DriversSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    console.log('Password: ' + candidatePassword);
    console.log('Hashed Password: ' + this.password);
    console.log('Passwords Match: ' + isMatch);
    if (err) return cb(err);
    cb(null, isMatch);
  })
}
//custom method to generate authToken
DriversSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({ _id: this._id }, config.get('myprivatekey')); //get the private key from the config file -> environment variable
  return token;
}

module.exports = Driver = mongoose.model('Driver', DriversSchema);