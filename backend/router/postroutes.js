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
const express = require("express");
const router = express.Router();
const posts = require("../models/postmodel.js");


router.post("/", async (req, res) => {
  const { title, name, content } = req.body;
  const newPost = await posts.create({ title, name, content });
  res.status(201).json(newPost);
});


router.get("/", async (req, res) => {
  const allPosts = await posts.find();
  res.status(200).json(allPosts);
});


router.put("/:id", async (req, res) => {
  const updatedPost = await posts.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedPost);
});


router.delete("/:id", async (req, res) => {
  await posts.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Post deleted successfully" });
});

module.exports = router;
