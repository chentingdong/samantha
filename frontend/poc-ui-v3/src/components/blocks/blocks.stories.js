import React from "react";
import { RequestCatalogList } from "./RequestCatalogList";
import { ApolloProvider } from "@apollo/client";
import blockStories from "../../../data/storybook-blocks.json";
import { getClient } from "../../index";

export default {
  title: "Blocks",
};

const client = getClient();

export const RequestCatalog = () => {
  return (
    <ApolloProvider client={client}>
      <RequestCatalogList />
    </ApolloProvider>
  );
};
