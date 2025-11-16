const Listing = require("../models/listing")
const Feedback = require("../models/feedback")

const profile_Feedback_get = async (req, res) => {
  const ownerId = req.params.ownerId

  const listing = await Listing.findById(ownerId).populate("owner")
  const sellerId = listing.owner._id
  const feedback = await Feedback.find({ seller: sellerId }).populate(
    "reviewer"
  )
  const editingId = req.params.id
  let averageRating = 0
  if (feedback.length > 0) {
    const total = feedback.reduce((sum, feedback) => sum + feedback.rating, 0)
    averageRating = total / feedback.length
  }

  res.render("feedback/profile-feedback.ejs", {
    listing,
    sellerId,
    owner: listing.owner,
    Listing,
    feedback,
    averageRating,
    editingId,
  })
}

const profile_Feedback_post = async (req, res) => {
  const ownerId = req.params.ownerId
  const listing = await Listing.findById(ownerId).populate("owner")

  req.body.reviewer = req.session.user._id
  req.body.seller = listing.owner._id
  req.body.rating = Number(req.body.rating)
  await Feedback.create(req.body)
  res.redirect(`/listings/${ownerId}`)
}

const profile_showFeedback_get = async (req, res) => {
  const reviewerId = req.session.user._id
  const reviews = await Feedback.find({ reviewer: reviewerId })
    .populate("reviewer")
    .populate("seller")
  const editingId = req.params.id
  res.render("feedback/my-feedbacks.ejs", { reviews, editingId: null })
}

const profile_editFeedback_get = async (req, res) => {
  const reviewerId = req.session.user._id
  const reviews = await Feedback.find({ reviewer: reviewerId })
    .populate("reviewer")
    .populate("seller")
  const editingId = req.params.id

  res.render("feedback/my-feedbacks.ejs", { reviews, editingId })
}

const profile_editFeedback_put = async (req, res) => {
  const feedbackId = req.body.feedbackId

  await Feedback.findByIdAndUpdate(feedbackId, req.body, { new: true })

  res.redirect("/feedback/userFeedback")
}

const profile_deleteFeedback_delete = async (req, res) => {
  const feedbackId = req.params.id

  await Feedback.findByIdAndDelete(feedbackId)
  res.redirect("/feedback/userFeedback")
}

module.exports = {
  profile_Feedback_get,
  profile_Feedback_post,
  profile_showFeedback_get,
  profile_editFeedback_get,
  profile_editFeedback_put,
  profile_deleteFeedback_delete,
}
