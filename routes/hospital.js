const express = require("express");

const auth = require("../middleware/auth");
const verifyRoles = require("../middleware/verifyRoles");
const ROLES_LIST = require("../config/rolesList");
const {
  addBloodBank,
  getBloodBankByHospital,
  addBloodSampleInfo,
  updateBloodSampleInfo,
  deleteBloodSampleInfo,
  getBloodSampleByHospital,
  getReceiverRequests,
} = require("../controllers/hospital");

const route = express.Router();

// API
route.post(
  "/addBloodBank",
  auth,
  verifyRoles(ROLES_LIST.Hospital),
  addBloodBank
);
route.get(
  "/getBloodBanks",
  auth,
  verifyRoles(ROLES_LIST.Hospital),
  getBloodBankByHospital
);
route.post(
  "/addBloodSamples",
  auth,
  verifyRoles(ROLES_LIST.Hospital),
  addBloodSampleInfo
);
route.get(
  "/hospitalBloodSamples",
  auth,
  verifyRoles(ROLES_LIST.Hospital),
  getBloodSampleByHospital
);
route.get(
  "/receiverRequests",
  auth,
  verifyRoles(ROLES_LIST.Hospital),
  getReceiverRequests
);
route.put(
  "/bloodSample/:id",
  auth,
  verifyRoles(ROLES_LIST.Hospital),
  updateBloodSampleInfo
);
route.delete(
  "/bloodSample/:id",
  auth,
  verifyRoles(ROLES_LIST.Hospital),
  deleteBloodSampleInfo
);

module.exports = route;
