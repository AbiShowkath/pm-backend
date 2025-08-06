const express = require("express");
const router = express.Router();
const ProjectController = require("../controllers/projectController.ts");
const authenticate = require("../middleware/auth.js");

router.get("/", authenticate, ProjectController.getAllProjects);
router.post("/", authenticate, ProjectController.createProject);
router.get("/:id", authenticate, ProjectController.getProjectById);
router.put("/:id", authenticate, ProjectController.updateProject);
router.delete("/:id", authenticate, ProjectController.deleteProject);

module.exports = router;
