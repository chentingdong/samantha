import { createRandomBellInput, createRandomBlockInput } from "./utils"
import { insertBell } from "../mutations/insertBell"
import { updateBellByPk } from "../mutations/updateBellByPk"
import { getBellByPk } from "../queries/getBellByPk"
import { getBell } from "../queries/getBell"
import { getBells } from "../queries/getBells"
import { deleteBellByPk } from "../mutations/deleteBellByPk"
import { insertBlock } from "../mutations/insertBlock"
import { deleteBlockByPk } from "../mutations/deleteBlockByPk"
import { getBlockByPk } from "../queries/getBlockByPk"

describe("GraphQL", () => {
  describe("bells", () => {
    const bell = createRandomBellInput()
    const block = createRandomBlockInput()

    describe("Query", () => {
      beforeAll(async () => {
        await insertBell({ data: bell })
      })

      afterAll(async () => {
        await deleteBellByPk({ id: bell.id })
      })

      it("should return bells", async () => {
        const result = await getBells()
        expect(result.length).toBeGreaterThanOrEqual(0)
      })
      it("should return single bell", async () => {
        const result = await getBell(bell.id)
        expect(result.length).toEqual(1)
      })
      it("should return single bell by pk", async () => {
        const result = await getBellByPk(bell.id)
        expect(result.name).toBeDefined()
      })
    })

    describe("Insert Mutation", () => {
      afterEach(async () => {
        await deleteBellByPk({ id: bell.id })
      })
      it("should fail if non-nullable columns are not provided", async () => {
        const result = await insertBell({
          data: { id: bell.id, name: bell.name },
        })
        expect(result).toBeUndefined()
      })
      it("should fail if bell state enum is invalid", async () => {
        const result = await insertBell({
          data: { ...bell, state: "Invalid" },
        })
        expect(result).toBeUndefined()
      })
    })

    describe("Update Mutation", () => {
      beforeEach(async () => {
        await insertBell({ data: bell })
      })
      afterEach(async () => {
        await deleteBellByPk({ id: bell.id })
      })
      it("should update name", async () => {
        const name = "updated Bell " + Math.floor(Math.random() * 10)
        const result = await updateBellByPk({
          id: bell.id,
          data: { name: name },
        })
        expect(result.name).toEqual(name)
      })
      it("should update state", async () => {
        const state = "Success"
        const result = await updateBellByPk({
          id: bell.id,
          data: { state },
        })
        expect(result.state).toEqual(state)
        expect(result.blockState.value).toEqual(state)
      })
      it("should not allow invalid state enum value", async () => {
        const state = "invalid"
        const result = await updateBellByPk({
          id: bell.id,
          data: { state },
        })
        expect(result).toBeUndefined()
      })
    })

    describe("Bell Block relationship", () => {
      beforeAll(async () => {
        await insertBlock({ data: block })
        const bellWithBlock = { ...bell, root_block_id: block.id }
        await insertBell({ data: bellWithBlock })
      })
      afterAll(async () => {
        await deleteBellByPk({ id: bell.id })
        await deleteBlockByPk({ id: block.id })
      })
      it("bell relates to block by root_block_id", async () => {
        const resultBlock = await getBlockByPk(block.id)
        const resultBell = await getBellByPk(bell.id)
        console.log(resultBlock, resultBell)
        expect(resultBell.root_block_id).toEqual(block.id)
        expect(resultBlock.bells[0].id).toEqual(bell.id)
      })
    })
  })
})
