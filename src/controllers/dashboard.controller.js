const User = require("../models/user.model");
const Product = require("../models/product.model");
const Order = require("../models/order.model");

const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    const totalProducts = await Product.countDocuments();

    const totalOrders = await Order.countDocuments();

    const orders = await Order.find();

    const totalRevenue = orders.reduce(
      (sum, order) => sum + order.totalPrice,
      0,
    );

    const recentOrders = await Order.find()
      .populate("user", "name")
      .sort({ createdAt: -1 })
      .limit(5);

    const now = new Date();

    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);

    const monthlyOrders = await Order.find({
      createdAt: {
        $gte: firstDay,
      },
    });

    const monthlySales = monthlyOrders.reduce(
      (sum, order) => sum + order.totalPrice,
      0,
    );

    const monthlyTarget = 150000;

    const percentage = Math.round((monthlySales / monthlyTarget) * 100);

    res.json({
      success: true,

      stats: {
        totalUsers,
        totalProducts,
        totalOrders,
        totalRevenue,
      },

      monthly: {
        target: monthlyTarget,
        current: monthlySales,
        percentage,
      },

      recentOrders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};
