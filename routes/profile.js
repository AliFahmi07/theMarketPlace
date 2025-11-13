router = require("express").Router()
const profileCtrl = require("../controllers/profile")
const isSignedIn = require('../middleware/is-signed-in')


router.get('/', isSignedIn, profileCtrl.profile_get)
router.get('/edit', isSignedIn, profileCtrl.profile_edit_get)
router.put('/', isSignedIn, profileCtrl.profile_edit_put)





module.exports = router
