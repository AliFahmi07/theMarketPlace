router = require("express").Router()
const profileCtrl = require("../controllers/profile")
const isSignedIn = require('../middleware/is-signed-in')


router.get('/', isSignedIn, profileCtrl.profile_get)

module.exports = router
