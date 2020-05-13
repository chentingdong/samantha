import React from "react";
import { SegmentView, segmentCompositeStages } from "./segment-view";
import { withKnobs } from "@storybook/addon-knobs";
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";
import blockStories from "../../../data/storybook-blocks.json";

export default {
  title: "Segment View",
  component: SegmentView,
  decorators: [withKnobs],
};

const blockLevel2 = blockStories[0];
const blockLevel1 = blockLevel2.blocks[0];
const blockLeaf = blockLevel1.blocks[0];
const blockLevel0 = { ...blockLevel1, blocks: [] };

export const leafBlock = () => {
  return (
    <DndProvider backend={Backend}>
      <SegmentView block={blockLeaf} />
    </DndProvider>
  );
};

export const parallelCompositeBlockLevel0 = () => {
  return (
    <DndProvider backend={Backend}>
      <SegmentView block={blockLevel0} />
    </DndProvider>
  );
};

export const parallelCompositeBlockLevel1 = () => {
  return (
    <DndProvider backend={Backend}>
      <SegmentView block={blockLevel1} />
    </DndProvider>
  );
};

export const parallelCompositeBlockLevel2 = () => {
  return (
    <DndProvider backend={Backend}>
      <SegmentView block={blockLevel2} />
    </DndProvider>
  );
};
