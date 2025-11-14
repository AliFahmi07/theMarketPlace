router = require("express").Router()
const feedbackCtrl = require("../controllers/feedback")
const isSignedIn = require('../middleware/is-signed-in')

router.get("/:ownerId", feedbackCtrl.profile_Feedback_get)
router.post('/:ownerId', isSignedIn, feedbackCtrl.profile_Feedback_post)

module.exports = router
