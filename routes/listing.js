const router = require("express").Router()

const listingCtrl = require("../controllers/listing")

// Routes
router.get("/", listingCtrl.listing_index_get)
router.get("/new", listingCtrl.listing_new_get)

// Export
module.exports = router
