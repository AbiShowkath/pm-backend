const express = require("express");
const router = express.Router();
const TeamController = require("../controllers/teamController.ts");
const authenticate = require("../middleware/auth.js");

router.get("/", authenticate, TeamController.getAllTeams);
router.post("/", authenticate, TeamController.createTeam);
router.get("/:project_id", authenticate, TeamController.getTeamById)
router.delete("/:project_id", authenticate, TeamController.deleteUserFromTeam);

module.exports = router;