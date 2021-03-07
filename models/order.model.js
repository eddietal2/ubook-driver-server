const mongoose = require('mongoose');
const format = require('date-fns/format');

let OrderSchema = new mongoose.Schema({
  orderID: {
    type: String,
  },
  bonusTimer: {
    type: Object,
  },
  creatorEmail: {
    type: String,
  },
  orderCreator: {
    type: Object
  },
  bidders: {
    type: Array,
    default: []
  },
  dateCreated: {
    type: Date,
  },
  status: {
    type: String,
  },
  carrier: {
    type: Object,
  },
  startingRate: {
    type: String,
  },
  truckType: {
    type: String,
  },
  weight: {
    type: Number,
  },
  loadDescription: {
    type: String,
    maxlength: 500
  },
  specialRequest: {
    type: String,
    maxlength: 500
  },
  photos: {
    type: Array,
  },
  broadcastRadius: {
    type: Number,
    minlength: 100,
    maxlength: 1000
  },
  PUDate: {
  },
  PUAddressOne: {
    type: String,
    maxlength: 150
  },
  PUAddressTwo: {
    type: String,
    maxlength: 150
  },
  PUCity: {
    type: String,
    maxlength: 150
  },
  PUState: {
    type: String,
    maxlength: 150
  },
  PUZip: {
    type: String,
    maxlength: 150
  },
  DLDate: {
  },
  DLAddressOne: {
    type: String,
    maxlength: 150
  },
  DLAddressTwo: {
    type: String,
    maxlength: 150
  },
  DLCity: {
    type: String,
    maxlength: 150
  },
  DLState: {
    type: String,
    maxlength: 150
  },
  DLZip: {
    type: String,
    maxlength: 150
  },
  messages: {
    type: Array,
  },
})

OrderSchema.post('save', function(doc) {
  console.log('From Post Hook after Save: ');
  console.log(doc._id);
  console.log(doc.bonusTimer);
  console.log('\n');

  // Format each Orders Date
  console.log(format(new Date(doc.PUDate), 'EEEE, LLL Mo - hh:mm aaa'));
  console.log(format(new Date(doc.DLDate), 'EEEE, LLL Mo - hh:mm aaa'));
  

  // Set the date we're counting down to
  var countDownDate = new Date().getTime();
  // Update the count down every 1 second
  var timer = setInterval(async function() {
    // To Update Order with Bonus Timer right after it is saved to the Orders Collection
    let Order = mongoose.model('Order', OrderSchema);
    // Bonus Timer Object with booleans to updates users UI at 5, 10, 14, and 15 minutes
    
    // Get today's date and time
    let now = new Date().getTime();
    // Find the distance between now and the count down date
    let distance = now - countDownDate;
    // console.log(distance);
    // Time calculations minutes and seconds
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    let bonusTimer = {
      orderID: doc.orderID,
      minutes: minutes,
      seconds: seconds,
      after5Minutes: false,
      after10Minutes: false,
      after14Minutes: false,
      expired: false,
    }

    if (seconds <= 9) {
      bonusTimer.seconds = '0' + seconds;
    }
    // Minutes 10 - 15, add a 0 to the minutes timer
    if (minutes <= 10) {
      minutes = minutes;
    }
    if (minutes >= 10 ) {
    }
    if (minutes >= 5 ) {
    // console.log('It has been 5 minutes!');
    //  Send Notification
    bonusTimer.after5Minutes = true;
    }
    if (minutes >= 10 ) {
    // console.log('It has been 10 minutes!');
    //  Send Notification
    bonusTimer.after10Minutes = true;
    }
    if (minutes >= 14) {
    // console.log('It has been 14 minutes!');
    //  Send Notification
    bonusTimer.after14Minutes = true;
    }
    // When timer expires after 15 minutes
    if (minutes > 15) {
      console.log('Timer Expired');
      bonusTimer.expired = true;
      return clearInterval(timer)
    }
    // console.log(minutes + ':' + seconds);
    formateddPUDate = format(new Date(doc.PUDate), 'EEEE, LLL Mo - hh:mm aaa');
    formateddDLDate = format(new Date(doc.DLDate), 'EEEE, LLL Mo - hh:mm aaa');
    Order.findOneAndUpdate(
      {_id: doc._id},
      { $set: {
        bonusTimer,
        PUDate: formateddPUDate,
        DLDate: formateddDLDate
      }},
      {new: true},
      (err, order) => {
        if(err) return err;
        if(!order) {
          console.log('No Order witht hat ID')
        }
        if(order) {
          // console.log(order.bonusTimer)
        }
      }
    );
  }, 1000);
});


module.exports = Order = mongoose.model('Order', OrderSchema);