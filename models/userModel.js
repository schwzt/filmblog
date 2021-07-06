const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
   username: {
      type: String,
      required: [true, "Пожалуйста, введите ваше имя"],
    },
    email: {
      type: String,
      required: [true, "Пожалуйста, укажите ваш email"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Пожалуйста, введите валидный email"],
    },
    photo: {
      type: String,
      default: "",
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: 8
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
