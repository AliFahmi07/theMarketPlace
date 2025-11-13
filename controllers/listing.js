const Listing = require("../models/listing")

const listing_index_get = async (req, res) => {
  const listings = await Listing.find().populate("owner")
  res.render("listings/index.ejs", { listings })
}

module.exports = {
  listing_index_get,
}
