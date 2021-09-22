const db = require("../data/db-config");

const checkProductIdExists = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await db("products").where("product_id", id).first();
    if (product) {
      next();
    } else {
      next({ status: 404, message: "product id is invalid" });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { checkProductIdExists };
