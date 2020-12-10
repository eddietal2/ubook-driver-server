const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const config = require('config');
const jwt = require('jsonwebtoken');

let OrdersSchema = new mongoose.Schema({
  title: {
    type: String,
    maxlength: 250
  },
  carrier: {
    type: Object,
  },
  shipper: {
    type: Object,
  },
  weight: {
    type: String,
  },
  description: {
    type: String,
    maxlength: 500
  },
  pickUpLocation: {
    type: String,
    maxlength: 500
  },
  dropOffLocation: {
    type: String,
    maxlength: 500
  },
  currentLocation: {
    type: String,
    maxlength: 500
  },
  messages: {
    type: Array,
  },
})


module.exports = Order = mongoose.model('Order', OrdersSchema);