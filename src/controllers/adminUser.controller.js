const User = require("../models/user.model");
const Order = require("../models/order.model");

const getAllUsers = async (req, res) => {
  try {
    let {
      search = "",
      role,
      isVerified,
      page = 1,
      limit = 10,
      sort = "newest",
    } = req.query;

    page = Number(page);
    limit = Number(limit);

    // Validate page
    if (isNaN(page) || page < 1) {
      page = 1;
    }

    // Validate limit
    if (isNaN(limit) || limit < 1) {
      limit = 10;
    }

    // Prevent huge requests
    if (limit > 100) {
      limit = 100;
    }

    const query = {};

    // --------------------------
    // Search
    // --------------------------

    if (search.trim()) {
      const safeSearch = escapeRegex(search.trim());

      query.$or = [
        {
          name: {
            $regex: safeSearch,
            $options: "i",
          },
        },
        {
          email: {
            $regex: safeSearch,
            $options: "i",
          },
        },
      ];
    }

    // --------------------------
    // Role Filter
    // --------------------------

    const allowedRoles = ["user", "admin"];

    if (role) {
      if (!allowedRoles.includes(role)) {
        return res.status(400).json({
          success: false,
          message: "Invalid role filter.",
        });
      }

      query.role = role;
    }

    // --------------------------
    // Verified Filter
    // --------------------------

    if (isVerified !== undefined) {
      if (isVerified !== "true" && isVerified !== "false") {
        return res.status(400).json({
          success: false,
          message: "isVerified must be true or false.",
        });
      }

      query.isVerified = isVerified === "true";
    }

    // --------------------------
    // Sorting
    // --------------------------

    const sortOptions = {
      newest: { createdAt: -1 },
      oldest: { createdAt: 1 },
      name_asc: { name: 1 },
      name_desc: { name: -1 },
      email_asc: { email: 1 },
      email_desc: { email: -1 },
    };

    if (!sortOptions[sort]) {
      return res.status(400).json({
        success: false,
        message: "Invalid sort option.",
      });
    }

    const totalUsers = await User.countDocuments(query);

    const users = await User.find(query)
      .select("-password -refreshToken")
      .sort(sortOptions[sort])
      .skip((page - 1) * limit)
      .limit(limit);

    const usersWithStats = await Promise.all(
      users.map(async (user) => {
        const orders = await Order.find({ user: user._id });

        const ordersCount = orders.length;

        const totalSpent = orders.reduce(
          (sum, order) => sum + (order.total || 0),
          0,
        );

        return {
          ...user.toObject(),
          ordersCount,
          totalSpent,
        };
      }),
    );

    res.status(200).json({
      success: true,

      pagination: {
        totalUsers,
        totalPages: Math.ceil(totalUsers / limit),
        currentPage: page,
        pageSize: limit,
        hasNextPage: page < Math.ceil(totalUsers / limit),
        hasPreviousPage: page > 1,
      },

      filters: {
        search,
        role: role || null,
        isVerified: isVerified === undefined ? null : isVerified === "true",
        sort,
      },

      users: usersWithStats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select(
      "-password -refreshToken",
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;

    if (!["user", "admin"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role.",
      });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    user.role = role;

    await user.save();

    res.status(200).json({
      success: true,

      message: "User role updated.",

      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    await user.deleteOne();

    res.status(200).json({
      success: true,
      message: "User deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUserRole,
  deleteUser,
};
