router = require("express").Router()
const feedbackCtrl = require("../controllers/feedback")
const isSignedIn = require("../middleware/is-signed-in")

router.get("/userFeedback", isSignedIn, feedbackCtrl.profile_showFeedback_get)
router.get("/:ownerId", feedbackCtrl.profile_Feedback_get)
router.post("/:ownerId", isSignedIn, feedbackCtrl.profile_Feedback_post)

router.get(
  "/userFeedback/edit/:id",
  isSignedIn,
  feedbackCtrl.profile_editFeedback_get
)
router.put(
  "/userFeedback/edit",
  isSignedIn,
  feedbackCtrl.profile_editFeedback_put
)
router.delete(
  "/userFeedback/delete/:id",
  isSignedIn,
  feedbackCtrl.profile_deleteFeedback_delete
)

module.exports = router
