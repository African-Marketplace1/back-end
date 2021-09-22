const request = require("supertest");
const server = require("../../server");
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

describe("products-router", () => {
  describe("[GET] /products", () => {
    test("returns a list of all products", async () => {
      const res = await request(server).get("/products");
      expect(res.body).toHaveLength(5);
    });
    test("returns status 500", async () => {
      const res = await request(server).get("/products");
      expect(res.status).toBe(200);
    });
  });

  describe("[PUT] /products/:id", () => {
    test("returns all sellers products with updated product", async () => {
      const changes = {
        name: "test",
        description: "test",
        price_usd: 9.99,
        category: "Fruits",
      };
      const response = await request(server).put("/products/1").send(changes);
      const expected = [
        {
          product_id: 2,
          name: "Avocado",
          price_usd: 2.99,
          description: "1 avocado per purchase",
          seller: 1,
          img: "https://www.washingtonian.com/wp-content/uploads/2020/02/iStock-1027572462-scaled-2048x1695.jpg",
          category: 4,
        },
        {
          product_id: 3,
          name: "Beans Rosecoco",
          price_usd: 6.5,
          description: "2 lbs per bag",
          seller: 1,
          img: "https://assets.sainsburys-groceries.co.uk/gol/7693115/1/640x640.jpg",
          category: 2,
        },
        {
          product_id: 1,
          name: "test",
          price_usd: 9.99,
          description: "test",
          seller: 1,
          img: "https://solidstarts.com/wp-content/uploads/when-can-babies-eat-eggs-480x320@2x.webp",
          category: 4,
        },
      ];
      expect(response.body).toEqual(expected);
    });
    test("returns 400 on invalid category", async () => {
      const changes = {
        name: "test",
        description: "test",
        price_usd: 9.99,
        category: "invalid",
      };
      const response = await request(server).put("/products/1").send(changes);
      expect(response.status).toBe(400);
    });
    test("returns 404 invalid product id", async () => {
      const changes = {
        name: "test",
        description: "test",
        price_usd: 9.99,
        category: "Fruits",
      };
      const response = await request(server).put("/products/99").send(changes);
      expect(response.status).toBe(404);
    });
  });
});
