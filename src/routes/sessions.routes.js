const { Router } = require("express");

const SessionsController = require("../controllers/sessions.controller");
const sessionsController = new SessionsController();

const sessionRoutes = Router();
sessionRoutes.post("/", sessionsController.create)

module.exports = sessionRoutes;