const graphqlHttp = require("express-graphql");
const express = require("express");
const app = express();

const schema = require("./schema");

const PORT = 5000;

const initializedGraphQLMiddleware = graphqlHttp({
  // GraphQL’s data schema
  schema: schema,
  // Pretty Print the JSON response
  pretty: true,
  // Enable GraphiQL dev tool
  graphiql: true
});

app.use(initializedGraphQLMiddleware);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
