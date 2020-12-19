const express    = require("express");
const app        = express();
const dotenv     = require('dotenv');
const mongoose   = require("mongoose");
const cors       = require('cors');
const https      = require("https")
const fs         = require("fs");

// Configure Environment Variables
dotenv.config();

const carriersRoute              = require("./routes/carriers.route.js");
const shippersRoute              = require("./routes/shippers.route.js");
const carrierLoginRoute              = require("./routes/login-carrier.route.js");
const shipperLoginRoute              = require("./routes/login-shipper.route.js");
const carrierRegisterRoute           = require("./routes/register-carrier.route.js");
const shipperRegisterRoute           = require("./routes/register-shipper.route.js");


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

app.use("/api/shipper", shippersRoute);
app.use("/api/shipper/login", shipperLoginRoute);
app.use("/api/shipper/register", shipperRegisterRoute);

const port = process.env.PORT || 4000;
server = app.listen(port, () => {
  console.log('Starting UBook Driver Server\n');
  console.log(`Listening on port ${port}...`)
});

const httpsOptions = {
  key: fs.readFileSync('/Users/ferro/Desktop/ubook-master/ubook-driver-server/10.0.1.4-key.pem'),
  cert: fs.readFileSync('/Users/ferro/Desktop/ubook-master/ubook-driver-server/10.0.1.4.pem')
}

const httpsPort = 4040;

https.createServer(httpsOptions, app).listen(httpsPort, () => {
  console.log(`HTTPS Server @ ${httpsPort}`);
}
);
