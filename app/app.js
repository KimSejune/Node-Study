"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const CreateError = require("http-errors");
const mongoose = require("mongoose");
const Fs = require("fs-extra");
require("dotenv").config();

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
mongoose.connect(process.env.DB_HOST, {
  useNewUrlParser: true,
});
mongoose.Promise = global.Promise;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev")); // log request

// router 등록
const webFiles = Fs.readdirSync(__dirname + "/routes");
webFiles.forEach(function (fname) {
  const fname_split = fname.split(".");
  if (fname_split[fname_split.length - 1] !== "js") {
    return true;
  }
  const routeName = fname.replace(".js", "");
  app.use(`/${routeName.toLowerCase()}`, require("./routes/" + routeName));
});
// app.use("/auth", auth);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(CreateError(404));
});

app.listen(process.env.PORT, () => {
  console.log(`Node Server Start Port: ${process.env.PORT}`);
});
