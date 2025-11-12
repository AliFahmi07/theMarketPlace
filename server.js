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
const signedIn = require('./middleware/is-signed-in')

// Run Middlewares
app.use(express.urlencoded());
app.use(methodOverride('_method'));
app.use(morgan('dev'));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
)

// Route Route
app.get("/", async (req, res) => {
  user = req.session.user
  if (user) {
    username = req.session.user.username
  } else {
    username = "Guest"
  }
  res.render("index.ejs", { username })
})


const authRouter = require("./routes/auth")


app.use('/auth', authRouter)


app.listen(port, () => {
  console.log(`Listening on ${port}`)
})
