const { Router } = require("express");
const UsersController = require("../controllers/users.controller");

const userRoutes = Router();

const userController = new UsersController();

userRoutes.post("/", userController.create);
userRoutes.put("/:id", userController.update);

module.exports = userRoutes;
