const categories = [
  {
    category_id: 1,
    category_name: "Animal Products",
    img: "https://images.pexels.com/photos/5468588/pexels-photo-5468588.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
  },
  {
    category_id: 2,
    category_name: "Beans",
    img: "https://images.unsplash.com/photo-1612257416648-ee7a6c533b4f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1193&q=80",
  },
  {
    category_id: 3,
    category_name: "Cereals",
    img: "https://images.unsplash.com/photo-1503430215910-ba12c8478962?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1180&q=80",
  },
  {
    category_id: 4,
    category_name: "Fruits",
    img: "https://images.unsplash.com/photo-1624835020719-deec76c86249?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1180&q=80",
  },
  {
    category_id: 5,
    category_name: "Peas",
    img: "https://images.unsplash.com/photo-1615485500710-aa71300612aa?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1181&q=80",
  },
  {
    category_id: 6,
    category_name: "Roots & Tubers",
    img: "https://images.unsplash.com/photo-1528505086635-4c69d5f10908?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1167&q=80",
  },
  {
    category_id: 7,
    category_name: "Seeds & Nuts",
    img: "https://images.unsplash.com/photo-1614061813295-0e0f82273dc3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1180&q=80",
  },
  {
    category_id: 8,
    category_name: "Vegetables",
    img: "https://images.unsplash.com/photo-1626788460425-80be45dd088d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1180&q=80",
  },
];

exports.categories = categories;

exports.seed = function (knex) {
  return knex("categories").insert(categories);
};
