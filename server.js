// Dependencies
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();

// Database Connection
const mongoose = require("./config/db");

// Ports
const port = process.env.PORT ? process.env.PORT : "3000"

// Middlewares
const methodOverride = require("method-override")
const morgan = require("morgan")
const session = require("express-session")

// Run Middlewares
app.use(express.urlencoded());
app.use(methodOverride('_method'));
app.use(morgan('dev'));


app.listen(port, () => {
  console.log(`listen on ${port}`)
})

