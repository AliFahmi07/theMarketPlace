const Listing = require("../models/listing")
const Feedback = require("../models/feedback")


const profile_Feedback_get = async (req,res) => {
  const ownerId = req.params.ownerId

  const listing = await Listing.findById(ownerId).populate("owner")
  const sellerId = listing.owner._id
  const feedback = await Feedback.find({seller:sellerId}).populate("reviewer")
  let averageRating = 0
  if (feedback.length > 0){
    const total = feedback.reduce((sum,feedback) =>
      sum + feedback.rating , 0)
  averageRating = total/feedback.length
  }

    res.render("feedback/profile-feedback.ejs", {listing, sellerId,  owner:listing.owner, Listing, feedback, averageRating})
}

const profile_Feedback_post = async (req,res) => {
  const ownerId = req.params.ownerId
  const listing = await Listing.findById(ownerId).populate("owner")

  req.body.reviewer = req.session.user._id
  req.body.seller = listing.owner._id
  req.body.rating = Number(req.body.rating)
  await Feedback.create(req.body)
  res.redirect(`/listings/${ownerId}`)
}

module.exports = {
  profile_Feedback_get,
  profile_Feedback_post,
}
