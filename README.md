```
[GET] /users/:id

returns a specific user

response body:

{
 user_id: 1,
 username: 'bmenz',
 password: 'asdf234.asdf3048.adsh23r4',
 email: 'bmenz@gmail.com',
 img: 'www.aws.com/img/1',
 location: '529W+7X Harare, Zimbabwe'
 products: [
  {
  product_id: 3,
  name: 'Beans Rosecoco',
  price_usd: 6.50,
  description: '2lbs per bag',
  img: 'www.aws.com/img/b',
  category: 'Beans'
  },
  {
  product_id: 10,
  name: 'Limes',
  price_usd: 5.99,
  description: '2 limes per purchase',
  img: 'www.aws.com/img/j',
  category: 'Fruits'
  },
 ]
}
```

```
[GET] /categories

returns all categories

response body:

[
{category_id: 1, name: 'Animal Products', img: "www.aws.com/234"},
{category_id: 2, name: 'Beans', img: "www.aws.com/sdf4"},
{category_id: 3, name: 'Cereals', img: "www.aws.com/2d34"},
{category_id: 4, name: 'Fruits', img: "www.aws.com/23af4"},
...
]
```

```
[GET] /categories/:id

returns products from a specific category
(id refers to a category id)

response body:

{
category_id: 1,
name: 'Animal Products',
products: [
 {
  product_id: 1,
  name: 'Eggs',
  price_usd: 5.99,
  description: '12 per pack',
  img: 'www.aws.com/img/a',
  seller:
  {
   user_id: 1,
   username: 'bmenz'
  }
 },
  {
  product_id: 2,
  name: 'Milk',
  price_usd: 4.99,
  description: '500ml per bottle',
  img: 'www.aws.com/img/b',
  seller:
  {
   user_id: 2,
   username: 'ab_caloo'
  }
 },
 ]
}
```

```
[GET} /products

returns all products

response body:
[
 {
  product_id: 1,
  name: 'Eggs',
  price_usd: 5.99,
  description: '12 per pack',
  img: 'www.aws.com/img/a',
  category: 'Animal Products'
  seller:
  {
   user_id: 1,
   username: 'bmenz'
  }
 },
  {
  product_id: 2,
  name: 'Milk',
  price_usd: 4.99,
  description: '500ml per bottle',
  img: 'www.aws.com/img/b',
  category: 'Animal Products'
  seller:
  {
   user_id: 2,
   username: 'ab_caloo'
  }
 },
 ]
```

```
[POST] /users/register (creating a new user)

request body:

{
    "username":"bobby",
    "password":"abc123",
    "email": "bobby@gmail.com",
    "location": "123 cherry hill, Cairo, Egypt, 101010" // optional
}

response body:

{
    "user_id": 13,
    "username": "bobby",
    "password": "$2a$08$AefzhAN1hBKixERUZ.7dz.5/EDji.MTKJbXkMgWSZSnswHpOJGDzu", //password is hashed for security measures
    "email": "bobby@gmail.com",
    "img": null,
    "location": "123 cherry hill, Cairo, Egypt, 101010"
}
```

```
[POST] /users/:id (adding a new product)

request body:

{
 name: 'banana',
 price_usd: 1.99,
 description: 'tasty yummy yummy',
 category: 'Fruits' //should come from a select menu
 img: 'http://website.com/img' //optional
}

response body:

(returns all the products for the user, including the new product)

[
    {
        "product_id": 4,
        "name": "Milk",
        "price_usd": 4.99,
        "description": "500 ml per bottle",
        "seller": 2,
        "img": "https://images.pexels.com/photos/7573152/pexels-photo-7573152.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
        "category": 1
    },
    {
        "product_id": 5,
        "name": "Limes",
        "price_usd": 5.99,
        "description": "2 Limes per purchase",
        "seller": 2,
        "img": "https://crownmarketonline.com/wp-content/uploads/2020/05/Limes.jpg",
        "category": 4
    },
    {
        "product_id": 6,
        "name": "banana",
        "price_usd": 1.99,
        "description": "tasty yummy yummy",
        "seller": 2,
        "img": "http://website.com/img",
        "category": 4
    },
    {
        "product_id": 7,
        "name": "banana",
        "price_usd": 1.99,
        "description": "tasty yummy yummy",
        "seller": 2,
        "img": "http://website.com/img",
        "category": 4
    }
]
```

```
[POST] /users/login (for logging in)

request body:

{
    "username":"bobby",
    "password":"abc123"
}

response body:

{
    "message": "Welcome back bobby",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxMywidXNlcm5hbWUiOiJib2JieSIsImlhdCI6MTYzMjE3NDIxNSwiZXhwIjoxNjMyMzQ3MDE1fQ.jlxHw6gO2NJqv__DiLMPYbD4zA_XqcMVw6-ro2KDS2o",
    "user": {
        "user_id": 13,
        "username": "bobby",
        "password": "$2a$08$AefzhAN1hBKixERUZ.7dz.5/EDji.MTKJbXkMgWSZSnswHpOJGDzu",
        "email": "bobby@gmail.com",
        "img": null,
        "location": "123 cherry hill, Cairo, Egypt, 101010"
    }
}
```

```
[PUT] /products/:id ('id' is referencing the product id)

request body: (all properties in the request body are optional)

{
    name: 'changedName',
    description: 'changedDescription',
    category: 'Vegetables'
}

response body: (returns all products for the specific seller)

[
    {
        "product_id": 2,
        "name": "Avocado",
        "price_usd": 2.99,
        "description": "1 avocado per purchase",
        "seller": 1,
        "img": "https://www.washingtonian.com/wp-content/uploads/2020/02/iStock-1027572462-scaled-2048x1695.jpg",
        "category": 4
    },
    {
        "product_id": 3,
        "name": "Beans Rosecoco",
        "price_usd": 6.5,
        "description": "2 lbs per bag",
        "seller": 1,
        "img": "https://assets.sainsburys-groceries.co.uk/gol/7693115/1/640x640.jpg",
        "category": 2
    },
    {
        "product_id": 1,
        "name": "changedName",
        "price_usd": 9.99,
        "description": "changedDescription",
        "seller": 1,
        "img": "https://solidstarts.com/wp-content/uploads/when-can-babies-eat-eggs-480x320@2x.webp",
        "category": 8
    }
]
```

```
[DELETE] /products/:id ('id' is the product_id)

response body:

(returns the sellers remaining products)

[
    {
        "product_id": 2,
        "name": "Avocado",
        "price_usd": 2.99,
        "description": "1 avocado per purchase",
        "seller": 1,
        "img": "https://www.washingtonian.com/wp-content/uploads/2020/02/iStock-1027572462-scaled-2048x1695.jpg",
        "category": 4
    },
    {
        "product_id": 3,
        "name": "Beans Rosecoco",
        "price_usd": 6.5,
        "description": "2 lbs per bag",
        "seller": 1,
        "img": "https://assets.sainsburys-groceries.co.uk/gol/7693115/1/640x640.jpg",
        "category": 2
    }
]
```

```
[PUT] /users/:id ('id' is the user_id)

request body (all properties are optional):

{
   username: "test",
   email: "test",
   img: "test"
}

response body :

{
    "user_id": 2,
    "username": "test",
    "password": "abc456",
    "email": "test",
    "img": "test",
    "location": "567M+V8 Luanda, Angola",
    "products": [
        {
            "product_id": 4,
            "name": "Milk",
            "price_usd": 4.99,
            "description": "500 ml per bottle",
            "img": "https://images.pexels.com/photos/7573152/pexels-photo-7573152.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
            "category_name": "Animal Products"
        },
        {
            "product_id": 5,
            "name": "Limes",
            "price_usd": 5.99,
            "description": "2 Limes per purchase",
            "img": "https://crownmarketonline.com/wp-content/uploads/2020/05/Limes.jpg",
            "category_name": "Fruits"
        }
    ]
}
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
