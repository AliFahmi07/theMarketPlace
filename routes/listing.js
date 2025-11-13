const router = require("express").Router()

const listingCtrl = require("../controllers/listing")

// Routes
router.get("/", listingCtrl.listing_index_get)

// Export
module.exports = router
