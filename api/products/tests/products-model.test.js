const Product = require("../products-model");
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

describe("users-model", () => {
  it("is the correct testing environment", async () => {
    expect(process.env.NODE_ENV).toBe("testing");
  });

  describe("getAll", () => {
    test("returns all products", async () => {
      const products = await Product.getAll();
      expect(products).toHaveLength(5);
    });
    test("returns proper shape", async () => {
      const products = await Product.getAll();
      const product = products.find((cur) => cur.product_id == 1);
      const expected = {
        product_id: 1,
        name: "Eggs",
        price_usd: 5.99,
        description: "12 per pack",
        seller: {
          user_id: 1,
          username: "bmenz",
        },
        img: "https://solidstarts.com/wp-content/uploads/when-can-babies-eat-eggs-480x320@2x.webp",
        category: "Animal Products",
      };
      expect(product).toEqual(expected);
    });
  });
});
