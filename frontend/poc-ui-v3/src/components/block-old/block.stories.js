import React, { useContext } from "react";
import { BlockCard } from "./block-card";
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";
import blockStories from "../../../data/storybook-blocks.json";

export default {
  title: "BlockOld",
  component: BlockCard,
  parameters: {
    notes: "My notes",
  },
};

export const BlockCards = () => {
  const blockLeaf = blockStories[1].children[0];
  const blockComposite = blockStories[1];
  const blockComplex = blockStories[0];

  return (
    <div>
      <h2>Blocks</h2>
      <p>Sample of blocks</p>
      <DndProvider backend={Backend}>
        <section className="mb-4 p-2 border-grey border shadow">
          <h3>Demo 1. Leaf Block</h3>
          <p>a simple leaf block</p>
          <BlockCard block={blockLeaf} />
        </section>
        <section className="mb-4 p-2 border-grey border shadow">
          <h3>Demo 2. Composite Block</h3>
          <p>a composite block can contain sub blocks</p>
          <BlockCard block={blockComposite} />
        </section>
        <section className="mb-4 p-2 border-grey border shadow">
          <h3>Demo 3. Complex Block containment</h3>
          <p>a complex block can contain multiple levels</p>
          <BlockCard block={blockComplex} />
        </section>
      </DndProvider>
    </div>
  );
};
