const mongoose = require("mongoose");

const postsSchema = new mongoose.Schema({
  imgUrl: { type: String, require: true },
  userId: { type: String, require: true },
  author: { type: String, require: true },
  story: { type: String, require: true },
  title: { type: String, require: true },
  topic: { type: String, require: true },
});

module.exports = Post = mongoose.model("posts", postsSchema);
