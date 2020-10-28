const mongoose = require("mongoose");

const postsSchema = new mongoose.Schema({
  data: [],
  userId: { type: String, require: true },
});

module.exports = Post = mongoose.model("posts", postsSchema);
