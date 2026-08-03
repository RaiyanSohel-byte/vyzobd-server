const express = require("express");

const router = express.Router();

const {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} = require("../controllers/cart.controller");

const protect = require("../middlewares/authMiddleware");

router.get("/", protect, getCart);

router.post("/", protect, addToCart);

router.put("/", protect, updateCartItem);

router.delete("/", protect, removeCartItem);

router.delete("/clear", protect, clearCart);

module.exports = router;
