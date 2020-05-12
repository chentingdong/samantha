import React from "react";
import { BlockCard } from "./block-card";
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";

export default {
  title: "Block",
  component: BlockCard,
};

// TODO: load data from context store
const block = {
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
      id: "leaf-3",
      name: "approval",
      description: "need approval from another person",
      type: "leaf",
      state: "active",
      requester: "",
      responders: [],
      blocks: [],
    },
  ],
};

const blockLeaf = block.blocks[0];
const blockComposite = { ...block, blocks: [] };

const blockComplex = {
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

export const leafBlock = () => {
  return <BlockCard block={blockLeaf} />;
};

export const CompositeBlockLevel0 = () => {
  return (
    <DndProvider backend={Backend}>
      <BlockCard block={blockComposite} />
    </DndProvider>
  );
};

export const CompositeBlockLevel1 = () => {
  return (
    <DndProvider backend={Backend}>
      <BlockCard block={block} />
    </DndProvider>
  );
};

export const CompositeBlockLevel2 = () => {
  return (
    <DndProvider backend={Backend}>
      <BlockCard block={blockComplex} />
    </DndProvider>
  );
};
