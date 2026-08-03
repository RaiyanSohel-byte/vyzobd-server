const express = require("express");

const router = express.Router();

const protect = require("../middlewares/authMiddleware");
const admin = require("../middlewares/adminMiddleware");

const {
  getAllUsers,
  getUserById,
  updateUserRole,
  deleteUser,
} = require("../controllers/adminUser.controller");

router.get("/users", getAllUsers);

router.get("/users/:id", protect, admin, getUserById);

router.put("/users/:id/role", protect, admin, updateUserRole);

router.delete("/users/:id", protect, admin, deleteUser);

module.exports = router;
