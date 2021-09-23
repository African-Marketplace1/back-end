const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const usersRouter = require("./users/users-router");
const categoriesRouter = require("./categories/categories-router");
const productsRouter = require("./products/products-router");
const session = require("express-session");
// const Store = require("connect-session-knex")(session);
// const knex = require("./data/db-config");

const server = express();

server.use(
  session({
    name: "chocolatechip",
    secret: "you cant see me",
    resave: false,
    saveUninitialized: true,
    // cookie: {
    //   maxAge: 1 * 24 * 60 * 10,
    //   secure: false,
    // },
    // httpOnly: true,
    // resave: false,
    // saveUninitialized: true,
    // store: new Store({
    //   knex,
    //   createTable: true,
    //   clearInterval: 1000 * 60 * 20,
    //   tablename: "sessions",
    //   sidfieldname: "sid",
    // }),
  })
);
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
