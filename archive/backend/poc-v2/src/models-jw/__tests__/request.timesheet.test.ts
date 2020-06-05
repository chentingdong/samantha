import { Request, State } from "../request";
import reqeustCatalog from "../data/requestCatalog.json";
import { Block } from "../block";
import { User } from "../user";
import { v4 as uuid } from "uuid";

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

  it("should be able to add responders to fill timesheet", () => {
    const userBaiji = new User(uuid(), "Baiji", "bhe@bellhop.io"); // need to get user, not create new
    newTimesheetRequest.addResponder(userBaiji);
    expect(newTimesheetRequest.responders[0]).toMatchObject(userBaiji);
  });

  it("should be able to start request and request and block will be both active ", () => {
    newTimesheetRequest.start();
    expect(newTimesheetRequest.blocks[0].state).toBe(State.ACTIVE);
    expect(newTimesheetRequest.state).toBe(State.ACTIVE);
  });

  it("should be able to complete block, and set request state to complete", () => {
    newTimesheetRequest.blocks[0].complete();
    newTimesheetRequest.checkState("block");
    expect(newTimesheetRequest.blocks[0].state).toBe(State.COMPLETE);
    expect(newTimesheetRequest.state).toBe(State.COMPLETE);
  });
});
