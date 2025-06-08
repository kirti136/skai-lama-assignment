const Project = require("../models/project.model");

exports.createProject = async (req, res) => {
  try {
    const { title } = req.body;
    const userId = req.user?.id;

    if (!userId || !title) {
      return res
        .status(400)
        .json({ success: false, message: "User ID and title are required" });
    }

    const newProject = new Project({ title, userId });
    await newProject.save();

    res
      .status(201)
      .json({ success: true, project: { title: newProject.title } });
  } catch (error) {
    console.error("Create Project Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getProjectsByUser = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required" });
    }

    const projects = await Project.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, projects });
  } catch (error) {
    console.error("Get Projects Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
