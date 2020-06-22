import { nanoid } from "nanoid"
import { getUsers } from "./queries/getUsers"
import { getUser } from "./queries/getUser"
import { getUserByPk } from "./queries/getUserByPk"
import { getUsersAggregate } from "./queries/getUsersAggregate"
import { getBlockType } from "./queries/getBlockType"
import { getBlockDefState } from "./queries/getBlockDefState"
import { getBlockDefs } from "./queries/getBlockDefs"
import { getBlockDef } from "./queries/getBlockDef"
import { getBlockDefByPk } from "./queries/getBlockDefByPk"
import { getBlockDefsAggregate } from "./queries/getBlockDefsAggregate"
import { updateBlockDefByPk } from "./mutations/updateBlockDefByPk"
import { insertBlockDef } from "./mutations/insertBlockDef"
import { deleteBlockDefByPk } from "./mutations/deleteBlockDefByPk"
import { deleteUserByPk } from "./mutations/deleteUserByPk"
import { insertUser } from "./mutations/insertUser"

const createRandomUserInput = async () => {
  const id = nanoid()
  const name = "User " + Math.floor(Math.random() * 10)
  const email = "user" + Math.floor(Math.random() * 10) + "@bellhop.io"
  return { id, name, email }
}

const deleteUser = async (id: string) => {
  await deleteUserByPk({ id })
}

describe("GraphQL", () => {
  describe("users", () => {
    describe("Query", () => {
      it("should return list of users", async () => {
        const result = await getUsers()
        expect(result.length).toBeGreaterThan(0)
      })
      it("should return single user", async () => {
        const result = await getUser("Google_111918078641246610063")
        expect(result[0].name).toEqual("Baiji He")
      })
      it("should return single user by pk", async () => {
        const result = await getUserByPk("Google_111918078641246610063")
        expect(result.name).toEqual("Baiji He")
        expect(result.block_requestors[0].block_id).toEqual(
          result.block_requestors[0].block.id
        )
      })
      it("should return users aggregate", async () => {
        const result = await getUsersAggregate()
        expect(result.aggregate.count).toBeGreaterThan(0)
      })
    })

    describe("Insert Mutation", () => {
      const id = nanoid()
      const name = "User " + Math.floor(Math.random() * 10)
      const email = "user" + Math.floor(Math.random() * 10) + "@bellhop.io"

      afterEach(async () => {
        await deleteUserByPk({ id })
      })

      it("should insert a user", async () => {
        const result = await insertUser({ data: { id, name, email } })
        expect(result.id).toEqual(id)
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

  describe("blockDefs", () => {
    describe("Query", () => {
      it("should return blockDefs", async () => {
        const result = await getBlockDefs()
        expect(result.length).toBeGreaterThan(0)
      })
      it("should return single blockDef", async () => {
        const result = await getBlockDef("vMldJyFpeD4rbY4dW5Gb-")
        expect(result.length).toEqual(1)
      })
      it("should return single blockDef by pk", async () => {
        const result = await getBlockDefByPk("vMldJyFpeD4rbY4dW5Gb-")
        expect(result.name).toBeDefined()
      })
      it("should return blockDefs aggregate", async () => {
        const result = await getBlockDefsAggregate()
        expect(result.aggregate.count).toBeGreaterThan(0)
      })
    })

    describe("Insert Mutation", () => {
      const id = nanoid()
      const name = "Bell " + Math.floor(Math.random() * 10)
      const type = "Form"
      const state = "Draft"

      afterEach(async () => {
        await deleteBlockDefByPk({ id })
      })

      it("should fail if not null columns are not provided", async () => {
        const result = await insertBlockDef({ data: { id, name } })
        expect(result).toBeUndefined()
      })
      it("should insert without relationship", async () => {
        const result = await insertBlockDef({
          data: { id, name, type, state },
        })
        expect(result.id).toEqual(id)
        expect(result.root).toBeUndefined()
        expect(result.parent).toEqual(null)
        expect(result.children).toEqual([])
        expect(result.block_requestors).toEqual([])
        expect(result.block_responders).toEqual([])
      })
      it("should insert with block_requestors replacing existing user_id (working with a warning)", async () => {
        const user_id = "Google_111918078641246610063"
        const result = await insertBlockDef({
          data: {
            id,
            name,
            type,
            state,
            block_requestors: {
              data: [{ user_id }],
            },
          },
        })
        expect(result.block_requestors[0].user_id).toBeUndefined()
        expect(result.block_requestors[0].user.id).toEqual(user_id)
        deleteUser(id)
      })
      it("should insert with block_requestors upserting an existing user (working with a warning, too long)", async () => {
        // data array assumes elements are being inserted.
        // [GraphQL Error]: Message: cannot proceed to insert object relation "user" since insert to table "users" affects zero rows,
        // Path: $.selectionSet.insert_blockDefs_one.args.object[0].block_requestors.data[0].user
        const user_id = "Google_111918078641246610063"
        const user_name = "Baiji He"
        const user_email = "bhe@bellhop.io"
        const result = await insertBlockDef({
          data: {
            id,
            name,
            type,
            state,
            block_requestors: {
              data: [
                {
                  user: {
                    data: {
                      id: user_id,
                      name: user_name,
                      email: user_email,
                    },
                    on_conflict: {
                      constraint: "users_pkey",
                      update_columns: ["name"],
                    },
                  },
                },
              ],
            },
          },
        })
        expect(result.block_requestors[0].user_id).toBeUndefined()
        expect(result.block_requestors[0].user.id).toEqual(user_id)
        deleteUser(id)
      })
      it("should insert with block_requestors while creating a new user (rarely used)", async () => {
        const user = await createRandomUserInput()
        const result = await insertBlockDef({
          data: {
            id,
            name,
            type,
            state,
            block_requestors: {
              data: [{ user: { data: user } }],
            },
          },
        })
        expect(result.block_requestors[0].user.id).toEqual(user.id)
        deleteUser(user.id)
      })
    })

    describe("Update Mutation", () => {
      it("should handle wrong input", async () => {
        const name = "Bell " + Math.floor(Math.random() * 10)
        const result = await updateBlockDefByPk({
          id: "vMldJyFpeD4rbY4dW5Gb-",
          data: { lable: name },
        })
        expect(result).toBeUndefined()
      })
      it("should not update id", async () => {
        const name = "Bell " + Math.floor(Math.random() * 10)
        const result = await updateBlockDefByPk({
          id: "vMldJyFpeD4rbY4dW5Gb-",
          data: { id: "vMldJyFpeD4rbY4dW5Gb" },
        })
        expect(result).toBeUndefined()
      })
      it("should update name", async () => {
        const name = "Bell " + Math.floor(Math.random() * 10)
        const result = await updateBlockDefByPk({
          id: "vMldJyFpeD4rbY4dW5Gb-",
          data: { name },
        })
        expect(result.name).toEqual(name)
      })
      // it("should update type?", async () => {
      //   const name = "Bell " + Math.floor(Math.random() * 10)
      //   const result = await updateBlockDefByPk({
      //     id: "vMldJyFpeD4rbY4dW5Gb-",
      //     data: { name },
      //   })
      //   expect(result.name).toEqual(name)
      // })
      // it("should update state", async () => {
      //   const name = "Bell " + Math.floor(Math.random() * 10)
      //   const result = await updateBlockDefByPk({
      //     id: "vMldJyFpeD4rbY4dW5Gb-",
      //     data: { lable: name },
      //   })
      //   expect(result).toBeUndefined()
      // })
      // it("should not update to invalid state", async () => {
      //   const name = "Bell " + Math.floor(Math.random() * 10)
      //   const result = await updateBlockDefByPk({
      //     id: "vMldJyFpeD4rbY4dW5Gb-",
      //     data: { lable: name },
      //   })
      //   expect(result).toBeUndefined()
      // })

      // it("should update block requestors", async () => {
      //   const name = "Bell " + Math.floor(Math.random() * 10)
      //   const result = await updateBlockDefByPk({
      //     id: "vMldJyFpeD4rbY4dW5Gb-",
      //     data: { lable: name },
      //   })
      //   expect(result).toBeUndefined()
      // })
      // it("should update parent", async () => {
      //   const name = "Bell " + Math.floor(Math.random() * 10)
      //   const result = await updateBlockDefByPk({
      //     id: "vMldJyFpeD4rbY4dW5Gb-",
      //     data: { lable: name },
      //   })
      //   expect(result).toBeUndefined()
      // })
      // it("should update children", async () => {
      //   const name = "Bell " + Math.floor(Math.random() * 10)
      //   const result = await updateBlockDefByPk({
      //     id: "vMldJyFpeD4rbY4dW5Gb-",
      //     data: { lable: name },
      //   })
      //   expect(result).toBeUndefined()
      // })
    })
  })
})
