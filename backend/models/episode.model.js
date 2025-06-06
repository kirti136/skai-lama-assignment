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
    status: {
      type: String,
      enum: ["in-progress", "completed"],
      default: "in-progress",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Episode = mongoose.model("Episode", episodeSchema);

module.exports = Episode;
