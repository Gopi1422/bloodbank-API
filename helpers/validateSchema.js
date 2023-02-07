const joi = require("joi");
const { joiPasswordExtendCore } = require("joi-password");
const joiPassword = joi.extend(joiPasswordExtendCore);

const registerSchema = joi.object({
  name: joi.string().required(),
  address: joi.string().allow(null, ""),
  email: joi.string().email().lowercase().required(),
  password: joiPassword
    .string()
    .minOfSpecialCharacters(1)
    .minOfLowercase(1)
    .minOfUppercase(1)
    .minOfNumeric(1)
    .noWhiteSpaces()
    .required(),
  city: joi.string().required(),
  contact_no: joi
    .string()
    .regex(/[0-9]{10}$/)
    .messages({ "string.pattern.base": `Phone number must have 10 digits.` })
    .allow(null, ""),
  is_eligible: joi.boolean(),
  roles: joi
    .object()
    .keys({
      Hospital: joi.string().valid("HOSPITAL"),
      Receiver: joi.string().valid("RECEIVER"),
    })
    .or("Hospital", "Receiver") // At least one of these keys must be in the object to be valid.
    .required(),
});

const requestBloodSampleSchema = joi.object({
  blood_group: joi
    .string()
    .regex(/(A|B|AB|O)[+-]/)
    .messages({ "string.pattern.base": `Invalid Blood Group!!` })
    .required(),
  quantity_in_ml: joi.number().required(),
  hospital: joi
    .string()
    .hex()
    .length(24)
    .message("hospital must be a hospital id (ObjectID)!")
    .required(),
  date_of_request: joi
    .date()
    .iso()
    .messages({ "date.format": `Date format is YYYY-MM-DD!` }),
  status: joi.string().valid("Requested", "Received"),
});

const bloodSampleSchema = joi.object({
  blood_group: joi
    .string()
    .regex(/(A|B|AB|O)[+-]/)
    .messages({ "string.pattern.base": `Invalid Blood Group!!` })
    .required(),
  quantity_in_ml: joi.number().required(),
  bag_no: joi.string().allow(null, ""),
  blood_bank_name: joi.string().required(),
  date_of_donation: joi
    .date()
    .iso()
    .messages({ "date.format": `Date format is YYYY-MM-DD!` }),
  dname: joi.string().required(),
  daddress: joi.string(),
  dgender: joi.string().valid("Male", "Female", "Ohter"),
  dage: joi.number().required(),
  demail: joi.string().email().lowercase(),
  dcontact_no: joi
    .string()
    .regex(/[0-9]{10}$/)
    .messages({ "string.pattern.base": `Phone number must have 10 digits!` })
    .allow(null, ""),
  status: joi.string().valid("Available", "Used", "Pending"),
});

const updateBloodSampleSchema = joi.object({
  blood_group: joi
    .string()
    .regex(/(A|B|AB|O)[+-]/)
    .messages({ "string.pattern.base": `Invalid Blood Group!!` }),
  quantity_in_ml: joi.number(),
  bag_no: joi.string().allow(null, ""),
  date_of_donation: joi
    .date()
    .iso()
    .messages({ "date.format": `Date format is YYYY-MM-DD!` }),
  dname: joi.string(),
  daddress: joi.string(),
  dgender: joi.string().valid("Male", "Female", "Ohter"),
  dage: joi.number(),
  demail: joi.string().email().lowercase(),
  dcontact_no: joi
    .string()
    .regex(/[0-9]{10}$/)
    .messages({ "string.pattern.base": `Phone number must have 10 digits!` })
    .allow(null, ""),
  status: joi.string().valid("Available", "Used", "Pending"),
});

const bloodBankSchema = joi.object({
  name: joi.string().required(),
  contact_no: joi
    .string()
    .regex(/[0-9]{10}$/)
    .messages({ "string.pattern.base": `Phone number must have 10 digits!` })
    .allow(null, ""),
  address: joi.string().allow(null, ""),
  city: joi.string().required(),
});

const loginSchema = joi.object({
  email: joi.string().email().lowercase().required(),
  password: joiPassword.string().min(4).required(),
});

// validation using joi
const validator = (validationSchema, body) => {
  try {
    const result = validationSchema.validate(body);

    if (result.error) {
      throw result.error;
    }
  } catch (err) {
    throw err;
  }
};

module.exports = {
  loginSchema,
  registerSchema,
  requestBloodSampleSchema,
  bloodSampleSchema,
  updateBloodSampleSchema,
  bloodBankSchema,
  validator,
};
