const Listing = require("../models/listing")
const User = require("../models/user")


const listing_index_get = async (req, res) => {
  const listings = await Listing.find().populate("owner")
  res.render("listings/index.ejs", { listings })
}

const listing_new_get = async (req, res) => {
  const loggedInUser = await User.findById(req.session.user._id)
  res.render("listings/new.ejs", { user: loggedInUser })
}

const listing_new_post = async (req, res) => {
  req.body.owner = req.session.user._id
  req.body.contact = req.session.user._id
  await Listing.create(req.body)
  res.redirect("/listings")
}

const listing_show_get = async (req, res) => {
  const listing = await Listing.findById(req.params.listingId).populate("owner")
  .populate("contact")
  res.render("listings/show.ejs", { listing, user: req.session.user })
}

const listing_edit_get = async (req, res) => {
  const listing = await Listing.findById(req.params.listingId).populate("contact")
  const user = await User.findById(req.session.user._id)
  res.render("listings/edit.ejs", { listing, user } )
}

module.exports = {
  listing_index_get,
  listing_new_get,
  listing_new_post,
  listing_show_get,
  listing_edit_get,
}
