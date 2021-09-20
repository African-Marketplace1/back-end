const db = require("../data/db-config");

const getById = (id) => {
  return db("users").where("user_id", id).first();
};

module.exports = { getById };
