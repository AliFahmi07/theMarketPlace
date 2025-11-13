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


module.exports = {
  listing_index_get,
  listing_new_get,
}
