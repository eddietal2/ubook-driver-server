const express                 = require("express");
const app                     = express();
const dotenv                  = require('dotenv');
const mongoose                = require("mongoose");
const cors                    = require('cors');

// Configure Environment Variables
dotenv.config();

const driversRoute              = require("./routes/drivers.route.js");
const loginRoute              = require("./routes/login.route.js");
const registerRoute           = require("./routes/register.route.js");


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

app.use("/api/driver", driversRoute);
app.use("/api/driver/login", loginRoute);
app.use("/api/driver/register", registerRoute);

const port = process.env.PORT || 4000;
server = app.listen(port, () => {
  console.log('Starting UBook Driver Server\n');
  console.log(`Listening on port ${port}...`)
});