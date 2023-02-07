const express = require("express");
const route = express.Router();

const {
  registerUser,
  loginUser,
  getBloodSamples,
} = require("../controllers/user");

// API
route.post("/register", registerUser);
route.post("/login", loginUser);
route.get("/bloodSamples", getBloodSamples);

module.exports = route;
