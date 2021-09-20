const express = require("express");
const Users = require("./users-model");
const router = express.Router();

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  const response = await Users.getById(id);
  res.status(200).json(response);
});

router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  const user = await Users.getBy({ username: username });
  res.status(200).json(user);
});

router.post("/register", async (req, res, next) => {
  const user = await Users.add(req.body);
  res.status(200).json(user);
});

module.exports = router;
