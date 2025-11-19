const User = require("../models/user")

const passUserToView = async (req,res,next) => {
  if (req.session.user) {
    const fullUser = await User.findById(req.session.user._id)
    req.session.user = fullUser
  } else {
    req.session.user = null
  }
  next ()
}

module.exports = passUserToView
