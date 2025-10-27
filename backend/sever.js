const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const authroutes=require("./router/authRouter.js")

const postroutes = require("./router/postroutes.js"); 

const app = express();
const port = 3001;


app.use(cors());
app.use(express.json());


app.use("/api/posts", postroutes); 
app.use("/api/auth",authroutes);


const uri = process.env.DATABASE_URI;

mongoose
  .connect(uri)
  .then(() => console.log("✅ Successfully connected to MongoDB"))
  .catch((err) => console.log("❌ Connection error:", err));


app.listen(port, () => {
  console.log(`🚀 Server is running at http://localhost:${port}`);
});
