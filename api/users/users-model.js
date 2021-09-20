const db = require("../data/db-config");

const getById = async (id) => {
  const user = await db("users").where("user_id", id).first();
  const products = await db("products as p")
    .select("p.*", "c.category_name")
    .where("seller", id)
    .join("categories as c", "p.category", "c.category_id");
  products.forEach((prod) => {
    delete prod.seller;
    delete prod.category;
  });
  const returnObj = {
    ...user,
    products: products,
  };
  return returnObj;
};

const getBy = async (filter) => {
  return await db("users").where(filter).first();
};

const add = async (newUser) => {
  const { username } = newUser;
  await db("users").insert(newUser);
  return await getBy({ username });
};

module.exports = { getById, getBy, add };
