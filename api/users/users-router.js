const express = require("express");
const Users = require("./users-model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  categoryNameToId,
  checkIdExists,
  checkLoginBody,
  checkRegisterBody,
  checkIfSession,
} = require("./users-middleware");
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "shh";

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
      const token = await buildToken(req.user);
      res.status(200).json({
        message: `Welcome ${req.user.username}`,
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

const buildToken = async (user) => {
  const payload = {
    user: await Users.getUserById(user.user_id),
  };
  const options = {
    expiresIn: "2d",
  };
  return jwt.sign(payload, JWT_SECRET, options);
};

module.exports = router;
