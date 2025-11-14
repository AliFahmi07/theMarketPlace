const Listing = require("../models/listing")
const Feedback = require("../models/feedback")

const profile_Feedback_get = async (req,res) => {
  const ownerId = req.params.ownerId
  const listing = await Listing.findById(ownerId).populate("owner")
  const sellerId = listing.owner._id
    res.render("feedback/profile-feedback.ejs", {listing, sellerId,  owner:listing.owner, Listing})
}

const profile_Feedback_post = async (req,res) => {
  req.body.reviewer = req.session.user._id
  req.body.seller = req.body.owner
  await Feedback.create(req.body)
  res.redirect(`/listings/${req.params.ownerId}`)
}

module.exports = {
  profile_Feedback_get,
  profile_Feedback_post,
}
