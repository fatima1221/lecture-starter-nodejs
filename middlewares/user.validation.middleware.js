import { USER } from "../models/user.js";

const createUserValid = (req, res, next) => {
  // TODO: Implement validatior for USER entity during creation
  const { id, firstName, lastName, email, phoneNumber, password } = req.body;

  if (!firstName || !lastName || !email || !phoneNumber || !password) {
    return res.status(400).send("Missing required fields");
  }

  if (id) {
    return res.status(400).send("Id should not be present in request body");
  }

  const validFields = Object.keys(USER).filter((field) => field !== "id");
  const fields = Object.keys(req.body);
  const hasExtraFields = fields.some((field) => !validFields.includes(field));
  if (hasExtraFields) {
    return res.status(400).send("Extra fields not allowed");
  }

  if (!isValidEmail(email)) {
    return res.status(400).send("Invalid email format");
  }

  if (!isValidPhoneNumber(phoneNumber)) {
    return res.status(400).send("Invalid phone number format");
  }

  if (!isValidPassword(password)) {
    return res.status(400).send("Invalid password format");
  }
  next();
};

const updateUserValid = (req, res, next) => {
  // TODO: Implement validatior for user entity during update
  const { id, firstName, lastName, email, phoneNumber, password } = req.body;

  if (id) {
    return res.status(400).send("Id should not be present in request body");
  }

  const validFields = Object.keys(USER).filter((field) => field !== "id");
  const fields = Object.keys(req.body);
  const hasValidField = fields.some((field) => validFields.includes(field));
  if (!hasValidField) {
    return res.status(400).send("At least one field must be present");
  }

  const hasExtraFields = fields.some((field) => !validFields.includes(field));
  if (hasExtraFields) {
    return res.status(400).send("Extra fields not allowed");
  }

  if (email && !isValidEmail(email)) {
    return res.status(400).send("Invalid email format");
  }

  if (phoneNumber && !isValidPhoneNumber(phoneNumber)) {
    return res.status(400).send("Invalid phone number format");
  }

  if (password && !isValidPassword(password)) {
    return res.status(400).send("Invalid password format");
  }
  next();
};

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@gmail\.com$/;
  return emailRegex.test(email);
}

function isValidPhoneNumber(phoneNumber) {
  const phoneNumberRegex = /^\+\d+$/;
  return phoneNumberRegex.test(phoneNumber);
}

function isValidPassword(password) {
  return password.length >= 3;
}

export { createUserValid, updateUserValid };
