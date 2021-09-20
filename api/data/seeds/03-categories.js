const categories = [
  { category_id: 1, category_name: "Animal Products" },
  { category_id: 2, category_name: "Beans" },
  { category_id: 3, category_name: "Cereals" },
  { category_id: 4, category_name: "Fruits" },
  { category_id: 5, category_name: "Peas" },
  { category_id: 6, category_name: "Roots & Tubers" },
  { category_id: 7, category_name: "Seeds & Nuts" },
  { category_id: 8, category_name: "Vegetables" },
];

exports.categories = categories;

exports.seed = function (knex) {
  return knex("categories").insert(categories);
};
