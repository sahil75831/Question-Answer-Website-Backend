const mongoose = require("mongoose");

const postAnswerSchema = new mongoose.Schema(
  {
    repliedBy: {
      type: String,
      required: true,
      trim: true,
    },
    repliedTo: {
      type: String,
      required: true,
      trim: true,
    },
    answer: {
      type: String,
      trim: true,
      default: "No Answer Yet...",
    },
    likeCount: {
      type: Number,
      trim: true,
      default: 0,
    },
  },
  { timestamps: true }
);
const PostAnswerModel = new mongoose.model(
  "PostAnswerCollection",
  postAnswerSchema
);
module.exports = PostAnswerModel;
