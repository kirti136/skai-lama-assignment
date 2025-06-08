const express = require("express");
const router = express.Router();
const episodeController = require("../controllers/episode.controller");
const { verifyToken } = require("../middlewares/authentication");

router.get("/p", verifyToken, episodeController.getEpisodesByProjectId);
router.get("/e", verifyToken, episodeController.getEpisodeById);
router.post("/", verifyToken, episodeController.createEpisode);
router.put("/:id", verifyToken, episodeController.updateEpisode);
router.delete("/:id", verifyToken, episodeController.deleteEpisode);

module.exports = router;
