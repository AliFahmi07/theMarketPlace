const router = require("express").Router()
const listingCtrl = require("../controllers/listing")
const isSignedIn = require('../middleware/is-signed-in')
const upload = require("../middleware/multer")

// Routes
router.get("/", listingCtrl.listing_index_get)
router.get("/new", isSignedIn, listingCtrl.listing_new_get)
router.post("/", isSignedIn, upload.single("image"),listingCtrl.listing_new_post)
router.get("/:listingId", listingCtrl.listing_show_get)
router.get("/:listingId/edit", isSignedIn, listingCtrl.listing_edit_get)
router.put("/:listingId", isSignedIn, upload.single("image"),listingCtrl.listing_edit_put)
router.delete("/:listingId", isSignedIn, listingCtrl.listing_delete_delete)

router.post("/:listingId/favorited-by/:userId", isSignedIn, listingCtrl.fav_add_post)
router.delete("/:listingId/favorited-by/:userId", isSignedIn, listingCtrl.fav_remove_delete)


// Export
module.exports = router
