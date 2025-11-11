const User = require("../models/user")
const bcrypt = require('bcrypt')


const auth_signin_get = async (req,res) => {
  res.render("auth/sign-in.ejs")
}

const auth_signin_post = async (req,res) => {
  const userInDatabase = await User.findOne({ username: req.body.username})
  if(!userInDatabase){
    return res.send("Login Failed. User not found")
  }


const validPassword = bcrypt.compareSync(req.body.password, userInDatabase.password)
if(!validPassword){
  return res.send("Login Failed. Please try again later")
}

req.session.user = {
  username: userInDatabase.username,
  _id: userInDatabase._id
}
res.redirect("/")
}

module.exports = {
  auth_signin_get,
  auth_signin_post,
}
