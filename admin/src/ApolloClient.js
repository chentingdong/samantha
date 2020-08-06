import { HttpLink } from "apollo-client-preset";
import buildApolloClient from "./ra-data-graphql/buildApolloClient";

const link = new HttpLink({
  uri: `${window.location.protocol}//${window.location.hostname}:8080/v1/graphql`,
  headers: {
    "x-hasura-admin-secret": "qcA.wmEfFzDpfzZZoepJs7gw",
  },
});

const apolloClient = buildApolloClient({ link });

export default apolloClient;
