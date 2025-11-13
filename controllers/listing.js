const Listing = require("../models/listing")

const listing_index_get = async (req, res) => {
  const listings = await Listing.find().populate("owner")
  res.render("listings/index.ejs", { listings })
}

const listing_new_get = async (req, res) => {
  res.render("listings/new.ejs")
}

module.exports = {
  listing_index_get,
  listing_new_get,
}
