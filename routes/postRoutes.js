const express = require("express");
const router = express.Router();
const postController = require("../controllers/postControllers");

router.patch("/:id", postController.updatePost);
router.delete("/:id", postController.deletePost);
router.get("/:id", postController.getPost);
router.post("/", postController.createPost);
router.get("/", postController.getAllPosts);

module.exports = router;
