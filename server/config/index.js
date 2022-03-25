const express = require("express");
const app = express();
const logger = require("morgan");

const cookieParser = require("cookie-parser");


module.exports = (app) => {
  app.set("trust proxy", 1);
 
  app.use(logger("dev"));

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
};
