const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const usersRouter = require("./users/users-router");
const categoriesRouter = require("./categories/categories-router");
const productsRouter = require("./products/products-router");

const server = express();
server.use(express.json());
server.use(helmet());
server.use(cors());

server.use("/users", usersRouter);
server.use("/categories", categoriesRouter);
server.use("/products", productsRouter);

server.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
  });
});

module.exports = server;
