const User = require("../models/user")
const bcrypt = require('bcrypt')

const auth_signup_get = async (req,res) => {
  res.render("auth/sign-up.ejs")
}
const auth_signup_post = async (req,res) => {
  const checkUserInDatabase = await User.findOne({ username: req.body.username })

  if (checkUserInDatabase) {
    return res.send("Username is unavailable. Please choose another username")
  }
  if (req.body.password !== req.body.confirmPassword) {
    return res.send ("The passwords you have entered do not match. Please try again.")
  }


  const hashedPassword = bcrypt.hashSync(req.body.password, 10)
  req.body.password = hashedPassword


  const user = await User.create(req.body)
  res.send(`Welcome ${user.username}!`)
}

module.exports = {
  auth_signup_get,
  auth_signup_post,
}
