import { FIGHTER } from "../models/fighter.js";

const createFighterValid = (req, res, next) => {
  // TODO: Implement validatior for FIGHTER entity during creation
  const { id, name, health, power, defense } = req.body;
  if (!name || !power || !health || !defense) {
    return res.status(400).send("Missing required fields");
  }

  if (id) {
    return res.status(400).send("Id should not be present in request body");
  }

  const validFields = Object.keys(FIGHTER).filter((field) => field !== "id");
  const fields = Object.keys(req.body);
  const hasExtraFields = fields.some((field) => !validFields.includes(field));
  if (hasExtraFields) {
    return res.status(400).send("Extra fields not allowed");
  }

  if (!isValidNumber(power, 1, 100)) {
    return res.status(400).send("Invalid power value");
  }

  if (!isValidNumber(defense, 1, 10)) {
    return res.status(400).send("Invalid defense value");
  }

  if (health && !isValidNumber(health, 80, 120)) {
    return res.status(400).send("Invalid health value");
  }
  next();
};

const updateFighterValid = (req, res, next) => {
  // TODO: Implement validatior for FIGHTER entity during update
  const { id, name, health, power, defense } = req.body;

  if (id) {
    return res.status(400).send("Id should not be present in request body");
  }

  const validFields = Object.keys(FIGHTER).filter((field) => field !== "id");
  const fields = Object.keys(req.body);
  const hasValidField = fields.some((field) => validFields.includes(field));
  if (!hasValidField) {
    return res.status(400).send("At least one field must be present");
  }

  const hasExtraFields = fields.some((field) => !validFields.includes(field));
  if (hasExtraFields) {
    return res.status(400).send("Extra fields not allowed");
  }

  if (power && !isValidNumber(power, 1, 100)) {
    return res.status(400).send("Invalid power value");
  }

  if (defense && !isValidNumber(defense, 1, 10)) {
    return res.status(400).send("Invalid defense value");
  }

  if (health && !isValidNumber(health, 80, 120)) {
    return res.status(400).send("Invalid health value");
  }
  next();
};

function isValidNumber(value, min, max) {
  return Number.isInteger(value) && value >= min && value <= max;
}

export { createFighterValid, updateFighterValid };
