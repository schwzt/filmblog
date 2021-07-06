const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.patch("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
router.get("/:id", userController.getUser);

module.exports = router;
