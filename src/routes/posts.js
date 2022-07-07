const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const uploader = require("../uploader");

//CREATE NEW POST
router.post("/", uploader.single("photo"), async (req, res, next) => {
  req.body.photo = req.file ? req.file.filename : "";
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    return res.status(200).json(savedPost);
  } catch (err) {
    return next(err);
  }
});
//UPDATE POST
router.put("/:id", async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatePost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        return res.status(200).json(updatePost);
      } catch (err) {
        return next(err);
      }
    } else {
      return res.status(401).json("you can update on your post");
    }
  } catch (err) {
    return next(err);
  }
});
//DELETE POST
router.delete("/:id", async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await post.delete();
        return res.status(200).json("post has been deleted ");
      } catch (err) {
        return next(err);
      }
    } else {
      return res.status(401).json("you can delete on your post");
    }
  } catch (err) {
    return next(err);
  }
});

//GET POST
router.get("/:id", async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    return res.status(200).json(post);
  } catch (err) {
    return next(err);
  }
});

//GET ALL POSTS
router.get("/", async (req, res, next) => {
  const username = req.query.user;
  const catName = req.query.cat;

  try {
    let posts;
    if (username) {
      posts = await Post.find({ username: username });
    } else if (catName) {
      posts = await Post.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      posts = await Post.find();
    }
    return res.status(200).json(posts);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
