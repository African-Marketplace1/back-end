const express = require("express");
const Users = require("./users-model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "shh";

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  const response = await Users.getById(id);
  res.status(200).json(response);
});

router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await Users.getBy({ username });
    if (bcrypt.compareSync(password, user.password)) {
      const token = buildToken(user);
      res
        .status(200)
        .json({ message: `Welcome back ${user.username}`, token: token });
    } else {
      next({ status: 401, message: "Invalid Credentials" });
    }
  } catch (err) {
    next(err);
  }
});

router.post("/register", async (req, res, next) => {
  const { password } = req.body;
  const hash = bcrypt.hashSync(password, 8);
  try {
    const newUser = await Users.add({ ...req.body, password: hash });
    res.status(200).json(newUser);
  } catch (err) {
    next(err);
  }
});

const buildToken = (user) => {
  const payload = {
    subject: user.user_id,
    username: user.username,
  };
  const options = {
    expiresIn: "2d",
  };
  return jwt.sign(payload, JWT_SECRET, options);
};

module.exports = router;
