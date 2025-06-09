const Episode = require("../models/episode.model.js");
const Project = require("../models/project.model.js");

exports.getEpisodesByProjectId = async (req, res) => {
  try {
    const { projectId } = req.query;
    const userId = req.user.id;

    // Step 1: Check if project exists and belongs to this user
    const project = await Project.findOne({ _id: projectId, userId: userId });
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    // Step 2: Fetch episodes belonging to this project
    const episodes = await Episode.find({ projectId });

    if (!episodes || episodes.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No episodes found for this project",
      });
    }

    res.status(200).json({ success: true, episodes });
  } catch (error) {
    console.error("Error fetching episodes by projectId:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getEpisodeById = async (req, res) => {
  try {
    const { episodeId } = req.query;

    const episode = await Episode.findById(episodeId);

    if (!episode) {
      return res
        .status(404)
        .json({ success: false, message: "Episode not found" });
    }

    res.status(200).json({ success: true, episode });
  } catch (error) {
    console.error("Error fetching episode:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createEpisode = async (req, res) => {
  try {
    const { name, transcript, projectId } = req.body;

    if (!name || !transcript || !projectId) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const newEpisode = new Episode({ name, transcript, projectId });
    await newEpisode.save();

    const episodes = await Episode.find({ projectId });
    const episodeCount = episodes.length;

    await Project.findByIdAndUpdate(projectId, { epCount: episodeCount });

    res.status(201).json({ success: true, episode: newEpisode });
  } catch (error) {
    console.error("Error creating episode:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateEpisode = async (req, res) => {
  try {
    const { name, transcript } = req.body;

    const updatedEpisode = await Episode.findByIdAndUpdate(
      req.params.id,
      { name, transcript },
      { new: true, runValidators: true }
    );

    if (!updatedEpisode) {
      return res
        .status(404)
        .json({ success: false, message: "Episode not found" });
    }

    res.status(200).json({ success: true, episode: updatedEpisode });
  } catch (error) {
    console.error("Error updating episode:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteEpisode = async (req, res) => {
  try {
    const deletedEpisode = await Episode.findByIdAndDelete(req.params.id);

    if (!deletedEpisode) {
      return res
        .status(404)
        .json({ success: false, message: "Episode not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Episode deleted successfully" });
  } catch (error) {
    console.error("Error deleting episode:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
