const User = require("../models/user")
const bcrypt = require("bcrypt")

const auth_signup_get = async (req, res) => {
  res.render("auth/sign-up.ejs")
}
const auth_signup_post = async (req, res) => {
  const checkUserInDatabase = await User.findOne({
    username: req.body.username,
  })

  if (checkUserInDatabase) {
    return res.send("Username is unavailable. Please choose another username")
  }
  if (req.body.password !== req.body.confirmPassword) {
    return res.send(
      "The passwords you have entered do not match. Please try again."
    )
  }

  const hashedPassword = bcrypt.hashSync(req.body.password, 10)
  req.body.password = hashedPassword

  const user = await User.create(req.body)
  res.send(`Welcome ${user.username}!`)
}

const auth_signin_get = async (req, res) => {
  res.render("auth/sign-in.ejs")
}

const auth_signin_post = async (req, res) => {
  const userInDatabase = await User.findOne({ username: req.body.username })
  if (!userInDatabase) {
    return res.send("Login Failed. User not found")
  }

  const validPassword = bcrypt.compareSync(
    req.body.password,
    userInDatabase.password
  )
  if (!validPassword) {
    return res.send("Login Failed. Please try again later")
  }

  req.session.user = {
    username: userInDatabase.username,
    _id: userInDatabase._id,
  }
  res.redirect("/")
}

const auth_signout_get = async (req, res) => {
  req.session.destroy()
  res.redirect("/auth/sign-in")
}

module.exports = {
  auth_signup_get,
  auth_signup_post,
  auth_signin_get,
  auth_signin_post,
  auth_signout_get,
}
