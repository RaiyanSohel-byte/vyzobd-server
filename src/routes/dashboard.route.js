const express = require("express");

const router = express.Router();

const protect = require("../middlewares/authMiddleware");
const admin = require("../middlewares/adminMiddleware");

const { getDashboardStats } = require("../controllers/dashboard.controller");

router.get("/", protect, admin, getDashboardStats);

module.exports = router;
