const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const Post = require("../models/postModel");

exports.updateUser = async (req, res) => {
  if (req.params.id === req.body.userId) {
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 12);
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!user) {
        return res
          .status(404)
          .json({ message: "Пользователь с данным id не найден" });
      }
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err.message);
    }
  } else {
    return res
      .status(401)
      .json({ message: "Вы можете изменить данные только своего аккаунта" });
  }
};

exports.deleteUser = async (req, res) => {
  if (req.params.id === req.body.userId) {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res
          .status(400)
          .json({ message: "Пользователь с данным id не найден" });
      }
      try {
        await Post.deleteMany({ username: user.username });
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("Пользователь успешно удален");
      } catch (err) {
        res.status(500).json(err.message);
      }
    } catch (err) {
      res.status(500).json(err.message);
    }
  } else {
    return res
      .status(401)
      .json({ message: "Вы можете удалить только свой аккаунт" });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res
        .status(400)
        .json({ message: "Пользователь с данным id не найден" });
    }
    user.password = undefined;
    res.status(200).json({
      status: "success",
      data: {
        data: user,
      },
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
};
