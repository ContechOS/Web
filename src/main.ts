import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

/* APOLLO */

import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client/core";

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: "http://localhost:3000/graphql",
});

// Cache implementation
const cache = new InMemoryCache();

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
});

import { createApolloProvider } from "@vue/apollo-option";

const apolloProvider = createApolloProvider({
  defaultClient: apolloClient,
});

/* APOLLO */

const app = createApp(App).use(store).use(router);
app.use(apolloProvider);
app.mount("#app");
