const cors = require('cors');
const graphqlHttp = require("express-graphql");
const schema = require("./schema.js");

const app = require("express")();
const PORT = 5000;

app.use(cors());

app.use(graphqlHttp({
  schema,
  // Pretty Print the JSON response
  pretty: true,
  // Enable GraphiQL dev tool
  graphiql: true
}));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
