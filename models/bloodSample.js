const mongoose = require("mongoose");

var bloodSampleSchema = new mongoose.Schema({
  blood_group: {
    type: String,
    required: true,
  },
  quantity_in_ml: { type: Number, required: true },
  bag_no: { type: String },
  status: { type: String, default: "Available" },
  date_of_donation: { type: Date, default: Date.now },
  donor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Donor",
  },
  hospital: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  blood_bank: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BloodBank",
  },
});

const BloodSample = mongoose.model("BloodSample", bloodSampleSchema);

module.exports = BloodSample;
