import React from "react";
import { RequestorSurface } from "./RequestorSurface";
import blockStories from "../../../data/storybook-blocks.json";
import { getClient } from "../../index";
import { ApolloProvider } from "@apollo/client";

export default {
  title: "Block",
};

const client = getClient();

export const RequestorSurfaceSingleView = () => {
  return (
    <ApolloProvider client={client}>
      <RequestorSurface blockId={2} />
    </ApolloProvider>
  );
};

export const RequestorSurfaceError = () => {
  return (
    <ApolloProvider client={client}>
      <RequestorSurface blockId={-1} />
    </ApolloProvider>
  );
};
