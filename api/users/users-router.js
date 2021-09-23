const express = require("express");
const Users = require("./users-model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  categoryNameToId,
  checkIdExists,
  checkLoginBody,
  checkRegisterBody,
} = require("./users-middleware");
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "shh";

router.get("/logout", async (req, res) => {
  if (req.session.user) {
    req.session.destroy((err) => {
      if (err) {
        res.status(500).json({
          message: "There was an error deleting your session",
          error: err,
        });
      } else {
        res.status(200).json({ message: "Logout successful; Session deleted" });
      }
    });
  } else {
    res.status(400).json({ message: "You are not logged in" });
  }
});

router.get("/:id", checkIdExists, async (req, res, next) => {
  const { id } = req.params;
  try {
    const response = await Users.getUserById(id);
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
});

router.post("/login", checkLoginBody, async (req, res, next) => {
  const { password } = req.login;
  try {
    if (bcrypt.compareSync(password, req.user.password)) {
      req.session.user = req.user;
      console.log("session started");
      const token = buildToken(req.user);
      res.status(200).json({
        message: `Welcome back ${req.user.username}`,
        token: token,
        user: req.user,
      });
    } else {
      next({ status: 401, message: "Invalid Password" });
    }
  } catch (err) {
    next(err);
  }
});

router.post("/register", checkRegisterBody, async (req, res, next) => {
  const { password } = req.body;
  const hash = bcrypt.hashSync(password, 8);
  try {
    const newUser = await Users.addUser({ ...req.body, password: hash });
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
});

router.post("/:id", categoryNameToId, checkIdExists, async (req, res, next) => {
  const { id } = req.params;
  try {
    const products = await Users.addProduct(id, req.category, req.body);
    res.status(201).json(products);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", checkIdExists, async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await Users.updateUser(id, req.body);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", checkIdExists, async (req, res, next) => {
  const { id } = req.params;
  try {
    await Users.removeUser(id);
    res
      .status(200)
      .json({ message: `user with id ${id} successfully deleted` });
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
