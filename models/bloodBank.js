const mongoose = require("mongoose");

var bloodBankSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  contact_no: { type: String },
  address: { type: String },
  city: {
    type: String,
    required: true,
  },
  hospital: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const BloodBank = mongoose.model("BloodBank", bloodBankSchema);

module.exports = BloodBank;
