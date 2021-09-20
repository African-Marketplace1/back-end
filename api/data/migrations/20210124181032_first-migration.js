exports.up = async (knex) => {
  await knex.schema
      .createTable('users', (users) => {
        users.increments('user_id')
        users.string('username', 200).unique().notNullable()
        users.string('password', 200).notNullable()
        users.string('email').notNullable()
        users.string('img')
        users.string('location')
      })

}

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('users')
}
