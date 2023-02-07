const mongoose = require("mongoose");

var donorSchema = new mongoose.Schema({
  dname: {
    type: String,
    required: true,
  },
  dcontact_no: { type: String, unique: true, required: true },
  daddress: { type: String },
  dgender: { type: String },
  dage: { type: Number, required: true },
  demail: {
    type: String,
  },
});

const Donor = mongoose.model("Donor", donorSchema);

module.exports = Donor;
