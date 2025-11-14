router = require("express").Router()
const feedbackCtrl = require("../controllers/feedback")

router.get("/:listingId", feedbackCtrl.profile_Feedback_get)

module.exports = router
