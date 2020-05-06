import { Request, STATE } from "../request";
import reqeustCatalog from "../data/requestCatalog.json";
import { Block } from "../block";
import { DependencyBlock } from "../../models-bj/block";

describe("Request Use Case - Timesheet", () => {
  it("should return the list of request definitions from request Catalog", () => {
    const requestDefinitionList = reqeustCatalog;
    expect(requestDefinitionList.length).toBeGreaterThan(0);
  });

  const findTimesheetDef = Request.getRequestDefByName("Collect Timesheet");
  it("should find 'Collect Timesheets' definition from request Catalog", () => {
    expect(findTimesheetDef).toMatchObject(reqeustCatalog[2]);
  });

  it("should find 1 blockDef in 'Collect Timesheet' definition ", () => {
    const timesheetBlock = Block.getBlockByName("LEAF", "weekly timesheet");
    expect(findTimesheetDef.blockDefs[0]).toMatchObject(timesheetBlock);
  });

  const newTimesheetRequest = new Request(
    "Week of 05-04-2020",
    "2nd week of sprint",
    findTimesheetDef
  );

  it("should be able to create new request from found 'Collect Timesheets' definition from request Catalog", () => {
    expect(newTimesheetRequest.originalRequestDef).toMatchObject(
      findTimesheetDef
    );
    expect(newTimesheetRequest.blockDefs).toMatchObject(
      findTimesheetDef.blockDefs
    );
  });

  it("should be able to config the weekly timesheet block and add to run time blocks[]", () => {
    // this likely would be done by frontend code.
    const timesheetBlockRuntime = new Block(
      newTimesheetRequest.name,
      newTimesheetRequest.blockDefs[0]
    );
    newTimesheetRequest.blockDefs[0];
    timesheetBlockRuntime.config.formLink =
      "https://sheet.gdrive.com/timesheet";
    timesheetBlockRuntime.config.reportWeek = "05-04-2020";
    timesheetBlockRuntime.config.projectName = "New Product";
    timesheetBlockRuntime.setConfig();
    newTimesheetRequest.addBlock(timesheetBlockRuntime); // adding a configured block to request is more likely add a relationshiop in database ref block row to request row

    expect(newTimesheetRequest.blocks[0].data.fields[0].value).toBe(
      "05-04-2020"
    );
    expect(newTimesheetRequest.blocks[0].data.fields[1].value).toBe(
      "New Product"
    );
    expect(newTimesheetRequest.blocks[0].data.externalLink).toBe(
      "https://sheet.gdrive.com/timesheet"
    );
  });

  it("should ", () => {});
  it("should ", () => {});
  it("should ", () => {});
  it("should ", () => {});
  it("should ", () => {});
  it("should ", () => {});
  it("should ", () => {});
  it("should ", () => {});
  it("should ", () => {});
  it("should ", () => {});
  it("should ", () => {});
});
