const User = require("./users-model");
const db = require("../data/db-config");

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
  describe("getById", () => {
    it("returns an object with username, password", async () => {
      const response = await User.getById(1);
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
        img: null,
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
      const actual = await User.getById(2);
      expect(actual).toEqual(expected);
    });
  });
});
