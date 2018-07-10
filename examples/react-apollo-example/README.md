# React Apollo Example

Example of using React and Apollo together to query a GraphQL endpoint. This application displays information about dogs.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Quick Start

```
npm install
npm start
```

## How this was created

1.  `npx create-react-app react-apollo-example`
1.  `npm install apollo-boost react-apollo graphql-tag graphql`
1.  Instantiate an `ApolloClient`, and wrap the root component in `ApolloProvider`.
1.  Query the endpoint using `Query` from `react-apollo`.
