import { createRandomBellInput } from "./utils"
import { insertBell } from "../mutations/insertBell"
import { updateBellByPk } from "../mutations/updateBellByPk"
import { getBell } from "../queries/getBell"
import { deleteBellByPk } from "../mutations/deleteBellByPk"

describe("GraphQL", () => {
  describe("bells", () => {
    const bell = createRandomBellInput()

    describe("Query", () => {
      beforeAll(async () => {
        await insertBell({ data: bell })
      })

      afterAll(async () => {
        await deleteBellByPk({ id: bell.id })
      })

      it("should return bells", async () => {
        console.log(bell.id)
        const result = await getBell(bell.id)
        expect(result.length).toEqual(1)
      })

      it("should update name", async () => {
        const name = "updated Bell " + Math.floor(Math.random() * 10)
        const result = await updateBellByPk({
          id: bell.id,
          data: { name: name },
        })
        expect(result.name).toEqual(name)
      })
    })
  })
})
