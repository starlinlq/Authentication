const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const { findByIdAndUpdate } = require("../models/userModel");
router.post("/register", async (req, res) => {
  try {
    let { email, password, passwordCheck, displayName } = req.body;
    console.log(req.body);

    if (!email || !password || !passwordCheck) {
      return res.status(400).json({ msg: "not all filed have been entered" });
    }
    if (password.length < 5) {
      return res
        .status(400)
        .json({ msg: "the password nees to be at least 5 characters long" });
    }
    if (password !== passwordCheck) {
      return res
        .status(400)
        .json({ msg: "enter the same password twice for verification" });
    }
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res
        .status(400)
        .json({ msg: "An account with this email already exists" });
    }
    if (!displayName) {
      displayName = email;
    }
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: passwordHash,
      displayName,
      bio: "",
      location: "",
      interest: "",
      photoUrl: "https://i.stack.imgur.com/l60Hf.png",
      savedPost: [],
    });
    await newUser.save();
    res.json({ email, displayName });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    //validate
    if (!password || !email) {
      return res.status(400).json({ msg: "not all filed have been entered" });
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    console.log(user);
    res.json({
      token,
      user: {
        token,
        id: user._id,
        displayName: user.displayName,
        savedPost: user.savedPost,
        photoUrl: user.photoUrl,
      },
    });
  } catch (err) {
    res.status(500).json({ erro: error.message });
  }
});

router.delete("/delete", auth, async (req, res) => {
  try {
    const deleteUser = await User.findByIdAndDelete(req.user);
    res.json(deleteUser);
  } catch (err) {
    res.status(500).json({ erro: error.message });
  }
});

router.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.json(false);
    const user = await User.findById(verified.id);
    if (!user) return res.json(false);
    return res.json(true);
  } catch (err) {
    res.status(500).json({ erro: error.message });
  }
});

router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user);

  res.json({
    displayName: user.displayName,
    id: user._id,
    bio: user.bio,
    location: user.location,
    interest: user.interest,
    photoUrl: user.photoUrl,
    savedPost: user.savedPost,
  });
});

router.post("/saved", auth, async (req, res) => {
  const userData = await User.findById(req.user);
  const { userId, item } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { _id: userId },
      { savedPost: [...userData.savedPost, { ...item, userId }] },
      { new: true }
    );

    await user.save();
    res.json({ savedPost: user.savedPost });
  } catch (err) {
    res.status(500).json({ error: "something went wrong" });
  }
});
router.get("/loadsaved", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user);

    res.json({ savedPost: user.savedPost });
  } catch (err) {
    res.status(500).json({ error: "something went wrong" });
  }
});

router.post("/detelesaved", auth, async (req, res) => {
  const { removePostId, userId } = req.body;
  const userData = await User.findById(req.user);
  const removeSave = userData.savedPost.filter(
    (data) => data._id !== removePostId
  );

  try {
    const user = await User.findOneAndUpdate(
      { _id: userId },
      { savedPost: [...removeSave] },
      { new: true }
    );

    await user.save();
    res.json({
      savedPost: [...removeSave],
    });
  } catch (err) {
    res.status(500).json({ error: "something went wrong" });
  }
});

router.post("/update", auth, async (req, res) => {
  const { userId, name, bio, interest, location, photoUrl } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { _id: userId },
      { displayName: name, bio, interest, location, photoUrl: photoUrl.url },
      { new: true }
    );

    await user.save();
    res.json({ savedPost: user.savedPost });
  } catch (err) {
    res.status(500).json({ error: "something went wrong" });
  }
});

router.post("/info", async (req, res) => {
  const user = await User.findById(req.body.userId);

  res.json({
    displayName: user.displayName,
    bio: user.bio,
    location: user.location,
    interest: user.interest,
    photoUrl: user.photoUrl,
  });
});

module.exports = router;
