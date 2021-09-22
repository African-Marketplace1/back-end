const User = require("../users-model");
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
  describe("getUserById", () => {
    it("returns an object with username, password", async () => {
      const response = await User.getUserById(1);
      const username = response.username;
      expect(username).toBe("bmenz");
      expect(response).toHaveProperty("username");
      expect(response).toHaveProperty("password");
    });
    it("Returns correct shape", async () => {
      const expected = {
        user_id: 2,
        username: "ab_caloo",
        password: "abc456",
        email: "ab@gmail.com",
        img: "https://images.pexels.com/photos/6194365/pexels-photo-6194365.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
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
      const actual = await User.getUserById(2);
      expect(actual).toHaveProperty("user_id");
      expect(actual).toHaveProperty("username");
      expect(actual).toHaveProperty("password");
      expect(actual).toHaveProperty("email");
      expect(actual).toHaveProperty("img");
      expect(actual).toHaveProperty("location");
      expect(actual).toHaveProperty("products");
      expect(actual.products).toHaveLength(2);
    });
  });
  describe("getUserBy", () => {
    test("returns correct properties when searching by username", async () => {
      const response = await User.getUserBy({ username: "bmenz" });
      expect(response).toHaveProperty("username");
      expect(response).toHaveProperty("password");
      expect(response).toHaveProperty("email");
      expect(response).toHaveProperty("location");
    });
    test("returns correct properties when searching by email", async () => {
      const response = await User.getUserBy({ email: "ab@gmail.com" });
      expect(response).toHaveProperty("username");
      expect(response).toHaveProperty("password");
      expect(response).toHaveProperty("email");
      expect(response).toHaveProperty("location");
    });
    test("does not return a user on incorrect username", async () => {
      const response = await User.getUserBy({ username: "fakeUser" });
      expect(response).toBeFalsy();
    });
  });

  describe("addUser", () => {
    test("adds a new user with username, password, and email", async () => {
      const newUser = {
        username: "user",
        password: "pass",
        email: "user@test.com",
      };
      await User.addUser(newUser);
      const users = await db("users");
      expect(users).toHaveLength(4);
    });
    test("returns the new user", async () => {
      const expected = {
        user_id: 4,
        username: "test",
        password: "test",
        email: "test@test.com",
        location: "123 tulip lane",
        img: null,
      };
      const newUser = {
        username: "test",
        password: "test",
        email: "test@test.com",
        location: "123 tulip lane",
      };
      const response = await User.addUser(newUser);
      expect(response).toEqual(expected);
    });
  });
  describe("addProduct", () => {
    test("adds a new product", async () => {
      const newProduct = {
        name: "banana",
        price_usd: 1.0,
        description: "good",
      };
      await User.addProduct(1, 2, newProduct);
      const products = await db("products");
      expect(products).toHaveLength(6);
    });
    test("returns all the sellers products", async () => {
      const expected = [
        {
          product_id: 1,
          name: "Eggs",
          price_usd: 5.99,
          description: "12 per pack",
          seller: 1,
          img: "https://solidstarts.com/wp-content/uploads/when-can-babies-eat-eggs-480x320@2x.webp",
          category: 1,
        },
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
          product_id: 6,
          name: "banana",
          price_usd: 1,
          description: "good",
          seller: 1,
          img: null,
          category: 4,
        },
      ];
      const newProduct = {
        name: "banana",
        price_usd: 1.0,
        description: "good",
      };
      const response = await User.addProduct(1, 4, newProduct);
      expect(response).toEqual(expected);
    });
  });
  describe("getCategoryByName", () => {
    test("returns category id when inputting its name (Fruits)", async () => {
      const response = await User.getCategoryByName("Fruits");
      expect(response).toBe(4);
    });
    test("returns category id when inputting its name (Animal Products)", async () => {
      const response = await User.getCategoryByName("Animal Products");
      expect(response).toBe(1);
    });
  });
  describe("updateUser", () => {
    test("updates username, img, and location", async () => {
      const changes = {
        username: "test",
        img: "testImg",
        location: "123 test lane",
      };
      await User.updateUser(1, changes);
      const user = await db("users").where("user_id", 1).first();
      expect(user.username).toBe("test");
      expect(user.img).toBe("testImg");
      expect(user.location).toBe("123 test lane");
    });
    test("returns updated user", async () => {
      const changes = {
        username: "test",
        img: "testImg",
        location: "123 test lane",
      };
      const res = await User.updateUser(1, changes);

      expect(res).toHaveProperty("user_id");
      expect(res).toHaveProperty("username");
      expect(res).toHaveProperty("password");
      expect(res).toHaveProperty("email");
      expect(res).toHaveProperty("img");
      expect(res).toHaveProperty("location");
      expect(res).toHaveProperty("products");
      expect(res.products).toHaveLength(3);
    });
  });

  describe("removeUser", () => {
    test("removes a user", async () => {
      await User.removeUser(1);
      const users = await db("users");
      const products = await db("products");
      expect(users).toHaveLength(2);
      expect(products).toHaveLength(2);
    });
  });
});
