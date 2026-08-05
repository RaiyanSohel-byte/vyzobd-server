const express = require("express");

const router = express.Router();

const protect = require("../middlewares/authMiddleware");

const admin = require("../middlewares/adminMiddleware");

const upload = require("../middlewares/uploadMiddleware");

const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");

//user
router.get("/", getProducts);
router.get("/:id", getProduct);

//admin
router.post("/", protect, admin, upload.array("images", 5), createProduct);
router.put("/:id", protect, admin, upload.array("images", 5), updateProduct);
router.delete("/:id", protect, admin, deleteProduct);

module.exports = router;
