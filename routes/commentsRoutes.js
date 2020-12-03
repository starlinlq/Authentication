const router = require("express").Router();
const auth = require("../middleware/auth");
const Comment = require("../models/commentModel");

router.post("/", auth, async (req, res) => {
  try {
    const data = req.body;
    console.log(req.body);

    if (!data) {
      return res.status(400).json({ msg: "not all filed have been entered" });
    }
    const newComment = new Comment({
      userName: data.userName,
      comment: data.comment,
      createdAt: data.createdAt,
      postId: data.postId,
      userId: data.userId,
    });
    const savedComment = await newComment.save();
    res.json(savedComment);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

router.get("/all", async (req, res) => {
  await Comment.find({}, (err, result) => {
    if (err) {
      res.json({ err: err });
    } else res.json(result);
  });
});

router.post("/delete", auth, async (req, res) => {
  const { postId } = req.body;

  try {
    const deleteComment = await Comment.findByIdAndDelete(postId);
    res.json(deleteComment);
  } catch (err) {
    res.status(500).json({ erro: error.message });
  }
});

module.exports = router;
