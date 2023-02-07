const asyncHandler = require("express-async-handler");

const Donor = require("../models/donor");
const BloodBank = require("../models/bloodBank");
const BloodSample = require("../models/bloodSample");
const Request = require("../models/request");
const {
  validator,
  bloodBankSchema,
  bloodSampleSchema,
  updateBloodSampleSchema,
} = require("../helpers/validateSchema");

const addBloodBank = asyncHandler(async (req, res) => {
  try {
    // Get user input
    const {
      name: name,
      contact_no: contactNo,
      city: city,
      address: address,
    } = req.body;

    // Validate User Input
    await validator(bloodBankSchema, req.body);

    // Check if donor already exist
    const oldBloodBank = await BloodBank.findOne({
      name: name,
      hospital: req.user.user_id,
    });
    if (oldBloodBank) {
      return res.status(409).send("BloodBank Already Exist!");
    }

    // Create Blood Bank
    bloodBank = await BloodBank.create({
      name: name,
      contact_no: contactNo,
      city: city,
      address: address,
      hospital: req.user.user_id,
    });

    // Return new information of inserted blood bank
    res.status(201).json({ blood_bank: bloodBank });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
});

const getBloodBankByHospital = asyncHandler(async (req, res) => {
  try {
    // get all bloodSamples available in all hospitals
    const bloodBank = await BloodBank.find({
      hospital: req.user.user_id,
    }).populate("hospital", "name");

    // Return new information of inserted blood sample
    res.status(200).json({ blood_bank: bloodBank });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
});

const getBloodBankByNameAndHospital = asyncHandler(async (name, hospital) => {
  try {
    // Check bloodbank exists for the hospital
    const bloodBank = await BloodBank.findOne({
      hospital: hospital,
      name: name,
    });
    if (!bloodBank) {
      throw new Error("No blood bank found!");
    }

    return bloodBank;
  } catch (err) {
    console.log(err);
    throw err;
  }
});

const addBloodSampleInfo = asyncHandler(async (req, res) => {
  try {
    // Get user input
    const {
      blood_group: bloodGroup,
      quantity_in_ml: quantity,
      bag_no: bagNo,
      blood_bank_name: bloodBankName,
      status: status,
      dname: donorName,
      dgender: donorGender,
      dage: donorAge,
      dcontact_no: donorContactNo,
      demail: donorEmail,
      daddress: donorAddress,
      date_of_donation: dateOfDonation,
    } = req.body;

    // Validate User Input
    await validator(bloodSampleSchema, req.body);

    const bloodBank = await getBloodBankByNameAndHospital(
      bloodBankName,
      req.user.user_id
    );

    // Check if donor already exist
    let donor = await Donor.findOne({
      dcontact_no: donorContactNo,
    });

    if (!donor) {
      donor = await Donor.create({
        dname: donorName,
        dgender: donorGender,
        dage: donorAge,
        dcontact_no: donorContactNo,
        demail: donorEmail,
        daddress: donorAddress,
      });
    }

    // Add blood sample information
    const bloodSample = await BloodSample.create({
      blood_group: bloodGroup,
      quantity_in_ml: quantity,
      bag_no: bagNo,
      status: status,
      date_of_donation: dateOfDonation,
      donor: donor._id,
      hospital: req.user.user_id,
      blood_bank: bloodBank._id,
    });

    // Return new information of inserted blood sample
    res.status(201).json({ blood_sample: bloodSample, donor: donor });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
});

const getBloodSampleByHospital = asyncHandler(async (req, res) => {
  try {
    // get all bloodSamples available in all hospitals
    const bloodSamples = await BloodSample.find({
      hospital: req.user.user_id,
    })
      .populate("blood_bank", "name")
      .populate("donor", "dname dcontact_no");

    // Return new information of inserted blood sample
    return res.status(200).json({ blood_sample: bloodSamples });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
});

const updateBloodSampleInfo = asyncHandler(async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).send({ message: "Content to update can't be empty!" });
      return;
    }

    // Validate user input
    await validator(updateBloodSampleSchema, req.body);
    const id = req.params.id;
    // update specific bloodSample
    const updatedBloodSamples = await BloodSample.findOneAndUpdate(
      { _id: id, hospital: req.user.user_id },
      req.body,
      {
        new: true,
      }
    );

    if (!updatedBloodSamples) {
      return res.status(404).send({
        message: `Can\'t update blood sample information with ${id}. Maybe information not found!`,
      });
    }

    // update donor of that blood sample
    const updatedDonor = await Donor.findByIdAndUpdate(
      updatedBloodSamples.donor,
      req.body,
      {
        new: true,
      }
    );

    if (!updatedDonor) {
      return res.status(404).send({
        message: `Can\'t update donor information with ${id}. Maybe donor not found!`,
      });
    }
    // Return new information of inserted blood sample
    res
      .status(200)
      .json({ blood_sample: updatedBloodSamples, donor: updatedDonor });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
});

const deleteBloodSampleInfo = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    // delete specific bloodSample
    const deletedInfo = await BloodSample.findOneAndDelete({
      _id: id,
      hospital: req.user.user_id,
    });

    if (!deletedInfo) {
      return res.status(404).send({
        message: `Can\'t delete blood sample information with ${id}. Maybe information id is wrong!`,
      });
    }
    res.send({
      deletedInfo,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
});

const getReceiverRequests = asyncHandler(async (req, res) => {
  try {
    // get all bloodSamples available in all hospitals
    const receiverRequests = await Request.find({
      hospital: req.user.user_id,
    }).populate("receiver", "name email address city contact_number");

    // Return new information of inserted blood sample
    res.status(200).json({ receiverRequests });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
});

module.exports = {
  addBloodBank,
  getBloodBankByHospital,
  getBloodSampleByHospital,
  addBloodSampleInfo,
  updateBloodSampleInfo,
  deleteBloodSampleInfo,
  getReceiverRequests,
};
