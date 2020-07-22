import { getBellhops } from "../queries/getBellhops"
import { getBellhopByPk } from "../queries/getBellhopByPk"
import { insertBellhop } from "../mutations/insertBellhop"
import { deleteBellhopByPk } from "../mutations/deleteBellhopByPk"
import { createRandomBellhopInput } from "./utils"

describe("GraphQL", () => {
  describe("bellhops", () => {
    const bellhop = createRandomBellhopInput()
    describe("Query", () => {
      beforeAll(async () => {
        await insertBellhop({ data: bellhop })
      })

      afterAll(async () => {
        await deleteBellhopByPk({ id: bellhop.id })
      })

      it("should return list of bellhops", async () => {
        const result = await getBellhops()
        expect(result.length).toBeGreaterThan(0)
      })
      it("should return single bellhop by pk", async () => {
        const result = await getBellhopByPk(bellhop.id)
        expect(result.name).toEqual(bellhop.name)
      })
    })

    describe("Insert Mutation", () => {
      afterEach(async () => {
        await deleteBellhopByPk({ id: bellhop.id })
      })

      it("should insert a bellhop", async () => {
        const result = await insertBellhop({ data: bellhop })
        expect(result.id).toEqual(bellhop.id)
      })
    })
  })
})
