const express = require("express");
const Product = require("./products-model");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const products = await Product.getAll();
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
