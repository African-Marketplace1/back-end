const db = require("../data/db-config");

const getUserById = async (id) => {
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

const getUserBy = async (filter) => {
  return await db("users").where(filter).first();
};

const addUser = async (newUser) => {
  const { username } = newUser;
  await db("users").insert(newUser);
  return await getUserBy({ username });
};

const addProduct = async (seller_id, category_id, newProduct) => {
  await db("products").insert({
    seller: seller_id,
    ...newProduct,
    category: category_id,
  });
  return db("products").where("seller", seller_id);
};

const getCategoryByName = async (name) => {
  const category = await db("categories").where("category_name", name).first();
  return category.category_id;
};

const updateUser = async (user_id, changes) => {
  await db("users").where("user_id", user_id).update(changes);
  return await getUserById(user_id);
};

const removeUser = async (user_id) => {
  await db("users").where("user_id", user_id).del();
};

module.exports = {
  getUserById,
  getUserBy,
  addUser,
  addProduct,
  getCategoryByName,
  updateUser,
  removeUser,
};
