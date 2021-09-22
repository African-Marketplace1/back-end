const bcrypt = require("bcryptjs");

const users = [
  {
    username: "bmenz",
    password: bcrypt.hashSync("pass", 8),
    email: "bmenz@gmail.com",
    location: "529W+7X Harare, Zimbabwe",
    img: "https://images.pexels.com/photos/3785991/pexels-photo-3785991.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    username: "ab_caloo",
    password: bcrypt.hashSync("pass", 8),
    email: "ab@gmail.com",
    location: "567M+V8 Luanda, Angola",
    img: "https://images.pexels.com/photos/6194365/pexels-photo-6194365.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    username: "hfgool",
    password: bcrypt.hashSync("pass", 8),
    email: "gool@gmail.com",
    location: "8HQ8+XQ Swakopmund, Namibia",
    img: "https://images.pexels.com/photos/5082976/pexels-photo-5082976.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
];

exports.users = users;

exports.seed = function (knex) {
  return knex("users").insert(users);
};
