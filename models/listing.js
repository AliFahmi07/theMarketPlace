const mongoose = require("mongoose")

const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  category: {
    type: String,
    enum: ["electronics", "automotive", "household items", "gardening", "toys & games", "clothing", "sports & fitness", "other"],
    required: true
  },
  price: {
    type: Number,
    min: 0,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  contact: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true, // need to confirm this if this is needed or we'll hard code it in the ejs
  },
  imageURL: { // need to add file upload function too
    type: String,
    required: true,
  },
  favoritedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  timestamps: true,
})

const Listing = mongoose.model("Listing", listingSchema)
module.exports = Listing
