const profile = require('../models/user')


const profile_get = async (req,res) => {
  const loggedInUser = req.session.user
  res.render('profile/profile.ejs', {user: loggedInUser})
}

const profile_put = async (req,res) => {
  const loggedInUser = req.session.user
  const userId = loggedInUser._id

  const updatedUser = await profile.findByIdAndUpdate(
    userId,
    req.body,
    {new: user},
  )

  req.session.user = updatedUser

  res.redirect('/profile')
}

module.exports = {
  profile_get,
  profile_put,
}
