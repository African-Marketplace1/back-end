const db = require("../data/db-config");

const getAll = async () => {
  const products = await db("products as p")
    .select("p.*", "c.category_name", "u.user_id", "u.username")
    .join("categories as c", "p.category", "c.category_id")
    .join("users as u", "p.seller", "u.user_id");

  products.forEach((product) => {
    product.seller = {
      user_id: product.seller,
      username: product.username,
    };
    product.category = product.category_name;
    delete product.category_name;
    delete product.user_id;
    delete product.username;
  });
  return products;
};

module.exports = { getAll };
