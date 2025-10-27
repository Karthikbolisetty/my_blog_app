const express=require("express")
const user=require("../models/usermodel.js")
const router=express.Router();
router.post("/api/submit-form", async (req, res) => {
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

// ✅ GET API - Fetch all users
router.get("/api/users", async (req, res) => {
  try {
    const users = await UsersModel.find();
    res.status(200).json(users);
  } catch (err) {
    console.error("❌ Error fetching users:", err);
    res.status(500).json({ message: "Failed to fetch details" });
  }
});

// ✅ PUT API - Update user by ID
router.put("/api/users/:id", async (req, res) => {
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

// ✅ DELETE API - Delete user by ID
router.delete("/api/users/:id", async (req, res) => {
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


module.exports=router;
