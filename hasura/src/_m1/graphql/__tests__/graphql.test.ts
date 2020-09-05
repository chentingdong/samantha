import { getUsers } from "../queries/getUsers"
import { getUser } from "../queries/getUser"
import { getUserByPk } from "../queries/getUserByPk"
import { getUsersAggregate } from "../queries/getUsersAggregate"
import { deleteUserByPk } from "../mutations/deleteUserByPk"
import { insertUser } from "../mutations/insertUser"
import { getBlockType } from "../queries/getBlockType"
import { getBlockDefState } from "../queries/getBlockDefState"
import { getBlockState } from "../queries/getBlockState"
import {
  createRandomUserInput,
  createRandomBlockDefInput,
  createRandomBlockInput,
} from "./utils"

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
      it("should return single user", async () => {
        const result = await getUser(user.id)
        expect(result[0].name).toEqual(user.name)
      })
      it("should return single user by pk", async () => {
        const result = await getUserByPk(user.id)
        expect(result.name).toEqual(user.name)
      })
      it("should return users aggregate", async () => {
        const result = await getUsersAggregate()
        expect(result.aggregate.count).toBeGreaterThan(0)
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

  describe("blockType", () => {
    it("should return blockType and counts", async () => {
      const result = await getBlockType()
      expect(result.length).toBeGreaterThan(0)
      expect(result[0].blockDefs_aggregate.aggregate.count).toBeGreaterThan(0)
    })
  })

  describe("blockDefState", () => {
    it("should return blockDefState and counts", async () => {
      const result = await getBlockDefState()
      expect(result.length).toBeGreaterThan(0)
      expect(result[0].blockDefs_aggregate.aggregate.count).toBeGreaterThan(0)
    })
  })

  describe("blockState", () => {
    it("should return blockState and counts", async () => {
      const result = await getBlockState()
      expect(result.length).toBeGreaterThan(0)
      expect(result[0].blocks_aggregate.aggregate.count).toBeGreaterThanOrEqual(
        0
      )
    })
  })
})
