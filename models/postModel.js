const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Пожалуйста, введите заголовок"],
      unique: true,
    },
    desc: {
      type: String,
      required: [true, "Пожалуйста, введите описние"],
    },
    photo: {
      type: String,
    },
    username: {
      type: String,
      required: true,
    },
    categories: {
      type: Array,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
