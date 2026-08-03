const express = require("express");

const router = express.Router();

const protect = require("../middlewares/authMiddleware");

const {
  getProfile,

  updateProfile,

  changePassword,
} = require("../controllers/user.controller");

router.get("/profile", protect, getProfile);

router.put("/profile", protect, updateProfile);

router.put("/change-password", protect, changePassword);

module.exports = router;
