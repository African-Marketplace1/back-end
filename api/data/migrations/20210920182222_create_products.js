exports.up = async (knex) => {
  await knex.schema.createTable("products", (products) => {
    products.increments("product_id");
    products.string("name", 200).notNullable();
    products.float("price_usd", 200).notNullable();
    products.string("description", 200).notNullable();
    products
      .integer("seller")
      .unsigned()
      .notNullable()
      .references("user_id")
      .inTable("users")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    products.string("img");
    products
      .integer("category")
      .unsigned()
      .notNullable()
      .references("category_id")
      .inTable("categories")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists("products");
};
