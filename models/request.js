const mongoose = require("mongoose");

var requestSchema = new mongoose.Schema({
  blood_group: { type: String, required: true },
  quantity_in_ml: { type: Number },
  date_of_request: { type: Date, default: Date.now },
  date_of_reception: { type: Date, default: null },
  status: { type: String, default: "requested" },
  hospital: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Request = mongoose.model("Request", requestSchema);

module.exports = Request;
