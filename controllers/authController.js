const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

exports.signup = async (req, res) => {
  try {
    const { email, password, username } = req.body;
    const candidate = await User.findOne({ email });
    if (candidate) {
      return res
        .status(400)
        .json({ message: "Пользователь с данным логином уже существует" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      username: username,
      email: email,
      password: hashedPassword,
    });
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Пользователь с данным логином не найден" });
    }
    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      return res.status(400).json({ message: "Неверный пароль" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.logout = (req, res) => {
  res.clearCookie("jwt");
  res.redirect("/");
};
