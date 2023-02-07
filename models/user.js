const mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  contact_no: { type: String },
  address: { type: String },
  city: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  roles: [String],
  is_active: { type: Boolean, default: true },
  is_eligible: { type: Boolean, default: false },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
