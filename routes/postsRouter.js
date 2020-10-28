const router = require("express").Router();
const auth = require("../middleware/auth");
const Post = require("../models/postsModel");
router.post("/", auth, async (req, res) => {
  try {
    const { post } = req.body;
    if (!post) {
      return res.status(400).json({ msg: "not all filed have been entered" });
    }
    const newPost = new Post({
      data: [post],
      userId: req.user,
    });
    const savedPost = await newPost.save();
    res.json(savedPost);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

router.get("/all", async (req, res) => {
  await Post.find({}, (errr, result) => {
    if (err) {
      res.json({ err: err });
    } else res.json(result);
  });
});

router.delete("/:id", auth, async (req, res) => {});
module.exports = router;
