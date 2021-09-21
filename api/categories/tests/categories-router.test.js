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

describe("categories-router", () => {
  describe("[GET] /categories", () => {
    test("returns all the categories", async () => {
      const res = await request(server).get("/categories");
      expect(res.body).toHaveLength(8);
    });
    test("returns the correct shape", async () => {
      const res = await request(server).get("/categories");
      const expected = [
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
      expect(res.body).toEqual(expected);
    });
    test("returns a status 200", async () => {
      const res = await request(server).get("/categories");
      expect(res.status).toBe(200);
    });
  });

  describe("[GET] /categories/:id", () => {
    test("returns a status 200", async () => {
      const res = await request(server).get("/categories/1");
      expect(res.status).toBe(200);
    });
    test("returns 404 on invalid id", async () => {
      const res = await request(server).get("/categories/99");
      expect(res.status).toBe(404);
    });
    test("returns the proper shape", async () => {
      const res = await request(server).get("/categories/1");
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
      expect(res.body).toEqual(expected);
    });
  });
});
