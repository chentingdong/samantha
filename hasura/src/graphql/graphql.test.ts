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

const createRandomUserInput = () => {
  const id = nanoid()
  const name = "User " + Math.floor(Math.random() * 10)
  const email = "user" + Math.floor(Math.random() * 10) + "@bellhop.io"
  return { id, name, email }
}

const createRandomBlockDefInput = () => {
  const id = nanoid()
  const name = "Bell " + Math.floor(Math.random() * 10)
  const type = "Form"
  const state = "Draft"
  return { id, name, type, state }
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
      const blockDef = createRandomBlockDefInput()

      afterEach(async () => {
        await deleteBlockDefByPk({ id: blockDef.id })
      })

      it("should fail if not-nullable columns are not provided", async () => {
        const result = await insertBlockDef({
          data: { id: blockDef.id, name: blockDef.name },
        })
        expect(result).toBeUndefined()
      })
      it("should insert without relationship", async () => {
        const result = await insertBlockDef({
          data: blockDef,
        })
        expect(result.id).toEqual(blockDef.id)
        expect(result.root).toEqual(null)
        expect(result.parent).toEqual(null)
        expect(result.children).toEqual([])
        expect(result.block_requestors).toEqual([])
        expect(result.block_responders).toEqual([])
      })
      it("should validate blockDef state enum", async () => {
        // [GraphQL Error]: Message: unexpected value "Invalid" for enum: 'blockDefState_enum', Path: $.variableValues.object.state
        const result = await insertBlockDef({
          data: {
            ...blockDef,
            state: "Invalid",
          },
        })
        expect(result).toBeUndefined()
      })
      it("should validate blockDef type enum", async () => {
        // [GraphQL Error]: Message: unexpected value "Invalid" for enum: 'blockType_enum', Path: $.variableValues.object.type
        const result = await insertBlockDef({
          data: {
            ...blockDef,
            type: "Invalid",
          },
        })
        expect(result).toBeUndefined()
      })

      describe("With block_requestors", () => {
        it("should insert with block_requestors replacing existing user_id (working with a warning)", async () => {
          const user_id = "Google_111918078641246610063"
          const result = await insertBlockDef({
            data: {
              ...blockDef,
              block_requestors: {
                data: [{ user_id }],
              },
            },
          })
          expect(result.block_requestors[0].user_id).toBeUndefined()
          expect(result.block_requestors[0].user.id).toEqual(user_id)
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
              ...blockDef,
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
        })
        it("should insert with block_requestors while creating a new user (rarely used)", async () => {
          const user = createRandomUserInput()
          const result = await insertBlockDef({
            data: {
              ...blockDef,
              block_requestors: {
                data: [{ user: { data: user } }],
              },
            },
          })
          expect(result.block_requestors[0].user.id).toEqual(user.id)
          await deleteUserByPk({ id: user.id })
        })
      })

      describe("With block_responders", () => {
        it("should insert with block_responders replacing existing user_id (working with a warning)", async () => {
          const user_id = "Google_111918078641246610063"
          const result = await insertBlockDef({
            data: {
              ...blockDef,
              block_responders: {
                data: [{ user_id }],
              },
            },
          })
          expect(result.block_responders[0].user_id).toBeUndefined()
          expect(result.block_responders[0].user.id).toEqual(user_id)
        })
        it("should insert with block_responders upserting an existing user (working with a warning, too long)", async () => {
          // data array assumes elements are being inserted.
          // [GraphQL Error]: Message: cannot proceed to insert object relation "user" since insert to table "users" affects zero rows,
          // Path: $.selectionSet.insert_blockDefs_one.args.object[0].block_responders.data[0].user
          const user_id = "Google_111918078641246610063"
          const user_name = "Baiji He"
          const user_email = "bhe@bellhop.io"
          const result = await insertBlockDef({
            data: {
              ...blockDef,
              block_responders: {
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
          expect(result.block_responders[0].user_id).toBeUndefined()
          expect(result.block_responders[0].user.id).toEqual(user_id)
        })
        it("should insert with block_responders while creating a new user (rarely used)", async () => {
          const user = createRandomUserInput()
          const result = await insertBlockDef({
            data: {
              ...blockDef,
              block_responders: {
                data: [{ user: { data: user } }],
              },
            },
          })
          expect(result.block_responders[0].user.id).toEqual(user.id)
          await deleteUserByPk({ id: user.id })
        })
      })

      describe("With parent", () => {
        const parent = createRandomBlockDefInput()
        it("should insert with parent replacing existing parent_id", async () => {
          const parentResult = await insertBlockDef({ data: { ...parent } })
          const result = await insertBlockDef({
            data: {
              ...blockDef,
              parent_id: parent.id,
            },
          })
          expect(result.parent.id).toEqual(parent.id)
          await deleteBlockDefByPk({ id: blockDef.id })
          await deleteBlockDefByPk({ id: parent.id })
        })
        it("should insert while creating a new parent (rarely used)", async () => {
          const result = await insertBlockDef({
            data: {
              ...blockDef,
              parent: { data: { ...parent } },
            },
          })
          expect(result.parent.id).toEqual(parent.id)
          await deleteBlockDefByPk({ id: blockDef.id })
          await deleteBlockDefByPk({ id: parent.id })
        })
      })

      describe("With root", () => {
        const root = createRandomBlockDefInput()
        it("should insert with root replacing existing root_id", async () => {
          const rootResult = await insertBlockDef({ data: { ...root } })
          const result = await insertBlockDef({
            data: {
              ...blockDef,
              root_id: root.id,
            },
          })
          expect(result.root.id).toEqual(root.id)
          await deleteBlockDefByPk({ id: blockDef.id })
          await deleteBlockDefByPk({ id: root.id })
        })
        it("should insert while creating a new root (rarely used)", async () => {
          const result = await insertBlockDef({
            data: {
              ...blockDef,
              root: { data: { ...root } },
            },
          })
          expect(result.root.id).toEqual(root.id)
          await deleteBlockDefByPk({ id: blockDef.id })
          await deleteBlockDefByPk({ id: root.id })
        })
      })

      describe("With children", () => {
        const child1 = createRandomBlockDefInput()
        const child2 = createRandomBlockDefInput()
        it("should insert while creating new children", async () => {
          const result = await insertBlockDef({
            data: {
              ...blockDef,
              children: { data: [{ ...child1 }, { ...child2 }] },
            },
          })
          expect(result.children.length).toEqual(2)
          await deleteBlockDefByPk({ id: blockDef.id })
          await deleteBlockDefByPk({ id: child1.id })
          await deleteBlockDefByPk({ id: child2.id })
        })
        it("can not connect with existing children", async () => {
          const child1Result = await insertBlockDef({ data: { ...child1 } })
          const child2Result = await insertBlockDef({ data: { ...child2 } })
          const result = await insertBlockDef({
            data: {
              ...blockDef,
              children: {
                data: [{ ...child1 }, { ...child2 }],
                on_conflict: {
                  constraint: "blockdefs_pkey",
                  update_columns: ["name"],
                },
              },
            },
          })
          expect(result.children).toEqual([])
          await deleteBlockDefByPk({ id: blockDef.id })
          await deleteBlockDefByPk({ id: child1.id })
          await deleteBlockDefByPk({ id: child2.id })
        })
      })
    })

    describe("Update Mutation", () => {
      it("should handle wrong input", async () => {
        const name = "BehaviorTree " + Math.floor(Math.random() * 10)
        const result = await updateBlockDefByPk({
          id: "vMldJyFpeD4rbY4dW5Gb-",
          data: { lable: name },
        })
        expect(result).toBeUndefined()
      })
      it("should not update id", async () => {
        const name = "BehaviorTree " + Math.floor(Math.random() * 10)
        const result = await updateBlockDefByPk({
          id: "vMldJyFpeD4rbY4dW5Gb-",
          data: { id: "vMldJyFpeD4rbY4dW5Gb" },
        })
        expect(result).toBeUndefined()
      })
      it("should update name", async () => {
        const name = "BehaviorTree " + Math.floor(Math.random() * 10)
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
