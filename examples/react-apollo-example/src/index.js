import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import ErrorBoundary from "./ErrorBoundary";

const client = new ApolloClient({
  link: new HttpLink({ uri: "http://snowtooth.herokuapp.com/graphql" }),
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ErrorBoundary>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </ErrorBoundary>,
  document.getElementById("root")
);
