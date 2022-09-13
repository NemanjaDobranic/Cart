import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import App from "./App";

const client = new ApolloClient({ uri: "http://localhost:4000/" });

ReactDOM.render(
  <React.Fragment>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.Fragment>,
  document.getElementById("root")
);
