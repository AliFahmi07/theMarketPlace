const Feedback = require("../controllers/feedback")
const seller = require("../models/listing")

const profile_Feedback_get = async (req,res) => {
  const listingId = req.params.listingId
  const listing = await seller.findById(listingId).populate("owner")
  const sellerId = listing.owner._id
    res.render("feedback/profile-feedback.ejs", {sellerId,  owner:listing.owner, seller})
}




module.exports = {
  profile_Feedback_get,
}
