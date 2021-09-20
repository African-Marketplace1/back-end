exports.up = async (knex) => {
  await knex.schema.createTable("categories", (category) => {
    category.increments("category_id");
    category.string("category_name", 200).unique().notNullable();
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists("categories");
};
