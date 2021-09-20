const express = require("express");
const Users = require("./users-model");
const router = express.Router();

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  const response = await Users.getById(id);
  res.status(200).json(response);
});

module.exports = router;
