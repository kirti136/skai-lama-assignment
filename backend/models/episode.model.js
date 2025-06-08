const mongoose = require("mongoose");

const episodeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    transcript: {
      type: String,
      required: true,
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Episode = mongoose.model("Episode", episodeSchema);

module.exports = Episode;
