const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  email: { type: String, require: true, unique: true },
  password: { type: String, required: true, minlength: 5 },
  displayName: { type: String },
  bio: { type: String },
  location: { type: String },
  interest: { type: String },
  photoUrl: { type: String },
});

module.exports = User = mongoose.model("user", userSchema);
