const db = require("../data/db-config");

const getById = async (id) => {
  const user = await db("users").where("user_id", id).first();
  const products = await db("products as p")
    .select("p.*")
    .where("seller", id)
    .join("categories as c", "p.category", "c.category_id");
  const categories = await db("categories");
  products.forEach((prod) => {
    delete prod.seller;
  });
  const returnObj = {
    ...user,
    products: products,
  };
  return returnObj;
};

module.exports = { getById };
