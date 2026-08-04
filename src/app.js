const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/db");

dotenv.config();
console.log("CLIENT_URL =", process.env.CLIENT_URL);

connectDB();

const app = express();

const allowedOrigins = ["http://localhost:3000", process.env.CLIENT_URL];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/admin", require("./routes/adminUser.route"));
app.use("/api/products", require("./routes/product.route"));
app.use("/api/categories", require("./routes/category.route"));
app.use("/api/cart", require("./routes/cart.route"));
app.use("/api/auth", require("./routes/auth.route"));
app.use("/api/users", require("./routes/user.route"));
app.use("/api/orders", require("./routes/order.route"));
app.use("/api/dashboard", require("./routes/dashboard.route"));

app.get("/", (req, res) => {
  res.send("API Running...");
});

module.exports = app;
