const router = require("express").Router()

const listingCtrl = require("../controllers/listing")
const isSignedIn = require('../middleware/is-signed-in')

// Routes
router.get("/", isSignedIn, listingCtrl.listing_index_get)
router.get("/new", isSignedIn, listingCtrl.listing_new_get)
router.post("/", isSignedIn, listingCtrl.listing_new_post)
router.get("/:listingId", isSignedIn, listingCtrl.listing_show_get)

// Export
module.exports = router
