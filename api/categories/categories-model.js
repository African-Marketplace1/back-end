const db = require("../data/db-config");

const getAllCategories = () => {
  return db("categories");
};

const getProductsByCategory = async (category_id) => {
  const products = await db("products as p")
    .select("p.*", "u.username")
    .where("category", category_id)
    .join("users as u", "p.seller", "u.user_id");

  products.forEach((product) => {
    product.seller = {
      user_id: product.seller,
      username: product.username,
    };
    delete product.category;
    delete product.username;
  });

  return products;
};

module.exports = { getAllCategories, getProductsByCategory };
