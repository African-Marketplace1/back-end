const express = require("express");
const Product = require("./products-model");
const { categoryNameToId } = require("../users/users-middleware");
const { checkProductIdExists } = require("./products-middleware");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const products = await Product.getAll();
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
});

router.put(
  "/:id",
  categoryNameToId,
  checkProductIdExists,
  async (req, res, next) => {
    const product_id = req.params.id;
    const changes = { ...req.body, category: req.category };
    try {
      const products = await Product.updateProduct(product_id, changes);
      res.status(201).json(products);
    } catch (err) {
      next(err);
    }
  }
);

router.delete("/:id", checkProductIdExists, async (req, res, next) => {
  const product_id = req.params.id;
  try {
    const products = await Product.removeProduct(product_id);
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
