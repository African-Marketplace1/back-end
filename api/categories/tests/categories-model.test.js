const Category = require("../categories-model");
const db = require("../../data/db-config");

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});
beforeEach(async () => {
  await db.seed.run();
});
afterAll(async () => {
  await db.destroy();
});

it("sanity check", () => {
  expect(true).not.toBe(false);
});

describe("categories-model", () => {
  describe("getAllCategories", () => {
    test("returns all categories", async () => {
      const result = await Category.getAllCategories();
      expect(result).toHaveLength(8);
    });
    test("each category has the correct properties", async () => {
      const result = await Category.getAllCategories();
      expect(result[0]).toHaveProperty("category_id");
      expect(result[0]).toHaveProperty("category_name");
    });
  });

  describe("getProductsByCategory", () => {
    test("returns the correct number of products", async () => {
      const result = await Category.getProductsByCategory(1);
      expect(result).toHaveLength(2);
    });
    test("returns the correct shape", async () => {
      const result = await Category.getProductsByCategory(1);
      const expected = [
        {
          product_id: 1,
          name: "Eggs",
          price_usd: 5.99,
          description: "12 per pack",
          seller: {
            user_id: 1,
            username: "bmenz",
          },
          img: "https://solidstarts.com/wp-content/uploads/when-can-babies-eat-eggs-480x320@2x.webp",
        },
        {
          product_id: 4,
          name: "Milk",
          price_usd: 4.99,
          description: "500 ml per bottle",
          seller: {
            user_id: 2,
            username: "ab_caloo",
          },
          img: "https://images.pexels.com/photos/7573152/pexels-photo-7573152.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
        },
      ];
      expect(result).toEqual(expected);
    });
  });
});
