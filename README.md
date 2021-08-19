# TB News API

## Overview

The aim of this project was to build a REST API that would imitate a functional forum backend, similar to Reddit.

Using a PSQL databse, the project stores information related to topics, articles and article comments and allows for updating this information. This API provides information for the frontend News project.

[View hosted API here](https://nc-news-tb20.herokuapp.com/api)

## Setup

1. **Fork** this repo

2. **Clone** repo to machine
   `git clone https://github.com/TeeBee20/TB-News.git`

3. **Install** dependencies

   `npm install`

4. Setup environment
   Create a **.env.development** file
   Add `PGDATABASE=nc_news`

   Create a **.env.test** file
   Add `PGDATABASE=nc_news_test`

5. Create the DB
   `npm run setup-dbs`

6. Seed the DB
   `npm run seed`
   If error: visit `api/seed` endpoint in API

## Testing

### Endpoints

    npm test app

### DB Seeding Utility Functions

    npm test utils

## Requirements

    Node.js v16.3.0
    Postgres v13.3
