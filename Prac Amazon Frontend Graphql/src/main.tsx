// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import "./index.css";
// import App from "./App.tsx";
// import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
// const client = new ApolloClient({
//   uri: "http://localhost:3001/graphql",
//   cache: new InMemoryCache(),
//   credentials: 'include',
// });

// createRoot(document.getElementById("root")!).render(
//   <StrictMode>
//     <ApolloProvider client={client}>
//       <App />
//     </ApolloProvider>
//   </StrictMode>
// );


import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  split,
  HttpLink,
} from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";

const httpLink = new HttpLink({
  uri: "http://localhost:3001/graphql",
  credentials: "include", // for cookie-based auth
});

const client = new ApolloClient({
  link:httpLink,
  cache: new InMemoryCache(),
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StrictMode>
);