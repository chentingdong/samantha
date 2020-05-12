import React from "react";
import { BlockCard } from "./block-card";
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";
import { withKnobs } from "@storybook/addon-knobs";

export default {
  title: "Block",
  component: BlockCard,
  decorators: [withKnobs],
};

const blockLevel2 = {
  id: "1",
  name: "default request, parallel block container",
  description: "empty request wrapper",
  type: "parallelStages",
  state: "pending",
  requester: "",
  responders: [],
  blocks: [
    {
      id: "1",
      name: "default request, parallel block container",
      description: "empty request wrapper",
      type: "parallelStages",
      state: "pending",
      requester: "",
      responders: [],
      blocks: [
        {
          id: "leaf-1",
          name: "collect timesheet",
          description: "collect timesheets",
          type: "leaf",
          state: "active",
          requester: "",
          responders: [],
          blocks: [],
        },
        {
          id: "leaf-2",
          name: "rating",
          description: "team rating",
          type: "leaf",
          state: "active",
          requester: "",
          responders: [],
          blocks: [],
        },
        {
          id: "1",
          name: "default request, parallel block container",
          description: "empty request wrapper",
          type: "parallelStages",
          state: "pending",
          requester: "",
          responders: [],
          blocks: [
            {
              id: "leaf-1",
              name: "collect timesheet",
              description: "collect timesheets",
              type: "leaf",
              state: "active",
              requester: "",
              responders: [],
              blocks: [],
            },
          ],
        },
      ],
    },
  ],
};

const blockLevel1 = blockLevel2.blocks[0];
const blockLeaf = blockLevel1.blocks[0];
const blockLevel0 = { ...blockLevel1, blocks: [] };

export const leafBlock = () => {
  return <BlockCard block={blockLeaf} />;
};

export const CompositeBlockLevel0 = () => {
  return (
    <DndProvider backend={Backend}>
      <BlockCard block={blockLevel0} />
    </DndProvider>
  );
};

export const CompositeBlockLevel1 = () => {
  return (
    <DndProvider backend={Backend}>
      <BlockCard block={blockLevel1} />
    </DndProvider>
  );
};

export const CompositeBlockLevel2 = () => {
  return (
    <DndProvider backend={Backend}>
      <BlockCard block={blockLevel2} />
    </DndProvider>
  );
};
