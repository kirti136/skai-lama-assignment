const express = require("express");
const router = express.Router();
const projectController = require("../controllers/project.controller");
const { verifyToken } = require("../middlewares/authentication");

router.post("/", verifyToken, projectController.createProject);
router.get("/", verifyToken, projectController.getProjectsByUser);

module.exports = router;
