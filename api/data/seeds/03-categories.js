const categories = [
  { category_id: 1, name: "Animal Products" },
  { category_id: 2, name: "Beans" },
  { category_id: 3, name: "Cereals" },
  { category_id: 4, name: "Fruits" },
  { category_id: 5, name: "Peas" },
  { category_id: 6, name: "Roots & Tubers" },
  { category_id: 7, name: "Seeds & Nuts" },
  { category_id: 8, name: "Vegetables" },
];

exports.categories = categories;

exports.seed = function (knex) {
  return knex("categories").insert(categories);
};
