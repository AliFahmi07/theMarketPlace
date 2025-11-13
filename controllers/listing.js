const Listing = require("../models/listing")
const user = require("../models/user")


const listing_index_get = async (req, res) => {
  const listings = await Listing.find().populate("owner")
  res.render("listings/index.ejs", { listings })
}

const listing_new_get = async (req, res) => {
  const loggedInUser = await user.findById(req.session.user._id)
  res.render("listings/new.ejs", { user: loggedInUser })
}

// const listing_new_post = async (req, res) => {
//   req.body.user = req.session.user._id
//   await Listing.findById(req.params.listingId).populate("user")
//   res.redirect("/listings")
// }

const listing_new_post = async (req, res) => {
  req.body.owner = req.session.user._id
  await Listing.create(req.body)
  res.redirect("/listings")
}

module.exports = {
  listing_index_get,
  listing_new_get,
  listing_new_post,
}
