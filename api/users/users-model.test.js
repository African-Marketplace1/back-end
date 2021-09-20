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
});
