const express    = require("express");
const app        = express();
const dotenv     = require('dotenv');
const mongoose   = require("mongoose");
const cors       = require('cors');
const https      = require("https")
const fs         = require("fs");

// Configure Environment Variables
dotenv.config();

const carriersRoute              = require("./routes/carriers/carriers.route.js");
const carrierLoginRoute              = require("./routes/carriers/login-carrier.route.js");
const carrierRegisterRoute           = require("./routes/carriers/register-carrier.route.js");
const carrierOrdersRoute           = require("./routes/orders/carrier-orders.route.js");


const shippersRoute              = require("./routes/shippers/shippers.route.js");
const shipperLoginRoute              = require("./routes/shippers/login-shipper.route.js");
const shipperRegisterRoute           = require("./routes/shippers/register-shipper.route.js");
const shipperOrdersRoute           = require("./routes/orders/shipper-orders.route");


const recieversRoute              = require("./routes/recievers/recievers.route.js");
const recieverLoginRoute              = require("./routes/recievers/login-reciever.route.js");
const recieverRegisterRoute           = require("./routes/recievers/register-reciever.route.js");


console.log(process.env.DB_HOST_DEV)

mongoose
  // For DeprecationWarning:  collection.ensureIndex is deprecated.  Use createIndexes instead.
  .set('useCreateIndex', true)
  .set('useFindAndModify', false)
  .connect(process.env.DB_HOST_DEV, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB...\n"))
  .catch(err =>
    console.error(err))

app.use(cors());
app.use(express.json());

app.use("/api/carrier", carriersRoute);
app.use("/api/carrier/login", carrierLoginRoute);
app.use("/api/carrier/register", carrierRegisterRoute);
app.use("/api/carrier/orders", carrierOrdersRoute);

app.use("/api/shipper", shippersRoute);
app.use("/api/shipper/login", shipperLoginRoute);
app.use("/api/shipper/register", shipperRegisterRoute);
app.use("/api/shipper/orders", shipperOrdersRoute);

app.use("/api/reciever", recieversRoute);
app.use("/api/reciever/login", recieverLoginRoute);
app.use("/api/reciever/register", recieverRegisterRoute);

const port = process.env.PORT || 4000;
server = app.listen(port, () => {
  console.log('Starting UBook Driver Server\n');
  console.log(`Listening on port ${port}...`)
});

