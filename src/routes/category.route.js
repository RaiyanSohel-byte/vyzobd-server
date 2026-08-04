const express = require("express");

const router = express.Router();

const protect = require("../middlewares/authMiddleware");

const admin = require("../middlewares/adminMiddleware");
const {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/category.controller");

router.post("/", protect, admin, createCategory);

router.get("/", getCategories);

router.get("/:id", getCategory);

router.put("/:id", admin, updateCategory);

router.delete("/:id", admin, deleteCategory);

module.exports = router;
