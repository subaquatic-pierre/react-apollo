import React from "react";
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { BrowserRouter as Router } from "react-router-dom";
import { Layout } from "./components/Layout";
import { BaseRouter } from "./routes";
import "./styles/index.scss";

const devEnv = process.env.REACT_APP_DEV_ENV;
let uri;

if (devEnv === "True") {
  uri = "http://localhost:8000/graphql";
} else {
  uri = process.env.REACT_APP_URI;
}

const httpLink = new HttpLink({
  uri: uri,
  credentials: "include",
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Layout>
          <BaseRouter />
        </Layout>
      </Router>
    </ApolloProvider>
  );
};
