

// const express=require("express")
// const router=express.Router();
// const user=require(`../models/usermodel.js`)
// const bcrypt=require("bcryptjs")
// const jwt=require("jsonwebtoken")
// const asyncHandler=require("express-async-handler")



// const generateToken=(id)=>{
//     return jwt.sign({id},process.env.JWT_SECRET,{
//     expiresIn:"30d",})
// }

// router.post("/register",asyncHandler(async(req,res)=>{
//     const {name,email,password}=req.body
//     const userExists=await user.findOne({email});
//     if(userExists){
//         res.status(400);
//         throw new Error("user already exsists");
//     }
//     const salt=await bcrypt.genSalt(10);
//     const hashedpassword=await bcrypt.hash(password,salt);
//     const user=await user.create({name,email,password:hashedpassword})
// if(user){
//     res.status(201).json({
//         _id:user.id,
//         name:user.name,
//         email:user.email,
//         message:"registration successfull"
// })
   
// }
// else{
//     res.status(400);
//     throw new Error("invalid user data");
//    } 
// }))

// router.post("/login",asyncHandler(async(req,res)=>{
//     const {email,password}=req.body;
// const user=await user.findOne({email})
// if(user && (await bcrypt.compare(password,user.password))){
//     res.status(200).json({
//         _id:user.id,
//         name:user.name,
//         email:user.email,
//         token:generateToken(user.id)
//     })
// }
// else{
//     res.status(401);
//     throw new Error("invalid email or password");
// }
// }))
// module.exports=router;

// const express = require("express");
// const router = express.Router();
// const User = require("../models/usermodel.js");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const asyncHandler = require("express-async-handler");

// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, {
//     expiresIn: "30d",
//   });
// };


// router.post(
//   "/register",
//   asyncHandler(async (req, res) => {
//     const { name, email, password } = req.body;

    
//     if (!name || !email || !password) {
//       res.status(400);
//       throw new Error("Please provide all fields");
//     }

   
//     const userExists = await User.findOne({ email });
//     if (userExists) {
//       res.status(400);
//       throw new Error("User already exists");
//     }

   
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

   
//     const newUser = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//     });

//     if (newUser) {
//       res.status(201).json({
//         _id: newUser.id,
//         name: newUser.name,
//         email: newUser.email,
//         message: "Registration successful!",
//       });
//     } else {
//       res.status(400);
//       throw new Error("Invalid user data");
//     }
//   })
// );

// router.post(
//   "/login",
//   asyncHandler(async (req, res) => {
//     const { email, password } = req.body;


//     const existingUser = await User.findOne({ email });

//     if (existingUser && (await bcrypt.compare(password, existingUser.password))) {
//       res.status(200).json({
//         _id: existingUser.id,
//         name: existingUser.name,
//         email: existingUser.email,
//         token: generateToken(existingUser.id),
//       });
//     } else {
//       res.status(401);
//       throw new Error("Invalid email or password");
//     }
//   })
// );

// module.exports = router;

const express = require("express");
const router = express.Router();
const User = require("../models/usermodel.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// 🟢 Register Route
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "Please provide all fields" });
    }

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // ✅ Always send JSON response with success + message
    return res.status(201).json({
      success: true,
      message: "Registered successfully!",
      user: {
        _id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
      token: generateToken(newUser.id),
    });
  } catch (err) {
    console.error("Register error:", err.message);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

// 🟢 Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const existingUser = await User.findOne({ email });

    if (existingUser && (await bcrypt.compare(password, existingUser.password))) {
      return res.status(200).json({
        success: true,
        message: "Login successful!",
        user: {
          _id: existingUser.id,
          name: existingUser.name,
          email: existingUser.email,
        },
        token: generateToken(existingUser.id),
      });
    } else {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }
  } catch (err) {
    console.error("Login error:", err.message);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
