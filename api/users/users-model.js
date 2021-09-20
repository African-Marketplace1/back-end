const db = require("../data/db-config");

const getById = (id) => {
  return db("users").where("id", id);
};

module.exports = { getById };
