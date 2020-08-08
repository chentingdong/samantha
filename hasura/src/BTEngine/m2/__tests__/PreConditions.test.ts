import { evalConditions, evalBlockPreConditions } from "../PreConditions"
import { Block, BellContextFacts } from "../../../types"
import context from "./BellContextFacts.mock"
import { getBlockByPk } from "../../../graphql/m2/queries/getBlockByPk"

const bellContextFacts = { context }

describe("Pre Conditions", () => {
  describe("Number", () => {
    it("should not match", async () => {
      const conditions = {
        all: [
          {
            fact: "context",
            path: "$.task.vuJeHylhqX0YbTVtgDsZ7.fields[0].response",
            value: 10000,
            operator: "greaterThan",
          },
        ],
      }
      const result = await evalConditions(conditions, bellContextFacts)
      expect(result).toBe(false)
    })
    it("should match", async () => {
      const conditions = {
        all: [
          {
            fact: "context",
            path: "$.task.vuJeHylhqX0YbTVtgDsZ7.fields[0].response",
            value: 1000,
            operator: "greaterThan",
          },
        ],
      }
      const result = await evalConditions(conditions, bellContextFacts)
      expect(result).toBe(true)
    })
    it("equal", async () => {
      const conditions = {
        all: [
          {
            fact: "context",
            path: "$.task.vuJeHylhqX0YbTVtgDsZ7.fields[0].response",
            value: 1234,
            operator: "equal",
          },
        ],
      }
      const result = await evalConditions(conditions, bellContextFacts)
      expect(result).toBe(true)
    })
    it("notEqual", async () => {
      const conditions = {
        all: [
          {
            fact: "context",
            path: "$.task.vuJeHylhqX0YbTVtgDsZ7.fields[0].response",
            value: 1235,
            operator: "notEqual",
          },
        ],
      }
      const result = await evalConditions(conditions, bellContextFacts)
      expect(result).toBe(true)
    })
  })
  describe("Text", () => {
    it("should not match", async () => {
      const conditions = {
        all: [
          {
            fact: "context",
            path: "$.task.ZKinThbIS7TwdHA49RpZp.fields[0].response",
            operator: "notEqual",
            value: "Yes",
          },
        ],
      }
      const result = await evalConditions(conditions, bellContextFacts)
      expect(result).toBe(true)
    })
    it("should match", async () => {
      const conditions = {
        all: [
          {
            fact: "context",
            path: "$.task.ZKinThbIS7TwdHA49RpZp.fields[0].response",
            operator: "equal",
            value: "No",
          },
        ],
      }
      const result = await evalConditions(conditions, bellContextFacts)
      expect(result).toBe(true)
    })
  })
  describe("Array", () => {
    it("should not match", async () => {
      const conditions = {
        all: [
          {
            fact: "context",
            path: "$.task.ZKinThbIS7TwdHA49RpZp.fields[0].response",
            operator: "in",
            value: ["no", "No", "NO"],
          },
        ],
      }
      const result = await evalConditions(conditions, bellContextFacts)
      expect(result).toBe(true)
    })
  })
  describe("Block", () => {
    it.only("should match", async () => {
      const block = await getBlockByPk("WWazDMHYOxCXCgTyND2js")
      const result = await evalBlockPreConditions(block)
      expect(result).toBe(true)
    })
    it.only("should not match", async () => {
      const block = await getBlockByPk("0vNN_nHW0jc87jo-s8XPd")
      const result = await evalBlockPreConditions(block)
      expect(result).toBe(false)
    })
  })
})
