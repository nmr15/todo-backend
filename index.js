const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const { allRouter } = require("./routes/allRoutes");
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const db = module.exports = async () => {
  try{
    await mongoose.connect(process.env.DBURI, { user: process.env.DBUSERNAME, pass: process.env.DBPASSWORD, useNewUrlParser: true, useUnifiedTopology: true })
    console.log("MongoDB Connection is successful");
  } catch (error) {
    console.log(error);
    console.log("MongoDB Connection failed");
  }
}

db();

app.use('/', (req, res, next) =>
{
  console.log('New request received');
  next();
});

app.use('/', allRouter);

app.listen(process.env.PORT, () =>
{
  console.log(`App listening at PORT:${process.env.PORT}`);
})