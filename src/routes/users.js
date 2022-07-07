const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Post = require("../models/Post");
const uploader = require("../uploader");

//UPDATE
router.put("/:id", uploader.single("photo"), async (req, res) => {
  console.log(req.body);
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    try {
      const updated = await User.findByIdAndUpdate(
        req.params.id,
        {
          ...req.body,
        },
        { new: true }
      );
      const { password: _pas, ...props } = updated._doc
      res.status(200).json(props);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json("you can update only account!");
  }
});
//DELETE
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id);

      try {
        await Post.deleteMany({ username: user.username });
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("user has been deleted");
      } catch (err) {
        res.status(500).json(err);
      }
    } catch (err) {
      res.status(404).json("User not found");
    }
  } else {
    res.status(401).json("you can delete only account!");
  }
});
//GET USER
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
