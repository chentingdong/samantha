import uuid from "uuid";
import React, { useContext } from "react";
import { Block } from "../context/interface";
import { DndTargetBox } from "../block/dnd-target-box";
import { RequestBlocks } from "./request-blocks";
import { Context } from "../context/store";

export const SegmentView: React.FC<{
  block: Block;
  updateBlock: (block: Block) => void;
}> = ({ block, updateBlock }) => {
  switch (block.type) {
    case "sequenceStages":
    case "parallelStages":
      return (
        <SegmentCompositeStages
          type={block.type}
          children={block.children}
          updateBlock={updateBlock}
        />
      );
    default:
      return <span />;
  }
};

const SegmentCompositeStages: React.FC<{
  type: string;
  children: Block[];
  updateBlock: (block: Block) => void;
}> = ({ type, children, updateBlock }) => {
  const { state, dispatch } = useContext(Context);

  const addSubBlock = (block: Block) => {
    children.push({ ...block, id: uuid.v4() });
    updateBlock(block);
    resetPalette();
  };
  // TODO: temp solution by resetting all
  const resetPalette = () => {
    state.blockDefs.forEach((blockDef) => {
      blockDef.children = [];
    });
  };

  return (
    <div className="col-12">
      <DndTargetBox
        accept="block"
        greedy={false}
        onDrop={(item) => addSubBlock(item)}
      >
        <RequestBlocks children={children} />
      </DndTargetBox>
    </div>
  );
};
