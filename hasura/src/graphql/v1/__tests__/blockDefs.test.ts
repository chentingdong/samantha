import { deleteUserByPk } from "../mutations/deleteUserByPk"
import { insertUser } from "../mutations/insertUser"
import { getBlockDefs } from "../queries/getBlockDefs"
import { getBlockDef } from "../queries/getBlockDef"
import { getBlockDefByPk } from "../queries/getBlockDefByPk"
import { getBlockDefsAggregate } from "../queries/getBlockDefsAggregate"
import { updateBlockDefByPk } from "../mutations/updateBlockDefByPk"
import { insertBlockDef } from "../mutations/insertBlockDef"
import { deleteBlockDefByPk } from "../mutations/deleteBlockDefByPk"
import { insertBlockDefRequestor } from "../mutations/insertBlockDefRequestor"
import { deleteBlockDefRequestorByPk } from "../mutations/deleteBlockDefRequestorByPk"
import { createRandomUserInput, createRandomBlockDefInput } from "./utils"
import { insertBlockDefParentChild } from "../mutations/insertBlockDefParentChild"
import { deleteBlockDefParentChildByPk } from "../mutations/deleteBlockDefParentChildByPk"

describe("GraphQL", () => {
  describe("blockDefs", () => {
    const blockDef = createRandomBlockDefInput()

    describe("Query", () => {
      beforeAll(async () => {
        await insertBlockDef({ data: blockDef })
      })

      afterAll(async () => {
        await deleteBlockDefByPk({ id: blockDef.id })
      })

      it("should return blockDefs", async () => {
        const result = await getBlockDefs()
        expect(result.length).toBeGreaterThan(0)
      })
      it("should return single blockDef", async () => {
        const result = await getBlockDef(blockDef.id)
        expect(result.length).toEqual(1)
      })
      it("should return single blockDef by pk", async () => {
        const result = await getBlockDefByPk(blockDef.id)
        expect(result.name).toBeDefined()
      })
      it("should return blockDefs aggregate", async () => {
        const result = await getBlockDefsAggregate()
        expect(result.aggregate.count).toBeGreaterThan(0)
      })
    })

    describe("Insert Mutation", () => {
      // blockDef will be created from random input
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
        expect(result.parents).toEqual([])
        expect(result.children).toEqual([])
        expect(result.requestors).toEqual([])
        expect(result.responders).toEqual([])
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

      describe("With requestors", () => {
        const user = createRandomUserInput()
        beforeAll(async () => {
          await insertUser({ data: user })
        })

        afterAll(async () => {
          await deleteUserByPk({ id: user.id })
        })

        it("should insert with requestors replacing existing user_id (working with a warning)", async () => {
          const result = await insertBlockDef({
            data: {
              ...blockDef,
              requestors: {
                data: [{ user_id: user.id }],
              },
            },
          })
          expect(result.requestors[0].user_id).toBeUndefined()
          expect(result.requestors[0].user.id).toEqual(user.id)
        })
        it("should insert with requestors upserting an existing user (working with a warning, too long)", async () => {
          // data array assumes elements are being inserted.
          // [GraphQL Error]: Message: cannot proceed to insert object relation "user" since insert to table "users" affects zero rows,
          // Path: $.selectionSet.insert_blockDefs_one.args.object[0].requestors.data[0].user
          const result = await insertBlockDef({
            data: {
              ...blockDef,
              requestors: {
                data: [
                  {
                    user: {
                      data: user,
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
          expect(result.requestors[0].user_id).toBeUndefined()
          expect(result.requestors[0].user.id).toEqual(user.id)
        })
        it("should insert with requestors while creating a new user (rarely used)", async () => {
          const user = createRandomUserInput()
          const result = await insertBlockDef({
            data: {
              ...blockDef,
              requestors: {
                data: [{ user: { data: user } }],
              },
            },
          })
          expect(result.requestors[0].user.id).toEqual(user.id)
          await deleteUserByPk({ id: user.id })
        })
      })

      describe("With responders", () => {
        const user = createRandomUserInput()
        beforeAll(async () => {
          await insertUser({ data: user })
        })

        afterAll(async () => {
          await deleteUserByPk({ id: user.id })
        })
        it("should insert with responders replacing existing user_id (working with a warning)", async () => {
          const result = await insertBlockDef({
            data: {
              ...blockDef,
              responders: {
                data: [{ user_id: user.id }],
              },
            },
          })
          expect(result.responders[0].user_id).toBeUndefined()
          expect(result.responders[0].user.id).toEqual(user.id)
        })
        it("should insert with responders upserting an existing user (working with a warning, too long)", async () => {
          // data array assumes elements are being inserted.
          // [GraphQL Error]: Message: cannot proceed to insert object relation "user" since insert to table "users" affects zero rows,
          // Path: $.selectionSet.insert_blockDefs_one.args.object[0].responders.data[0].user
          const result = await insertBlockDef({
            data: {
              ...blockDef,
              responders: {
                data: [
                  {
                    user: {
                      data: user,
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
          expect(result.responders[0].user_id).toBeUndefined()
          expect(result.responders[0].user.id).toEqual(user.id)
        })
        it("should insert with responders while creating a new user (rarely used)", async () => {
          const user = createRandomUserInput()
          const result = await insertBlockDef({
            data: {
              ...blockDef,
              responders: {
                data: [{ user: { data: user } }],
              },
            },
          })
          expect(result.responders[0].user.id).toEqual(user.id)
          await deleteUserByPk({ id: user.id })
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
          expect(result.root_id).toEqual(root.id)
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
          expect(result.root_id).toEqual(root.id)
          await deleteBlockDefByPk({ id: blockDef.id })
          await deleteBlockDefByPk({ id: root.id })
        })
      })

      describe("With parent", () => {
        const parent = createRandomBlockDefInput()
        it("can connect with existing parent_id", async () => {
          const parentResult = await insertBlockDef({ data: { ...parent } })
          const result = await insertBlockDef({
            data: {
              ...blockDef,
              parents: {
                data: [
                  {
                    parent_id: parent.id,
                    sibling_order: 1,
                  },
                ],
              },
            },
          })
          expect(result.parents[0].parent.id).toEqual(parent.id)
          await deleteBlockDefByPk({ id: blockDef.id })
          await deleteBlockDefByPk({ id: parent.id })
        })
        it("should insert while creating a new parent (rarely used)", async () => {
          const result = await insertBlockDef({
            data: {
              ...blockDef,
              parents: { data: [{ parent: { data: parent } }] },
            },
          })
          expect(result.parents[0].parent.id).toEqual(parent.id)
          await deleteBlockDefByPk({ id: blockDef.id })
          await deleteBlockDefByPk({ id: parent.id })
        })
      })

      describe("With children", () => {
        const child1 = createRandomBlockDefInput()
        const child2 = createRandomBlockDefInput()
        it("can connect with existing children", async () => {
          // upsert won't return any children ids
          const child1Result = await insertBlockDef({ data: { ...child1 } })
          const child2Result = await insertBlockDef({ data: { ...child2 } })
          const result = await insertBlockDef({
            data: {
              ...blockDef,
              children: {
                data: [
                  { child_id: child1.id, sibling_order: 1 },
                  { child_id: child2.id, sibling_order: 2 },
                ],
              },
            },
          })
          expect(result.children.length).toBeGreaterThan(0)
          await deleteBlockDefByPk({ id: blockDef.id })
          await deleteBlockDefByPk({ id: child1.id })
          await deleteBlockDefByPk({ id: child2.id })
        })
        it("should insert while creating new children", async () => {
          const result = await insertBlockDef({
            data: {
              ...blockDef,
              children: {
                data: [
                  { child: { data: child1 }, sibling_order: 1 },
                  { child: { data: child2 }, sibling_order: 2 },
                ],
              },
            },
          })
          expect(result.children.length).toEqual(2)
          await deleteBlockDefByPk({ id: blockDef.id })
          await deleteBlockDefByPk({ id: child1.id })
          await deleteBlockDefByPk({ id: child2.id })
        })
      })
    })

    describe("Update Mutation", () => {
      beforeEach(async () => {
        await insertBlockDef({ data: blockDef })
      })

      afterEach(async () => {
        await deleteBlockDefByPk({ id: blockDef.id })
      })

      it.skip("should not update id, it's unexpected", async () => {
        const result = await updateBlockDefByPk({
          id: blockDef.id,
          data: { id: "invalid" },
        })
        expect(result).toBeUndefined()
        await deleteBlockDefByPk({ id: "invalid" })
      })
      it("should not update unexistent field", async () => {
        const name = "Bell " + Math.floor(Math.random() * 10)
        const result = await updateBlockDefByPk({
          id: blockDef.id,
          data: { lable: name },
        })
        expect(result).toBeUndefined()
      })
      it("should update name", async () => {
        const name = "Bell " + Math.floor(Math.random() * 10)
        const result = await updateBlockDefByPk({
          id: blockDef.id,
          data: { name },
        })
        expect(result.name).toEqual(name)
      })
      it("should update state", async () => {
        const state = "Published"
        const result = await updateBlockDefByPk({
          id: blockDef.id,
          data: { state },
        })
        expect(result.state).toEqual(state)
        expect(result.blockDefState.value).toEqual(state)
      })
      it("should not allow invalid state enum value", async () => {
        const state = "invalid"
        const result = await updateBlockDefByPk({
          id: blockDef.id,
          data: { state },
        })
        expect(result).toBeUndefined()
      })
      it("is able to update type (but undesired)", async () => {
        const type = "API"
        const result = await updateBlockDefByPk({
          id: blockDef.id,
          data: { type },
        })
        expect(result.type).toEqual(type)
        expect(result.blockType.value).toEqual(type)
      })
      it("should not allow invalid type enum value", async () => {
        const type = "invalid"
        const result = await updateBlockDefByPk({
          id: blockDef.id,
          data: { type },
        })
        expect(result).toBeUndefined()
      })

      describe("Update blockDef_requestor", () => {
        const user = createRandomUserInput()
        beforeEach(async () => {
          await insertUser({ data: user })
        })

        afterEach(async () => {
          await deleteUserByPk({ id: user.id })
        })
        it("should add and remove requestor via blockDef_requestor", async () => {
          const insertResult = await insertBlockDefRequestor({
            data: {
              blockDef_id: blockDef.id,
              user_id: user.id,
            },
          })
          expect(insertResult.blockDef.requestors[0].user_id).toEqual(user.id)
          const deleteResult = await deleteBlockDefRequestorByPk({
            blockDef_id: blockDef.id,
            user_id: user.id,
          })
          expect(deleteResult.blockDef.requestors).toEqual([])
        })
      })

      describe("Update root", () => {
        const root = createRandomBlockDefInput()
        beforeEach(async () => {
          await insertBlockDef({ data: root })
        })

        afterEach(async () => {
          await deleteBlockDefByPk({ id: root.id })
        })
        it("should connect to an existing root (don't usually happen though)", async () => {
          const result = await updateBlockDefByPk({
            id: blockDef.id,
            data: { root_id: root.id },
          })
          expect(result.root.id).toEqual(root.id)
          expect(result.root_id).toEqual(root.id)
          // clean up
          await updateBlockDefByPk({
            id: blockDef.id,
            data: { root_id: null },
          })
        })
      })

      describe("Update parent", () => {
        const parent = createRandomBlockDefInput()
        beforeEach(async () => {
          await insertBlockDef({ data: parent })
        })

        afterEach(async () => {
          await deleteBlockDefByPk({ id: parent.id })
        })
        it("should connect to an existing parent", async () => {
          const result = await insertBlockDefParentChild({
            data: {
              parent_id: parent.id,
              child_id: blockDef.id,
            },
          })
          expect(result.parent_id).toEqual(parent.id)

          const parentResult = await getBlockDefByPk(parent.id)
          expect(parentResult.children.length).toEqual(1)

          // clean up
          await updateBlockDefByPk({
            id: blockDef.id,
            data: {
              parent_id: null,
            },
          })
        })
      })

      describe("Update children", () => {
        const child = createRandomBlockDefInput()
        beforeEach(async () => {
          await insertBlockDef({ data: child })
        })

        afterEach(async () => {
          await deleteBlockDefByPk({ id: child.id })
        })
        it("cannot connect to existing children via children's parent id ", async () => {
          const childResult = await updateBlockDefByPk({
            id: child.id,
            data: {
              parents: { data: [{ parent_id: blockDef.id }] },
            },
          })
          expect(childResult).toBeUndefined()
        })

        it("should connect to existing children using multiple mutations (correct solution)", async () => {
          const result = await insertBlockDefParentChild({
            data: {
              parent_id: blockDef.id,
              child_id: child.id,
            },
          })
          expect(result.parent_id).toEqual(blockDef.id)
          expect(result.child_id).toEqual(child.id)
        })
        it("should remove existing children using multiple mutations (correct solution)", async () => {
          const insertResult = await insertBlockDefParentChild({
            data: {
              parent_id: blockDef.id,
              child_id: child.id,
            },
          })
          const result = await deleteBlockDefParentChildByPk({
            parent_id: blockDef.id,
            child_id: child.id,
          })
          expect(result.parent_id).toEqual(blockDef.id)
          expect(result.child_id).toEqual(child.id)
        })
      })
    })
  })
})
