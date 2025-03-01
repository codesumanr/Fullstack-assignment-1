
const express = require("express");
const router = express.Router();
const projectController = require("./controller");

// Define routes using the controller's functions
router.get("/", projectController.listProjects);
router.get("/:id", projectController.projectDetails);

module.exports = router;
