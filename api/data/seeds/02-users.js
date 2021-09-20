const users = [
  {
    username: "bmenz",
    password: "abc123",
    email: "bmenz@gmail.com",
    location: "529W+7X Harare, Zimbabwe",
  },
  {
    username: "ab_caloo",
    password: "abc456",
    email: "ab@gmail.com",
    location: "567M+V8 Luanda, Angola",
  },
  {
    username: "hfgool",
    password: "gool123",
    email: "gool@gmail.com",
    location: "8HQ8+XQ Swakopmund, Namibia",
  },
];

exports.users = users;

exports.seed = function (knex) {
  return knex("users").insert(users);
};
