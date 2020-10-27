const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  email: { type: String, require: true, unique: true },
  password: { type: String, required: true, minlength: 5 },
  displayName: { type: String },
  data: [],
});

module.exports = User = mongoose.model("user", userSchema);
