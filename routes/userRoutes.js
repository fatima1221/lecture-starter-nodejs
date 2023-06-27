import { Router } from "express";
import { userService } from "../services/userService.js";
import {
  createUserValid,
  updateUserValid,
} from "../middlewares/user.validation.middleware.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

// TODO: Implement route controllers for user

// GET- /api/users
router.get("/", function (req, res, next) {
  const users = userService.getAllUsers();
  res.json(users);
});

// GET- /api/users:id
router.get("/:id", function (req, res, next) {
  const userId = req.params.id;
  const user = userService.getUserById(userId);

  if (user) {
    res.json(user);
  } else {
    res.status(404).send("User not found");
  }
});

// POST /api/users
router.post("/", createUserValid, function (req, res, next) {
  const newUser = req.body;
  const result = userService.createUser(newUser);

  if (result) {
    res.send("Data is saved");
  } else {
    res.status(400).send("User isn't sent");
  }
});

// PUT /api/users/:id
router.put("/:id", updateUserValid, function (req, res, next) {
  const userId = req.params.id;
  const updatedUser = req.body;
  const result = userService.updateUser(updatedUser, userId);

  if (result) {
    res.send("User is updated");
  } else {
    res.status(404).send("User not found");
  }
});

// DELETE /api/users/:id
router.delete("/:id", function (req, res, next) {
  const userId = req.params.id;
  const result = userService.deleteUser(userId);

  if (result) {
    res.send("User is deleted");
  } else {
    res.status(404).send("User not found");
  }
});

router.use(responseMiddleware);
export { router };
