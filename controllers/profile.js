const profile = require('../models/user')
<<<<<<< HEAD
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({storage})
=======
const Listing = require("../models/listing")
>>>>>>> 8342849b1ca98dc045493a5b4386bfb279a90b0f

const profile_get = async (req,res) => {
  const loggedInUser = await profile.findById(req.session.user._id)
  const favoritedListings = await Listing.find({favoritedBy: req.session.user._id}) // finding all the listings where logged-in user's id is in the favoritedBy array
  .populate("owner") // getting all the owner details
  res.render('profile/profile.ejs', {user: loggedInUser, favoritedListings: favoritedListings})
}

const profile_edit_get = async (req,res) => {
  const loggedInUser = await profile.findById(req.session.user._id)
  res.render('profile/edit.ejs', {user: loggedInUser})
}

const profile_edit_put = async (req,res) => {
  const loggedInUser = await profile.findById(req.session.user._id)

  let updateData = req.body

  if(req.file){
    updatedData.avatar = req.file.buffer.toString('base64')
  }

const updatedUser = await profile.findByIdAndUpdate(
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
