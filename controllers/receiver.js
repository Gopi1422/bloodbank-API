const asyncHandler = require("express-async-handler");

const User = require("../models/user");
const Request = require("../models/request");
const {
  validator,
  requestBloodSampleSchema,
} = require("../helpers/validateSchema");

const requestBloodSample = asyncHandler(async (req, res) => {
  try {
    // Get user input
    const {
      blood_group: bloodGroup,
      quantity_in_ml: quantity,
      hospital: hospital,
      date_of_request: dateRequest,
    } = req.body;

    // Validate user input
    await validator(requestBloodSampleSchema, req.body);

    const requestedHospital = await User.findById(hospital);
    if (!requestedHospital) {
      return res.status(404).send({
        message: `Can\'t request to hospital with ${hospital}. Maybe hospital not found!`,
      });
    }

    // Check eligibility of receiver
    let receiver = await User.findById(req.user.user_id);

    if (receiver.is_eligible) {
      // make the request for the blood sample
      const RequestedBloodSample = await Request.create({
        blood_group: bloodGroup,
        quantity_in_ml: quantity,
        hospital: hospital,
        receiver: receiver._id,
        date_of_request: dateRequest,
      });
      return res.status(201).json({
        data: RequestedBloodSample,
        message: "Request is sent to the hospital.",
      });
    }
    res.status(400).send({
      message: `Can\'t make the request for blood samples as you are not eligible!!`,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ emessage: err.message });
  }
});

module.exports = { requestBloodSample };
