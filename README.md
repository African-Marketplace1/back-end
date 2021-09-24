## Scripts

- **start**: Runs the app in production.
- **server**: Runs the app in development.
- **migrate**: Migrates the local development database to the latest.
- **rollback**: Rolls back migrations in the local development database.
- **seed**: Truncates all tables in the local development database, feel free to add more seed files.
- **test**: Runs tests.
- **deploy**: Deploys the main branch to Heroku.

## Database Design

This project uses a relational database created with PostgreSQL 13 and Knex as a SQL query builder.

There are 3 tables in total

Users

| user_id | username |          password          |      email      |           img            |        location |
| :------ | :------: | :------------------------: | :-------------: | :----------------------: | --------------: |
| 1       |  bmenz   | sdfhljk4.sd;fkjh34r.sdjfh3 | bmenz@gmail.com | http://www.aws.com/img/2 |   123 test lane |
| 2       | ab_caloo |  034fhad.sf23-982.sdjkh23  |  ab@gmail.com   | http://www.aws.com/img/3 | 123 tulip court |
| 3       | lulu_app |  asdf023/.asdf2.-sf23409   | lulu@gmail.com  | http://www.aws.com/img/4 |  456 abc street |

Products

| product_id |    name     | price_usd | description  | seller |           img            | category |
| :--------- | :---------: | :-------: | :----------: | :----: | :----------------------: | -------: |
| 1          |    Eggs     |   5.99    | 12 per pack  |   1    | http://www.aws.com/img/a |        1 |
| 2          |   Apples    |   7.99    |  8 per pack  |   1    | http://www.aws.com/img/b |        4 |
| 3          | Black Beans |   5.99    | 500g per bag |   2    | http://www.aws.com/img/c |        2 |

Categories
|category_id|name|
|:--|--:|
|1|Animal Products|
|2| Beans|
|3|Cereals|
|4|Fruits|

## Endpoints:

```
[GET] /users
returns all users

response body:

[
    {
        "user_id": 1,
        "username": "bmenz",
        "password": "$2a$08$OXPqSoO9Mr3E9tCF0iJg3uyPWYRBZTxkYj64blWRiASFJfauQBqpm",
        "email": "bmenz@gmail.com",
        "img": "https://images.pexels.com/photos/3785991/pexels-photo-3785991.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        "location": "529W+7X Harare, Zimbabwe",
        "products": [
            {
                "product_id": 1,
                "name": "Eggs",
                "price_usd": 5.99,
                "description": "12 per pack",
                "seller": 1,
                "img": "https://solidstarts.com/wp-content/uploads/when-can-babies-eat-eggs-480x320@2x.webp",
                "category_name": "Animal Products"
            },
            {
                "product_id": 2,
                "name": "Avocado",
                "price_usd": 2.99,
                "description": "1 avocado per purchase",
                "seller": 1,
                "img": "https://www.washingtonian.com/wp-content/uploads/2020/02/iStock-1027572462-scaled-2048x1695.jpg",
                "category_name": "Fruits"
            },
            {
                "product_id": 3,
                "name": "Beans Rosecoco",
                "price_usd": 6.5,
                "description": "2 lbs per bag",
                "seller": 1,
                "img": "https://assets.sainsburys-groceries.co.uk/gol/7693115/1/640x640.jpg",
                "category_name": "Beans"
            }
        ]
    },
    {
        "user_id": 2,
        "username": "ab_caloo",
        "password": "$2a$08$Mqr3Ogd9uVFcvlvspW6kpuyG19CZnKxUPnL4TLQlVIBTGx4S6JVBy",
        "email": "ab@gmail.com",
        "img": "https://images.pexels.com/photos/6194365/pexels-photo-6194365.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        "location": "567M+V8 Luanda, Angola",
        "products": [
            {
                "product_id": 4,
                "name": "Milk",
                "price_usd": 4.99,
                "description": "500 ml per bottle",
                "seller": 2,
                "img": "https://images.pexels.com/photos/7573152/pexels-photo-7573152.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
                "category_name": "Animal Products"
            },
            {
                "product_id": 5,
                "name": "Limes",
                "price_usd": 5.99,
                "description": "2 Limes per purchase",
                "seller": 2,
                "img": "https://crownmarketonline.com/wp-content/uploads/2020/05/Limes.jpg",
                "category_name": "Fruits"
            }
        ]
    },
    {
        "user_id": 3,
        "username": "hfgool",
        "password": "$2a$08$ksTz5iiI5xf2sYjNWWKrV.2VLDAWg3rnRmv.IshLe4.NjDV1wipXe",
        "email": "gool@gmail.com",
        "img": "https://images.pexels.com/photos/5082976/pexels-photo-5082976.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        "location": "8HQ8+XQ Swakopmund, Namibia",
        "products": []
    }
]
```

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

```
[DELETE] /users/:id ('id' is a user_id)

response body :

{
    "message": "user with id 2 successfully deleted"
}
```
