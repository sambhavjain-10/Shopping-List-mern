const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

//User model
const User = require("../../models/User");

// @route   POST api/auth
// @desc    Auth User
// @access  Public

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  //check for existing user

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "user doesn't exist" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ msg: "password incorrect" });

    const token = await jwt.sign({ id: user.id }, config.get("jwtSecret"), {
      expiresIn: 3600,
    });
    res.status(200).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// @route   GET api/auth/user
// @desc    Get User Data
// @access  Private

router.get("/user", auth, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then(user => res.json(user));
});

module.exports = router;
