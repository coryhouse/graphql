# Wrap Your REST API with GraphQL

This project shows how to wrap an existing REST API with GraphQL.

## How's this work?

1.  This project contains a REST API created via [json-server](https://github.com/typicode/json-server). It serves fake data generated via [faker.js](https://github.com/Marak/faker.js).
2.  The REST API is wrapped with GraphQL, which is hosted via [Express](https://expressjs.com). GraphQL is integrated with Express via [express-graphql](https://github.com/graphql/express-graphql) middleware.
3.  The express-graphql middleware includes [GraphiQL](https://github.com/graphql/graphiql), a web-based tool for composing and running GraphQL queries.

## Quick Start

1.  Install dependencies:

```
npm install
```

2.  Start the mock API server and GraphQL server:

```
npm start
```

3.  Open http://localhost:5000 and you'll see GraphiQL.

4.  Run this sample query in GraphiQL. GraphQL will parse your query and make the relevant calls to the REST API behind the scenes. Review schema.js for the GraphQL integration.

```
{
  posts(page: "2") {
    title
    author {
      lastName
      company {
        companyDescription
      }
    }
  }
}
```

## Credit

This demo is a fork of [Eric Baer's GraphQL For The Rest of Us](https://github.com/baer/graphql-demo-graphql-for-the-rest-of-us).
