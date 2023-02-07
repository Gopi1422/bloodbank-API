const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const BloodSample = require("../models/bloodSample");
const asyncHandler = require("express-async-handler");
const {
  validator,
  loginSchema,
  registerSchema,
} = require("../helpers/validateSchema");

const registerUser = asyncHandler(async (req, res) => {
  try {
    // Get user input
    const {
      name: name,
      contact_no: contactNo,
      email: email,
      password: password,
      address: address,
      city: city,
      roles: roles,
      is_eligible: isEligible,
    } = req.body;

    // Validate user input
    await validator(registerSchema, req.body);

    // Validate if user exist in our database
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login!");
    }

    // get all the values of roles from roles object
    const rolesValues = Object.values(roles);

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await User.create({
      name: name,
      contact_no: contactNo,
      email: email.toLowerCase(),
      password: encryptedPassword,
      address: address,
      city: city,
      roles: rolesValues,
      is_eligible: isEligible,
    });

    // return new user
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: err.message });
  }
});

const loginUser = asyncHandler(async (req, res) => {
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    await validator(loginSchema, req.body);

    // Based on userType change the Model object
    // const Model = getTypeModel(userType);
    // if (!Model) {
    //   return res.status(400).send("Please enter valid type of user!!");
    // }

    // Validate if user exist in our database
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        {
          user_info: {
            user_id: user._id,
            email: email,
          },
          roles: user.roles,
        },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      // user with token
      return res.status(200).json({ user: user, token: token });
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
    res.status(400).json(err.message);
  }
});

const getBloodSamples = asyncHandler(async (req, res) => {
  try {
    // get all bloodSamples available in all hospitals
    const bloodSamples = await BloodSample.find({ status: "Available" });

    // Return new information of inserted blood sample
    res.status(200).json({ blood_sample: bloodSamples });
  } catch (err) {
    console.log(err);
    res.status(400).json(err.message);
  }
});

module.exports = { registerUser, loginUser, getBloodSamples };
