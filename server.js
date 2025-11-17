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
const passUserToView = require('./middleware/pass-user-to-view')

// Run Middlewares
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(morgan('dev'));




app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
)

app.use(passUserToView)

// Root Route
app.get("/", async (req, res) => {
  user = req.session.user
  if (user) {
    username = req.session.user.username
  } else {
    username = "Guest"
  }
  res.render("index.ejs", { username })
})

// Routers
const authRouter = require("./routes/auth")
const listingRouter = require("./routes/listing")
const profileRouter = require("./routes/profile")
const feedbackRouter = require("./routes/feedback")

app.use('/auth', authRouter)
app.use("/listings", listingRouter)
app.use("/profile", profileRouter)
app.use("/feedback", feedbackRouter)


app.listen(port, () => {
  console.log(`Listening on ${port}`)
})
