import { getBlocks } from "../queries/getBlocks"
import { getBlockByPk } from "../queries/getBlockByPk"
import { insertBlock } from "../mutations/insertBlock"
import { deleteBlockByPk } from "../mutations/deleteBlockByPk"
import { createRandomSequenceDefInput } from "./utils"

describe("GraphQL", () => {
  describe("blocks", () => {
    const { block } = createRandomSequenceDefInput()
    describe("Query", () => {
      beforeAll(async () => {
        await insertBlock({ data: block })
      })

      afterAll(async () => {
        await deleteBlockByPk({ id: block.id })
      })

      it("should return list of blocks", async () => {
        const result = await getBlocks()
        expect(result.length).toBeGreaterThan(0)
      })
      it("should return single block by pk", async () => {
        const result = await getBlockByPk(block.id)
        expect(result.id).toEqual(block.id)
      })
    })

    describe("Insert Mutation", () => {
      afterEach(async () => {
        await deleteBlockByPk({ id: block.id })
      })

      it("should insert a block", async () => {
        const result = await insertBlock({ data: block })
        expect(result.id).toEqual(block.id)
      })
    })
  })
})
