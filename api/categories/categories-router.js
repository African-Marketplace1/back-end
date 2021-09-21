const express = require("express");
const Category = require("./categories-model");
const { checkCategoryIdExists } = require("./categories-middleware");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const categories = await Category.getAllCategories();
    res.status(200).json(categories);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", checkCategoryIdExists, async (req, res, next) => {
  const { id } = req.params;
  try {
    const products = await Category.getProductsByCategory(id);
    res.status(200).json(products);
  } catch (err) {
    next();
  }
});

module.exports = router;
