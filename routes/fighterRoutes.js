import { Router } from "express";
import { fighterService } from "../services/fighterService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import {
  createFighterValid,
  updateFighterValid,
} from "../middlewares/fighter.validation.middleware.js";

const router = Router();

// TODO: Implement route controllers for fighter

// GET- /api/fighters
router.get("/", function (req, res, next) {
  const fighters = fighterService.getAllFighters();
  res.json(fighters);
});

// GET- /api/fighters:id
router.get("/:id", function (req, res, next) {
  const fighterId = req.params.id;
  const fighter = fighterService.getFighterById(fighterId);

  if (fighter) {
    res.json(fighter);
  } else {
    res.status(404).send("Fighter not found");
  }
});

// POST /api/fighters
router.post("/", createFighterValid, function (req, res, next) {
  const newFighter = req.body;
  const result = fighterService.createUser(newFighter);

  if (result) {
    res.send("Data is saved");
  } else {
    res.status(400).send("Fighter isn't sent");
  }
});

// PUT /api/fighters/:id
router.put("/:id", updateFighterValid, function (req, res, next) {
  const fighterId = req.params.id;
  const updatedFighter = req.body;
  const result = fighterService.updateFighter(updatedFighter, fighterId);

  if (result) {
    res.send("Fighter is updated");
  } else {
    res.status(404).send("Fighter not found");
  }
});

// DELETE /api/fighters/:id
router.delete("/:id", function (req, res, next) {
  const fighterId = req.params.id;
  const result = fighterService.deleteFighter(fighterId);

  if (result) {
    res.send("Fighter is deleted");
  } else {
    res.status(404).send("Fighter not found");
  }
});

router.use(responseMiddleware);
export { router };
