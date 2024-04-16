const { Router } = require("express");
const TagsController = require("../controllers/tags.controller");

const tagsRoutes = Router();

const tagsController = new TagsController();

tagsRoutes.get("/:user_id", tagsController.index);

module.exports = tagsRoutes;
