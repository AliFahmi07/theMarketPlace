const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
  },
  address: {
    type: String,
  },
  contact: {
    type: String,
    required: true,
  },
})

const User = mongoose.model("User", userSchema)
module.exports = User
