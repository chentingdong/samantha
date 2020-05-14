import React from "react";
import { RequestorSurface } from "./RequestorSurface";
import { getClient } from "../../index";
import { ApolloProvider } from "@apollo/client";
import { RequestCatalogItem } from "./RequestCatalogItem";
import { BlockCatalogItem } from "./BlockCatalogItem";
import { RequestsMadeItem } from "./RequestsMadeItem";
import { RequestsReceivedItem } from "./RequestsReceivedItem";

import blockStories from "../../../data/storybook-blocks.json";
const blockLevel2 = blockStories[0];
const blockLevel1 = blockLevel2.blocks[0];
const blockLeaf = blockLevel1.blocks[0];
const blockLevel0 = { ...blockLevel1, blocks: [] };

export default {
  title: "Block / RequestItem",
};

export const RequestCatalog = () => {
  return (
    <RequestCatalogItem block={blockLevel2} />
  );
};

export const BlockCatalog = () => {
  return (
    <BlockCatalogItem block={blockLevel2} />
  );
};

export const RequestsMade = () => {
  return (
    <RequestsMadeItem block={blockLevel2} />
  );
};

export const RequestsReceived = () => {
  return (
    <RequestsReceivedItem block={blockLevel2} />
  );
};