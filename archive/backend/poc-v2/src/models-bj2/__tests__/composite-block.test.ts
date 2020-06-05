import { Block } from "../block";
import { CompositeBlock } from "../composite-block";
describe("Composite Block", () => {
  let block: Block;
  let compositeBlock: CompositeBlock;
  beforeEach(() => {
    compositeBlock = new CompositeBlock("test composite block");
    block = new Block("test block");
    compositeBlock.addBlock(block);
  });
  it("can have blocks", () => {
    expect(compositeBlock.blocks).toEqual([block]);
  });
  it("can return active blocks", () => {
    const activeBlocks = compositeBlock.listActiveBlocks();
    expect(activeBlocks).toEqual([block]);
  });
  it("can clone itself including sub blocks", () => {
    let clone = compositeBlock.clone(null);
    expect(clone).not.toBe(compositeBlock);
    expect(clone.id).not.toEqual(compositeBlock.id);
    expect(clone.name).toBe("test composite block");
    expect(clone.blocks).toEqual([block]);
  });
});
