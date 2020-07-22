import { getMainBells } from "../queries/getMainBells"
import { getMainBellByPk } from "../queries/getMainBellByPk"
import { getSecondaryBells } from "../queries/getSecondaryBells"
import { getSecondaryBellByPk } from "../queries/getSecondaryBellByPk"
import { insertBell } from "../mutations/insertBell"
import { deleteBellByPk } from "../mutations/deleteBellByPk"
import {
  createRandomMainBellDefInput,
  createRandomSecondaryBellDefInput,
} from "./utils"

describe("GraphQL", () => {
  describe("main bells", () => {
    const mainBell = createRandomMainBellDefInput()
    const secondaryBell = createRandomSecondaryBellDefInput(mainBell.id)
    describe("Query", () => {
      beforeAll(async () => {
        await insertBell({ data: mainBell })
        await insertBell({ data: secondaryBell })
      })

      afterAll(async () => {
        await deleteBellByPk({ id: secondaryBell.id })
        await deleteBellByPk({ id: mainBell.id })
      })

      it("should return list of bells", async () => {
        const result = await getMainBells()
        expect(result.length).toBeGreaterThan(0)
      })
      it("should return single bell by pk", async () => {
        const result = await getMainBellByPk(mainBell.id)
        expect(result.id).toEqual(mainBell.id)
      })

      it("should return list of bells", async () => {
        const result = await getSecondaryBells()
        expect(result.length).toBeGreaterThan(0)
      })
      it("should return single bell by pk", async () => {
        const result = await getSecondaryBellByPk(mainBell.id)
        expect(result.id).toEqual(mainBell.id)
      })
    })

    describe("Insert Mutation", () => {
      afterEach(async () => {
        await deleteBellByPk({ id: mainBell.id })
      })

      it("should insert a bell", async () => {
        const result = await insertBell({ data: mainBell })
        expect(result.id).toEqual(mainBell.id)
      })
    })
  })
})
