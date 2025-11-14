const router = require("express").Router()

const listingCtrl = require("../controllers/listing")
const isSignedIn = require('../middleware/is-signed-in')

// Routes
router.get("/", listingCtrl.listing_index_get)
router.get("/new", isSignedIn, listingCtrl.listing_new_get)
router.post("/", isSignedIn, listingCtrl.listing_new_post)
router.get("/:listingId", listingCtrl.listing_show_get)
router.get("/:listingId/edit", listingCtrl.listing_edit_get)
router.put("/:listingId", listingCtrl.listing_edit_put)

// Export
module.exports = router
