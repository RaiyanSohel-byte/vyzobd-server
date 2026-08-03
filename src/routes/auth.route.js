const express = require("express");

const router = express.Router();

const protect = require("../middlewares/authMiddleware");

const {
  registerUser,
  loginUser,
  verifyEmail,
  resendVerificationEmail,
  forgotPassword,
  resetPassword,
  logoutUser,
  getMe,
} = require("../controllers/auth.controller");

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/verify-email/:token", verifyEmail);

router.post("/resend-verification", resendVerificationEmail);

router.post("/forgot-password", forgotPassword);

router.post("/reset-password/:token", resetPassword);

router.post("/logout", logoutUser);

router.get("/me", protect, getMe);

module.exports = router;
