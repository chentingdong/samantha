import { Block, State, CompositeBlock } from "../block";
import { User } from "../user";

describe("Block", () => {
  let block: Block;
  let user1: User;
  let user2: User;

  beforeEach(() => {
    block = new Block("test block");
    user1 = new User("Dolores");
    user2 = new User("Caleb");
  });

  it("should have an id", () => {
    expect(block.id).toBeDefined();
  });

  it("should have a name", () => {
    expect(block.name).toBe("test block");
  });

  it("should have a state", () => {
    expect(block.state).toBeDefined();
  });

  it("should be in active state after creation", () => {
    expect(block.state).toBe(State.ACTIVE);
  });

  it("can have requestor", () => {
    block.addRequestor(user1);
    expect(block.requestors).toEqual([user1]);
  });

  it("can have responder", () => {
    block.addResponder(user2);
    expect(block.responders).toEqual([user2]);
  });

  it("can manual complete", () => {
    const result = block.complete();
    expect(result).toBeTruthy();
    expect(block.state).toBe(State.COMPLETE);
  });

  it("can clone itself with same users", () => {
    const clone = block.clone();
    expect(clone).not.toBe(block);
    expect(clone.id).not.toEqual(block.id);
    expect(clone.name).toBe("test block");
    expect(clone.requestors).toEqual([]);
    expect(clone.responders).toEqual([]);
  });

  it("can clone itself with different users", () => {
    const clone = block.clone([user1], [user2]);
    expect(clone).not.toBe(block);
    expect(clone.id).not.toEqual(block.id);
    expect(clone.name).toBe("test block");
    expect(clone.requestors).toEqual([user1]);
    expect(clone.responders).toEqual([user2]);
  });
});

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
    let clone = compositeBlock.clone();
    expect(clone).not.toBe(compositeBlock);
    expect(clone.id).not.toEqual(compositeBlock.id);
    expect(clone.name).toBe("test composite block");
    expect(clone.blocks).toEqual([block]);
  });
});

describe("Name of the group", () => {});
