const express = require("express");

const auth = require("../middleware/auth");
const verifyRoles = require("../middleware/verifyRoles");
const ROLES_LIST = require("../config/rolesList");
const { requestBloodSample } = require("../controllers/receiver");

const route = express.Router();

// API
route.post(
  "/requestBloodSamples",
  auth,
  verifyRoles(ROLES_LIST.Receiver),
  requestBloodSample
);

module.exports = route;
