router = require("express").Router()
const profileCtrl = require("../controllers/profile")
const isSignedIn = require('../middleware/is-signed-in')
const upload = require("../middleware/multer")


router.get('/', isSignedIn, profileCtrl.profile_get)
router.get('/edit', isSignedIn, profileCtrl.profile_edit_get)
router.put('/', isSignedIn,upload.single("avatar"), profileCtrl.profile_edit_put)





module.exports = router
