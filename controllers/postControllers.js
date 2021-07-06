const Post = require("../models/postModel");

exports.createPost = async (req, res) => {
  try {
    const newPost = new Post(req.body);
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Пост с данным id не найден" });
    }
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
            runValidators: true,
          }
        );
        res.status(200).json({
          status: "success",
          data: {
            data: updatedPost,
          },
        });
      } catch (err) {
        res.status(500).json(err.message);
      }
    } else {
      res
        .status(401)
        .json("Вы можете изменить публикации только своего аккаунта");
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Пост с данным id не найден" });
    }
    if (post.username === req.body.username) {
      try {
        await post.delete();
        res.status(200).json("Пост успешно удален");
      } catch (err) {
        res.status(500).json(err.message);
      }
    } else {
      res
        .status(401)
        .json("Вы можете удалять публикации только своего аккаунта");
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(400).json({ message: "Пост с данным id не найден" });
    }

    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.getAllPosts = async (req, res) => {
  const username = req.query.user;
  const category = req.query.cat;
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username });
    } else if (category) {
      posts = await Post.find({
        categories: {
          $in: [category],
        },
      });
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err.message);
  }
};
