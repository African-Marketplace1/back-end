 ```
 [GET] /users/:id
 
response body will be:

  {
    user_id: "1",
    username: "bmenz",
    password: "alksdhfpaiweihasd",
    email: "bmenz@gmail.com",
    img: "www.aws.com/img/1",
    products: [
      {
        product_id: 1,
        name: "Eggs",
        price_usd: 5.99,
        quantity: 12,
        description: "12 per pack",
        img: "www.aws.com/img/a",
        category: "Animal Products",
      },
      {
        product_id: 9,
        name: "Avocado",
        price_usd: 2.99,
        quantity: 31,
        description: "1 avocado per purchase",
        img: "www.aws.com/img/i",
        category: "Fruits",
      },
      {
        product_id: 10,
        name: "Limes",
        price_usd: 5.99,
        quantity: 12,
        description: "2 limes per purchase",
        img: "www.aws.com/img/j",
        category: "Fruits",
      },
      {
        product_id: 16,
        name: "Spring Onions",
        price_usd: 7.99,
        quantity: 18,
        description: "4 onions per bag",
        img: "www.aws.com/img/p",
        category: "Vegetables",
      },
    ],
    orders_placed: [
      {
        order_id: 2,
        status: "completed",
        date: "2021-09-18 12:30:40.138888-01",
        shipping_method: "standard",
        deliveryAddress: {
          firstName: "Brian",
          lastName: "Menz",
          address: "18 coney street",
          city: "Laplanga",
          country: "Morrocco",
          zip: "07712",
        },
        products: [
          {
            product_id: 2,
            name: "Milk",
            price_usd: 4.99,
            quantity: 1,
            seller: "ab_caloo",
          },
          {
            product_id: 12,
            name: "Pidgeon Peas",
            price_usd: 5.99,
            quantity: 12,
            seller: "lulu_app",
          },
          {
            product_id: 13,
            name: "Cassava Chips",
            price_usd: 5.99,
            quantity: 12,
            seller: "lulu_app",
          },
        ],
      },
    ],
    sales: [
      {
        order_id: 1,
        shipping_method: "standard",
        buyer: {
          username: "hfgool",
          email: "gool@gmail.com",
          firstName: "Bob",
          lastName: "Saget",
          address: "151 Washington Road",
          city: "Robinsville",
          country: "United States",
          zip: "01234",
        },
        products: [
          {
            product_id: 16,
            product_name: "Spring Onions",
            quantity: 1,
          },
        ],
      },
    ],
  };

```

```
[GET] /users

response body:

Returns a collection of users. Each user has the same shape as /users/:id.

[{user1}, {user2}, {user3}... ]
```

```
[POST] /users

request body should be:

{
  username: 'abcdef',
  password: 'ghijkll,
  email: 'test@gmail.com'
}

response body will be:

{
  user_id: 6,
  username: 'abcdef,
  password: 'ghijkl,
  email: 'test@gmail.com'
}
```

```
[GET] /products

returns ALL products

response body will be:

[
  {
  product_id: 1, 
  name: 'Eggs', 
  price_usd: 5.99, 
  quantity: 12, 
  description: '12 per pack', 
  seller_id: 1, 
  username: 'bmenz', 
  img: 'www.aws.com/img/a', 
  category: 'Animal Product'
  },
  {
  product_id: 2, 
  name: 'Milk', 
  price_usd: 4.99, 
  quantity: 15, 
  description: '1L per bottle', 
  seller_id: 2, 
  username: 'ab_caloo', 
  img: 'www.aws.com/img/b', 
  category: 'Animal Product'
  },
  ...
]
```

```
[GET] /products/:id

returns all the products for a specific user
```

```
[POST] /products/:id

adds a new product to a specified user
```

```
[GET] /orders/:id 

returns all the orders that a user has made
```

```
[POST] /orders

creates a new order

request object should be shaped like this:

{
  buyer: {
    first_name: 'John',
    last_name: 'Wick,
    address: '12 laurel St.',
    city: 'New York City',
    country: 'United States',
    zip: '07747'
    },
  payment: {
    card_number: '1234123412341234',
    expiration: '2/24',
    CVV: '722'
  }
  products: [
    {product_id: 1, quantity_ordered: 1},
    {product_id: 4, quantity_ordered: 2}
    ]
}
```

```
[GET] /sales:id

returns all the sales that a user has made
```

# Build Week Scaffolding for Node and PostgreSQL

## Video Tutorial

The following tutorial explains how to set up this project using PostgreSQL and Heroku.

[![Setting up PostgreSQL for Build Week](https://img.youtube.com/vi/kTO_tf4L23I/maxresdefault.jpg)](https://www.youtube.com/watch?v=kTO_tf4L23I)

## Requirements

- [PostgreSQL, pgAdmin 4](https://www.postgresql.org/download/) and [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) installed in your local machine.
- A Heroku app with the [Heroku PostgreSQL Addon](https://devcenter.heroku.com/articles/heroku-postgresql#provisioning-heroku-postgres) added to it.
- Development and testing databases created with [pgAdmin 4](https://www.pgadmin.org/docs/pgadmin4/4.29/database_dialog.html).

## Starting a New Project

- Create a new repository using this template, and clone it to your local.
- Create a `.env` file and follow the instructions inside `knexfile.js`.
- Fix the scripts inside `package.json` to use your Heroku app.

## Scripts

- **start**: Runs the app in production.
- **server**: Runs the app in development.
- **migrate**: Migrates the local development database to the latest.
- **rollback**: Rolls back migrations in the local development database.
- **seed**: Truncates all tables in the local development database, feel free to add more seed files.
- **test**: Runs tests.
- **deploy**: Deploys the main branch to Heroku.

**The following scripts NEED TO BE EDITED before using: replace `YOUR_HEROKU_APP_NAME`**

- **migrateh**: Migrates the Heroku database to the latest.
- **rollbackh**: Rolls back migrations in the Heroku database.
- **databaseh**: Interact with the Heroku database from the command line using psql.
- **seedh**: Runs all seeds in the Heroku database.

## Hot Tips

- Figure out the connection to the database and deployment before writing any code.

- If you need to make changes to a migration file that has already been released to Heroku, follow this sequence:

  1. Roll back migrations in the Heroku database
  2. Deploy the latest code to Heroku
  3. Migrate the Heroku database to the latest

- If your frontend devs are clear on the shape of the data they need, you can quickly build provisional endpoints that return mock data. They shouldn't have to wait for you to build the entire backend.

- Keep your endpoints super lean: the bulk of the code belongs inside models and other middlewares.

- Validating and sanitizing client data using a library is much less work than doing it manually.

- Revealing crash messages to clients is a security risk, but during development it's helpful if your frontend devs are able to tell you what crashed.

- PostgreSQL comes with [fantastic built-in functions](https://hashrocket.com/blog/posts/faster-json-generation-with-postgresql) for hammering rows into whatever JSON shape.

- If you want to edit a migration that has already been released but don't want to lose all the data, make a new migration instead. This is a more realistic flow for production apps: prod databases are never migrated down. We can migrate Heroku down freely only because there's no valuable data from customers in it. In this sense, Heroku is acting more like a staging environment than production.

- If your fronted devs are interested in running the API locally, help them set up PostgreSQL & pgAdmin in their machines, and teach them how to run migrations in their local. This empowers them to (1) help you troubleshoot bugs, (2) obtain the latest code by simply doing `git pull` and (3) work with their own data, without it being wiped every time you roll back the Heroku db. Collaboration is more fun and direct, and you don't need to deploy as often.
