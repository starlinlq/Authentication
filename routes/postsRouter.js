const router = require("express").Router();
const auth = require("../middleware/auth");
const Post = require("../models/postsModel");

router.post("/", auth, async (req, res) => {
  try {
    const post = req.body;
    console.log(post);

    if (!post) {
      return res.status(400).json({ msg: "not all filed have been entered" });
    }
    const newPost = new Post({
      author: post.author,
      imgUrl: post.imgUrl,
      title: post.title,
      story: post.story,
      topic: post.topic,
      userId: req.user,
    });
    const savedPost = await newPost.save();
    res.json(savedPost);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

router.get("/all", async (req, res) => {
  await Post.find({}, (err, result) => {
    if (err) {
      res.json({ err: err });
    } else res.json(result);
  });
});

router.delete("/delete", auth, async (req, res) => {
  try {
    let postId = req.header("postId");
    console.log(postId);
    const deletePost = await Post.findByIdAndDelete(postId);
    console.log(deletePost);
  } catch (err) {
    res.status(500).json({ erro: error.message });
  }
});

module.exports = router;
