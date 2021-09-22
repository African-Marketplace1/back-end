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
  describe("getSellerId", () => {
    test("returns a seller id when inputting product id", async () => {
      const response = await Product.getSellerId(2);
      expect(response).toBe(1);
    });
  });

  describe("updateProduct", () => {
    test("updates name, price_usd, description, img, and category", async () => {
      const changes = {
        name: "test",
        price_usd: 11.99,
        description: "test",
        img: "test",
        category: 8,
      };
      await Product.updateProduct(1, changes);
      const product = await db("products").where("product_id", 1).first();
      expect(product.name).toBe("test");
      expect(product.price_usd).toBe(11.99);
      expect(product.description).toBe("test");
      expect(product.img).toBe("test");
      expect(product.category).toBe(8);
    });
    test("returns all the products for that seller", async () => {
      const changes = {
        name: "test",
        price_usd: 11.99,
        description: "test",
        img: "test",
        category: 8,
      };
      const response = await Product.updateProduct(1, changes);
      expect(response).toHaveLength(3);
      expect(response[0].seller).toBe(1);
      expect(response[1].seller).toBe(1);
      expect(response[2].seller).toBe(1);
    });
  });
});
