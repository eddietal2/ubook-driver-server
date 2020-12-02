const mongoose = require('mongoose');

let DriversSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 250
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

module.exports = Driver = mongoose.model('Driver', DriversSchema);