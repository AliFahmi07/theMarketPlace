const Listing = require("../models/task")

const listing_index_get = async (req, res) => {
  const listings = await Listing.find().populate("user")
  res.render("listings/index.ejs", { listings })
}

module.exports = {
  listing_index_get,
}
