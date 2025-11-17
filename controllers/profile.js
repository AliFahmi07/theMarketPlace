const Profile = require('../models/user')
const Listing = require("../models/listing")

const profile_get = async (req,res) => {
  const loggedInUser = await Profile.findById(req.session.user._id)
  const favoritedListings = await Listing.find({favoritedBy: req.session.user._id}) // finding all the listings where logged-in user's id is in the favoritedBy array
  .populate("owner") // getting all the owner details
  res.render('profile/profile.ejs', {user: loggedInUser, favoritedListings: favoritedListings})
}

const profile_edit_get = async (req,res) => {
  const loggedInUser = await Profile.findById(req.session.user._id)
  res.render('profile/edit.ejs', {user: loggedInUser})
}

const profile_edit_put = async (req,res) => {
  const loggedInUser = await Profile.findById(req.session.user._id)

  if (req.file) {
    loggedInUser.avatar = {
      data: req.file.buffer,
      contentType: req.file.mimetype
    }
  }
  loggedInUser.save()

  const updatedUser = await Profile.findByIdAndUpdate(
    loggedInUser,
    req.body,
    {new: user},
  )

  req.session.user = updatedUser

  res.redirect('/profile')
}

module.exports = {
  profile_get,
  profile_edit_get,
  profile_edit_put,
}
