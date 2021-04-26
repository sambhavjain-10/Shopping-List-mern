const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

//User model
const User = require("../../models/User");

// @route   POST api/users
// @desc    Register New User
// @access  Public

router.post("/", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ msg: "all fields are mandatory" });

  //Check for Existing User

  try {
    const ExEmail = await User.findOne({ email });
    if (ExEmail)
      return res.status(400).json({ msg: "email already registered" });

    const newUser = new User({
      name,
      email,
      password,
    });

    const hash = await bcrypt.hash(newUser.password, 10);
    newUser.password = hash;
    newUser.save().then(user => {
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
    });
    
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;
