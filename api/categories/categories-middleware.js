const db = require("../data/db-config");

const checkCategoryIdExists = async (req, res, next) => {
  const { id } = req.params;
  try {
    const category = await db("categories").where("category_id", id).first();
    if (category) {
      req.category = category;
      next();
    } else {
      next({ status: 404, message: "category ID invalid" });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { checkCategoryIdExists };
