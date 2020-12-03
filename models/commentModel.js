const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  userName: { type: String, require: true },
  userId: { type: String, require: true },
  postId: { type: String, require: true },
  comment: { type: String, require: true },
  createdAt: { type: String, require: true },
});

module.exports = Comment = mongoose.model("comment", commentSchema);
