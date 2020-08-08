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




  })
})
