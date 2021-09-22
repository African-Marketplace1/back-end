const request = require("supertest");
const server = require("../../server");
const User = require("../users-model");
const db = require("../../data/db-config");
const bcrypt = require("bcryptjs");
const { response } = require("express");

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

describe("users-router", () => {
  it("is the correct testing environment", async () => {
    expect(process.env.NODE_ENV).toBe("testing");
  });
  describe("[GET] /users/:id", () => {
    test("returns a status 200 with valid id", async () => {
      const res = await request(server).get("/users/1");
      expect(res.status).toBe(200);
    });
    test("returns 404 on invalid id", async () => {
      const res = await request(server).get("/users/999");
      expect(res.status).toBe(404);
    });
    test("returns proper shape", async () => {
      const expected = {
        user_id: 1,
        username: "bmenz",
        password: "abc123",
        email: "bmenz@gmail.com",
        img: "https://images.pexels.com/photos/3785991/pexels-photo-3785991.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        location: "529W+7X Harare, Zimbabwe",
        products: [
          {
            product_id: 1,
            name: "Eggs",
            price_usd: 5.99,
            description: "12 per pack",
            img: "https://solidstarts.com/wp-content/uploads/when-can-babies-eat-eggs-480x320@2x.webp",
            category_name: "Animal Products",
          },
          {
            product_id: 2,
            name: "Avocado",
            price_usd: 2.99,
            description: "1 avocado per purchase",
            img: "https://www.washingtonian.com/wp-content/uploads/2020/02/iStock-1027572462-scaled-2048x1695.jpg",
            category_name: "Fruits",
          },
          {
            product_id: 3,
            name: "Beans Rosecoco",
            price_usd: 6.5,
            description: "2 lbs per bag",
            img: "https://assets.sainsburys-groceries.co.uk/gol/7693115/1/640x640.jpg",
            category_name: "Beans",
          },
        ],
      };
      const res = await request(server).get("/users/1");
      expect(res.body).toEqual(expected);
    });
  });
  describe("[POST] /users/register", () => {
    test("creates a new user ", async () => {
      const newUser = {
        username: "abcdef",
        password: "123456",
        email: "test@test.com",
      };
      await request(server).post("/users/register").send(newUser);
      const users = await db("users");
      expect(users).toHaveLength(4);
    });
    test("sends 201 on successful register", async () => {
      const newUser = {
        username: "abcdef",
        password: "123456",
        email: "test@test.com",
      };
      const res = await request(server).post("/users/register").send(newUser);
      expect(res.status).toBe(201);
    });
    test("returns 400 on no username", async () => {
      const newUser = {
        password: "123456",
        email: "test@test.com",
      };
      const res = await request(server).post("/users/register").send(newUser);
      expect(res.status).toBe(400);
    });
    test("returns 400 on no password", async () => {
      const newUser = {
        username: "abcdef",
        email: "test@test.com",
      };
      const res = await request(server).post("/users/register").send(newUser);
      expect(res.status).toBe(400);
    });
    test("returns 400 on no email", async () => {
      const newUser = {
        password: "123456",
        username: "abcdef",
      };
      const res = await request(server).post("/users/register").send(newUser);
      expect(res.status).toBe(400);
    });
    test("stores hashed password", async () => {
      const newUser = {
        username: "abcdef",
        password: "123456",
        email: "test@test.com",
      };
      const res = await request(server).post("/users/register").send(newUser);
      const comparison = bcrypt.compareSync(
        newUser.password,
        res.body.password
      );
      expect(comparison).toBe(true);
    });
  });
  describe("[POST] /users/login (register must work)", () => {
    beforeEach(async () => {
      const newUser = {
        username: "abcdef",
        password: "123456",
        email: "test@test.com",
      };
      await request(server).post("/users/register").send(newUser);
    });
    test("login returns 200 status", async () => {
      const user = {
        username: "abcdef",
        password: "123456",
      };
      const res = await request(server).post("/users/login").send(user);
      expect(res.status).toBe(200);
    });
    test("login returns token", async () => {
      const user = {
        username: "abcdef",
        password: "123456",
      };
      const res = await request(server).post("/users/login").send(user);
      expect(res.body).toHaveProperty("token");
      expect(res.body.token).toBeTruthy();
    });
    test("login returns user with correct properties", async () => {
      const user = {
        username: "abcdef",
        password: "123456",
      };
      const res = await request(server).post("/users/login").send(user);
      expect(res.body).toHaveProperty("user");
      expect(res.body.user.user_id).toBe(4);
      expect(res.body.user).toHaveProperty("username");
      expect(res.body.user).toHaveProperty("password");
      expect(res.body.user).toHaveProperty("email");
      expect(res.body.user).toHaveProperty("img");
      expect(res.body.user).toHaveProperty("location");
    });
    test("login returns 400 on missing username", async () => {
      const user = {
        password: "123456",
      };
      const res = await request(server).post("/users/login").send(user);
      expect(res.status).toBe(400);
    });
    test("login returns 400 on missing password", async () => {
      const user = {
        username: "abcdef",
      };
      const res = await request(server).post("/users/login").send(user);
      expect(res.status).toBe(400);
    });
    test("returns 400 on non-string username", async () => {
      const user = {
        username: "abcdef",
        password: 123456,
      };
      const res = await request(server).post("/users/login").send(user);
      expect(res.status).toBe(400);
    });
    test("successfully trims username and password", async () => {
      const user = {
        username: " abcdef  ",
        password: "    123456  ",
      };
      const res = await request(server).post("/users/login").send(user);
      expect(res.body.user.username).toBe("abcdef");
    });
    test("returns status 401 on invalid password", async () => {
      const user = {
        username: "abcdef",
        password: "invalid",
      };
      const res = await request(server).post("/users/login").send(user);
      expect(res.status).toBe(401);
    });
    test("returns status 401 in invalid username", async () => {
      const user = {
        username: "invalid",
        password: "invalid",
      };
      const res = await request(server).post("/users/login").send(user);
      expect(res.status).toBe(401);
    });
  });
  describe("[POST] /users/:id", () => {
    test("adds a new product", async () => {
      const newProduct = {
        name: "banana",
        price_usd: 1.0,
        description: "tasty banana",
        category: "Fruits",
      };
      await request(server).post("/users/1").send(newProduct);
      const products = await db("products").where("seller", 1);
      expect(products).toHaveLength(4);
    });
    test("returns all products for the user", async () => {
      const newProduct = {
        name: "banana",
        price_usd: 1.0,
        description: "tasty banana",
        category: "Fruits",
      };
      const res = await request(server).post("/users/1").send(newProduct);
      const products = await db("products").where("seller", 1);
      expect(res.body).toEqual(products);
    });
    test("returns status 400 on invalid category", async () => {
      const newProduct = {
        name: "banana",
        price_usd: 1.9,
        description: "tasty banana",
        category: "Invalid",
      };
      const res = await request(server).post("/users/1").send(newProduct);
      const products = await db("products").where("seller", 1);
      expect(products).toHaveLength(3);
      expect(res.status).toBe(400);
    });
  });
  describe("[PUT] /users/:id", () => {
    test("updates username, email, img", async () => {
      const changes = { username: "test", email: "test", img: "test" };
      await request(server).put("/users/1").send(changes);
      const user = await db("users").where("user_id", 1).first();
      expect(user.username).toBe("test");
      expect(user.email).toBe("test");
      expect(user.img).toBe("test");
    });
    test("returns the correct shape", async () => {
      const changes = { username: "test", email: "test", img: "test" };
      const response = await request(server).put("/users/2").send(changes);
      const expected = {
        user_id: 2,
        username: "test",
        password: "abc456",
        email: "test",
        img: "test",
        location: "567M+V8 Luanda, Angola",
        products: [
          {
            product_id: 4,
            name: "Milk",
            price_usd: 4.99,
            description: "500 ml per bottle",
            img: "https://images.pexels.com/photos/7573152/pexels-photo-7573152.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
            category_name: "Animal Products",
          },
          {
            product_id: 5,
            name: "Limes",
            price_usd: 5.99,
            description: "2 Limes per purchase",
            img: "https://crownmarketonline.com/wp-content/uploads/2020/05/Limes.jpg",
            category_name: "Fruits",
          },
        ],
      };
      expect(response.body).toEqual(expected);
    });
    test("returns 404 on invalid id", async () => {
      const changes = { username: "test", email: "test", img: "test" };
      const response = await request(server).put("/users/99").send(changes);
      expect(response.status).toBe(404);
    });
  });
});
