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
});
