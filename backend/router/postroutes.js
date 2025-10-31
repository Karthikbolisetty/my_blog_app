// const express = require("express");
// const router = express.Router();
// const posts= require("../models/postmodel.js");


// router.post("/", async (req, res) => {
//   try {
//     const { title, name, content } = req.body;
//     const newPost = await posts.create({ title, name, content });
//     res.status(201).json(newPost);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// router.get("/", async (req, res) => {
//   try {
//     const posts = await posts.find();
//     res.status(200).json(posts);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });


// router.put("/:id", async (req, res) => {
//   try {
//     const updatedPost = await posts.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });
//     res.status(200).json(updatedPost);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // ✅ Delete post
// router.delete("/:id", async (req, res) => {
//   try {
//     await posts.findByIdAndDelete(req.params.id);
//     res.status(200).json({ message: "Post deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// module.exports = router;
// const express = require("express");
// const router = express.Router();
// const posts = require("../models/postmodel.js");
// const upload=require("../middleware/upload.js")
// const fs=require("fs");
// const path=require("path");

// router.post("/",upload.single("image"),async(req,res)=>{
//   try{
//     const{title,content,name}=req.body;
//     // let imageurl="";
//     // if(req.file){
//     //   imageurl=`uploads/${req.file.filename}`
//     // }
//     const imageurl=req.file?req.file.path:"";
//     const post=await posts.create({title,content,name,imageurl});
//     res.status(201).json(post);
//   }catch(error){
//     console.log(error)
//   }
// })
// // router.post("/", async (req, res) => {
// //   const { title, name, content } = req.body;
// //   const newPost = await posts.create({ title, name, content });
// //   res.status(201).json(newPost);
// // });


// router.get("/", async (req, res) => {
//   const allPosts = await posts.find();
//   res.status(200).json(allPosts);
// });


// router.put("/:id", async (req, res) => {
//   const updatedPost = await posts.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//   });
//   res.status(200).json(updatedPost);
// });


// router.delete("/:id", async (req, res) => {
//   await posts.findByIdAndDelete(req.params.id);
//   res.status(200).json({ message: "Post deleted successfully" });
// });

// module.exports = router;
const express = require("express");
const router = express.Router();
const posts = require("../models/postmodel.js");
const upload = require("../middleware/upload.js");
const fs = require("fs");
const path = require("path");

// ✅ Create a new post
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, content, name } = req.body;

    // ✅ Correct field name
    const imageurl = req.file ? req.file.path : "";

    const newPost = await posts.create({
      title,
      content,
      name,
      imageurl
      
    });

    res.status(201).json(newPost);
  } catch (error) {
    console.error("❌ Error creating post:", error.message);
    res.status(500).json({ message: "Error creating post" });
  }
});

// ✅ Get all posts
router.get("/", async (req, res) => {
  try {
    const allPosts = await posts.find().sort({ createdAt: -1 });
    res.status(200).json(allPosts);
  } catch (error) {
    console.error("❌ Error fetching posts:", error.message);
    res.status(500).json({ message: "Error fetching posts" });
  }
});

// ✅ Update a post
router.put("/:id", async (req, res) => {
  try {
    const updatedPost = await posts.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedPost);
  } catch (error) {
    console.error("❌ Error updating post:", error.message);
    res.status(500).json({ message: "Error updating post" });
  }
});

// ✅ Delete a post
router.delete("/:id", async (req, res) => {
  try {
    await posts.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting post:", error.message);
    res.status(500).json({ message: "Error deleting post" });
  }
});

module.exports = router;
