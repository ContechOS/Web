import { createHttpLink, InMemoryCache, ApolloClient } from "@apollo/client";

const link = createHttpLink({
  uri: "http://localhost:3000/graphql",
});

const cache = new InMemoryCache();

export const apolloClient = new ApolloClient({ link, cache });
