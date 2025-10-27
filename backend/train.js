const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose"); // ✅ Make sure this line is at the top!
const asyncHandler=require('express-async-handler')
const app = express();
const port = 3001;
const errorhandler=require('./middleware/errorhandler.js')
app.use(cors());
app.use(express.json());

// ✅ MongoDB connection
const uri =
  "mongodb+srv://karthikbolisetty34_db_user:karthik987@youtube.iqzqesn.mongodb.net/?retryWrites=true&w=majority&appName=youtube";

mongoose
  .connect(uri)
  .then(() => console.log("✅ Successfully connected to MongoDB"))
  .catch((err) => console.log("❌ Connection error:", err));

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const UsersModel = mongoose.model("usermodel", userSchema);

// ✅ Create new user
app.post("/api/submit-form", async (req, res) => {
  try {
    const newUser = new UsersModel({
      name: req.body.name,
      email: req.body.email,
    });

    await newUser.save();
    res
      .status(201)
      .json({ message: `Thank you, ${req.body.name}. Your data is saved!` });
  } catch (error) {
    console.error("❌ Error saving data:", error);
    res.status(500).json({ message: "Failed to save data" });
  }
});

// ✅ Get all users
app.get("/api/users", async (req, res) => {
  try {
    const users = await UsersModel.find();
    res.status(200).json(users);
  } catch (err) {
    console.error("❌ Error fetching users:", err);
    res.status(500).json({ message: "Failed to fetch details" });
  }
});

// ✅ Update user
app.put("/api/users/:id", async (req, res) => {
  try {
    const updatedUser = await UsersModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error("❌ Error updating user:", error);
    res.status(500).json({ message: "Error updating user" });
  }
});

// ✅ Delete user
app.delete("/api/users/:id", async (req, res) => {
  try {
    const deletedUser = await UsersModel.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting user:", error);
    res.status(500).json({ message: "Error deleting user" });
  }
});

// ============================================
// 🚆 TRAIN BOOKING SCHEMA + ROUTES
// ============================================
const trainSchema = new mongoose.Schema({
  name: String,
  destination: String,
  pickupPoint: String,
  time: String,
});

const TrainModel = mongoose.model("trainmodel", trainSchema);

// ✅ Create a new train booking
app.post("/api/train-booking", async (req, res) => {
  try {
    const newBooking = new TrainModel({
      name: req.body.name,
      destination: req.body.destination,
      pickupPoint: req.body.pickupPoint,
      time: req.body.time,
    });

    await newBooking.save();
    res
      .status(201)
      .json({ message: `🚆 Booking confirmed for ${req.body.name}` });
  } catch (error) {
    console.error("❌ Error saving booking:", error);
    res.status(500).json({ message: "Failed to save booking" });
  }
});

// ✅ Get all bookings
app.get("/api/trains", async (req, res) => {
  try {
    const bookings = await TrainModel.find();
    res.status(200).json(bookings);
  } catch (error) {
    console.error("❌ Error fetching bookings:", error);
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
});

// ✅ Update booking
app.put("/api/trains/:id", async (req, res) => {
  try {
    const updatedBooking = await TrainModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({
      message: "Booking updated successfully",
      booking: updatedBooking,
    });
  } catch (error) {
    console.error("❌ Error updating booking:", error);
    res.status(500).json({ message: "Error updating booking" });
  }
});

// ✅ Delete booking
app.delete("/api/trains/:id", async (req, res) => {
  try {
    const deletedBooking = await TrainModel.findByIdAndDelete(req.params.id);

    if (!deletedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting booking:", error);
    res.status(500).json({ message: "Error deleting booking" });
  }
});

// ============================================
// 🚀 Start Server
// ============================================
app.listen(port, () => {
  console.log(`🚀 Server is running at http://localhost:${port}`);
});
