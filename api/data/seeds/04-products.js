const products = [
  {
    name: "Eggs",
    price_usd: 5.99,
    description: "12 per pack",
    seller: 1,
    img: "https://solidstarts.com/wp-content/uploads/when-can-babies-eat-eggs-480x320@2x.webp",
    category: 1,
  },
  {
    name: "Avocado",
    price_usd: 2.99,
    description: "1 avocado per purchase",
    seller: 1,
    img: "https://www.washingtonian.com/wp-content/uploads/2020/02/iStock-1027572462-scaled-2048x1695.jpg",
    category: 4,
  },
  {
    name: "Beans Rosecoco",
    price_usd: 6.5,
    description: "2 lbs per bag",
    seller: 2,
    img: "https://assets.sainsburys-groceries.co.uk/gol/7693115/1/640x640.jpg",
    category: 2,
  },
  {
    name: "Milk",
    price_usd: 4.99,
    description: "500 ml per bottle",
    seller: 2,
    img: "https://images.pexels.com/photos/7573152/pexels-photo-7573152.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
    category: 1,
  },
  {
    name: "Limes",
    price_usd: 5.99,
    description: "2 Limes per purchase",
    seller: 3,
    img: "https://crownmarketonline.com/wp-content/uploads/2020/05/Limes.jpg",
    category: 4,
  },
];

exports.products = products;

exports.seed = function (knex) {
  return knex("products").insert(products);
};
