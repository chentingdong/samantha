import React from "react";
import { RequestCatalogList } from "./RequestCatalogList";
import { ApolloProvider } from '@apollo/react-hooks';
import blockStories from "../../../data/storybook-blocks.json";
import ApolloClient from 'apollo-boost';
import { getClient } from "../../index";

export default {
  title: "Blocks",
};

const client = getClient();

export const RequestCatalog = () => {
  return (
    <ApolloProvider client={client}> 
      <RequestCatalogList/>
    </ApolloProvider>
  )
}