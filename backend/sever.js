const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const authroutes = require("./router/authRouter.js");
const path = require("path");
const fs = require("fs");
const postroutes = require("./router/postroutes.js");

const app = express();
const port = process.env.PORT || 3001;

// ✅ CORS setup for both frontend domains
app.use(cors({
  origin: [
    "https://my-blog-app-frontend.onrender.com",
    "https://my-blog-app-image-frontend.onrender.com"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.use(express.json());

// ✅ Routes
app.use("/api/posts", postroutes);
app.use("/api/auth", authroutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ MongoDB connection
const uri = process.env.DATABASE_URI;

mongoose
  .connect(uri)
  .then(() => console.log("✅ Successfully connected to MongoDB"))
  .catch((err) => console.log("❌ Connection error:", err));

// ✅ Server start
app.listen(port, () => {
  console.log(`🚀 Server is running at http://localhost:${port}`);
});

