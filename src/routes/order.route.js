const express = require("express");

const router = express.Router();

const protect = require("../middlewares/authMiddleware");
const admin = require("../middlewares/adminMiddleware");

const {
  createOrder,
  getMyOrders,
  getOrderById,
  cancelOrder,
  getAllOrders,
  updateOrderStatus,
  updatePaymentStatus,
  deleteOrder,
} = require("../controllers/order.controller");

// User Routes
router.post("/", protect, createOrder);

router.get("/my-orders", protect, getMyOrders);

router.get("/:id", protect, getOrderById);

router.put("/:id/cancel", protect, cancelOrder);

// Admin Routes
router.get("/", protect, admin, getAllOrders);

router.put("/:id/status", protect, admin, updateOrderStatus);

router.put("/:id/payment", protect, admin, updatePaymentStatus);

router.delete("/:id", protect, admin, deleteOrder);

module.exports = router;
