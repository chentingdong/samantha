import { Block, State } from "../block";
import blockTestData from "../data/blockTestData.json";

describe("Block Timesheet Use Case", () => {
  const testBlockDef = Block.getBlockById("LEAF", blockTestData.testBlockId);
  const testBlock = new Block("Timesheet #22", testBlockDef);

  it("should have an id", () => {
    expect(testBlock.id).toBeDefined();
  });

  it("should be able to be created from a def in block library", () => {
    const testBlockDef = Block.getBlockById("LEAF", blockTestData.testBlockId);
    const testBlock = new Block("Timesheet #22", testBlockDef);
    expect(testBlock.blockDef).toMatchObject(testBlockDef);
    expect(testBlock.config).toMatchObject(testBlockDef.config);
    expect(testBlock.data).toMatchObject(testBlockDef.data);
  });
  it("should have a state", () => {
    expect(testBlock.state).toBeDefined();
  });

  it("should be in pending state after creation", () => {
    expect(testBlock.state).toBe(State.PENDING);
  });

  it("can manual start", () => {
    const result = testBlock.start();
    if (result) expect(testBlock.state).toBe(State.ACTIVE);
  });

  it("can manual complete", () => {
    const result = testBlock.complete();
    if (result) expect(testBlock.state).toBe(State.COMPLETE);
  });
});

describe("LEAF Block", () => {
  // blockTestData.testBlockName;
  it("should be able to get a list from library", () => {
    expect(Block.getBlockLibrary("LEAF").length).toBeGreaterThan(0);
  });

  it("should be able to find a block by id or name from library", () => {
    expect(Block.getBlockById("LEAF", blockTestData.testBlockId).name).toBe(
      blockTestData.testBlockName
    );
    expect(Block.getBlockByName("LEAF", blockTestData.testBlockName).id).toBe(
      blockTestData.testBlockId
    );
  });
});

it("should be able to config and reflect config into data", () => {
  const testBlock = new Block(
    "Timesheet #22",
    Block.getBlockById("LEAF", blockTestData.testBlockId)
  );
  testBlock.config.formLink = "https://sheet.gdrive.com/timesheet";
  testBlock.config.reportWeek = "05-04-2020";
  testBlock.config.projectName = "New Product";
  testBlock.setConfig();
  expect(testBlock.data.fields[0].value).toBe(testBlock.config.reportWeek);
  expect(testBlock.data.fields[1].value).toBe(testBlock.config.projectName);
  expect(testBlock.data.externalLink).toBe(testBlock.config.formLink);
});

describe("Form Block", () => {});

describe("API Block", () => {});

describe("Approval Block", () => {});

describe("Dependency Block", () => {});

describe("Request Block", () => {});

describe("Composite Block", () => {});
