const Listing = require("../models/listing")
const User = require("../models/user")


const listing_index_get = async (req, res) => {
  const category = req.query.category // gets category from query string
  const filter = category ? { category } : {}; // checks if category has a value, if true, creates an object using that value or else returns an empty object
  const listings = await Listing.find(filter).populate("owner")

  let listingsByUser = [] // start with an empty array first, populate if user is logged in
    if (req.session.user) {
      listingsByUser = await Listing.find({owner: req.session.user._id}).populate("owner")
    }
  res.render("listings/index.ejs", { listings, selectedCategory: category, listingsByUser, user: req.session.user })
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
  const listing = await Listing.findById(req.params.listingId)
  .populate("owner")
  .populate("contact")

  const userHasFavorited = req.session.user ? listing.favoritedBy.some((user) => user.equals(req.session.user._id)) : false

  res.render("listings/show.ejs", { listing, user: req.session.user, userHasFavorited })
}

const listing_edit_get = async (req, res) => {
  const listing = await Listing.findById(req.params.listingId).populate("contact")
  const user = await User.findById(req.session.user._id)
  res.render("listings/edit.ejs", { listing, user } )
}

const listing_edit_put = async (req, res) => {
  const listing = await Listing.findById(req.params.listingId)
  await listing.updateOne(req.body)
  res.redirect(`/listings/${req.params.listingId}`)
}

const listing_delete_delete = async (req, res) => {
  await Listing.findByIdAndDelete(req.params.listingId)
  res.redirect("/listings")
}

// Favorited by user:

const fav_add_post = async (req, res) => {
  await Listing.findByIdAndUpdate(req.params.listingId, {
    $push: { favoritedBy: req.params.userId },
  })
  res.redirect(`/listings/${req.params.listingId}`)
}

const fav_remove_delete = async (req, res) => {
  await Listing.findByIdAndUpdate(req.params.listingId, {
    $pull: { favoritedBy: req.params.userId }
  })
  res.redirect(`/listings/${req.params.listingId}`)
}

module.exports = {
  listing_index_get,
  listing_new_get,
  listing_new_post,
  listing_show_get,
  listing_edit_get,
  listing_edit_put,
  listing_delete_delete,
  fav_add_post,
  fav_remove_delete,
}
