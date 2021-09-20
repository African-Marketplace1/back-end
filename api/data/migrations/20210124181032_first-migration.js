exports.up = async (knex) => {
  await knex.schema
  .createTable('users', (users) => {
    users.increments('user_id')
    users.string('username', 200).unique().notNullable()
    users.string('password', 200).notNullable()
    users.string('email').notNullable()
    users.string('img').notNullable()
    users.string('location')
  })
  .createTable('categories', (category) =>{
    category.increments('category_id')
    category.string('name', 200).unique().notNullable()
  })
  .createTable('products', (products) => {
    products.increments('product_id')
    products.string('name', 200).unique().notNullable()
    products.float('price_usd', 200).notNullable()
    products.string('description', 200).notNullable()
    products.integer('seller')
    .unsigned()
    .notNullable()
    .references('user_id')
    .inTable('users')
    .onUpdate('RESTRICT')
    .onDelete('RESTRICT')
    products.string('img')
    products.integer('category')
    .unsigned()
    .notNullable()
    .references('category_id')
    .inTable('categories')
    .onUpdate('RESTRICT')
    .onDelete('RESTRICT')
})
}

exports.down = async (knex) => {
  await knex.schema
  .dropTableIfExists('products')
  .dropTableIfExists('categories')
  .dropTableIfExists('users')
}
