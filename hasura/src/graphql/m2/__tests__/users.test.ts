import { getUsers } from "../queries/getUsers"
import { getUserByPk } from "../queries/getUserByPk"
import { insertUser } from "../mutations/insertUser"
import { deleteUserByPk } from "../mutations/deleteUserByPk"
import { createRandomUserInput } from "./utils"

describe("GraphQL", () => {
  describe("users", () => {
    const user = createRandomUserInput()
    describe("Query", () => {
      beforeAll(async () => {
        await insertUser({ data: user })
      })

      afterAll(async () => {
        await deleteUserByPk({ id: user.id })
      })

      it("should return list of users", async () => {
        const result = await getUsers()
        expect(result.length).toBeGreaterThan(0)
      })
      it("should return single user by pk", async () => {
        const result = await getUserByPk(user.id)
        expect(result.name).toEqual(user.name)
      })
    })

    describe("Insert Mutation", () => {
      afterEach(async () => {
        await deleteUserByPk({ id: user.id })
      })

      it("should insert a user", async () => {
        const result = await insertUser({ data: user })
        expect(result.id).toEqual(user.id)
      })
    })
  })
})
