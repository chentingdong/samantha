import { nanoid } from "nanoid"
import { deleteUserByPk } from "../mutations/deleteUserByPk"
import { insertUser } from "../mutations/insertUser"
import { getBlockState } from "../queries/getBlockState"
import { getBlocks } from "../queries/getBlocks"
import { getBlock } from "../queries/getBlock"
import { getBlockByPk } from "../queries/getBlockByPk"
import { getBlocksAggregate } from "../queries/getBlocksAggregate"
import { updateBlockByPk } from "../mutations/updateBlockByPk"
import { insertBlock } from "../mutations/insertBlock"
import { deleteBlockByPk } from "../mutations/deleteBlockByPk"
import { insertBlockRequestor } from "../mutations/insertBlockRequestor"
import { deleteBlockRequestorByPk } from "../mutations/deleteBlockRequestorByPk"
import { createRandomUserInput, createRandomBlockInput } from "./utils"
import { insertBlockParentChild } from "../mutations/insertBlockParentChild"
import { deleteBlockParentChildByPk } from "../mutations/deleteBlockParentChildByPk"

describe("GraphQL", () => {
  describe("blocks", () => {
    const block = createRandomBlockInput()

    describe("Query", () => {
      beforeAll(async () => {
        await insertBlock({ data: block })
      })

      afterAll(async () => {
        await deleteBlockByPk({ id: block.id })
      })

      it("should return blocks", async () => {
        const result = await getBlocks()
        expect(result.length).toBeGreaterThanOrEqual(0)
      })
      it("should return single block", async () => {
        const result = await getBlock(block.id)
        expect(result.length).toEqual(1)
      })
      it("should return single block by pk", async () => {
        const result = await getBlockByPk(block.id)
        expect(result.name).toBeDefined()
      })
      it("should return blocks aggregate", async () => {
        const result = await getBlocksAggregate()
        expect(result.aggregate.count).toBeGreaterThan(0)
      })
    })

    describe("Insert Mutation", () => {
      // block will be created from random input
      afterEach(async () => {
        await deleteBlockByPk({ id: block.id })
      })

      it("should fail if not-nullable columns are not provided", async () => {
        const result = await insertBlock({
          data: { id: block.id, name: block.name },
        })
        expect(result).toBeUndefined()
      })
      it("should insert without relationship", async () => {
        const result = await insertBlock({
          data: block,
        })
        expect(result.id).toEqual(block.id)
        expect(result.root).toEqual(null)
        expect(result.parents).toEqual([])
        expect(result.children).toEqual([])
        expect(result.requestors).toEqual([])
        expect(result.responders).toEqual([])
      })
      it("should validate block state enum", async () => {
        // [GraphQL Error]: Message: unexpected value "Invalid" for enum: 'blockState_enum', Path: $.variableValues.object.state
        const result = await insertBlock({
          data: {
            ...block,
            state: "Invalid",
          },
        })
        expect(result).toBeUndefined()
      })
      it("should validate block type enum", async () => {
        // [GraphQL Error]: Message: unexpected value "Invalid" for enum: 'blockType_enum', Path: $.variableValues.object.type
        const result = await insertBlock({
          data: {
            ...block,
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
          const result = await insertBlock({
            data: {
              ...block,
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
          // Path: $.selectionSet.insert_blocks_one.args.object[0].requestors.data[0].user
          const result = await insertBlock({
            data: {
              ...block,
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
          const result = await insertBlock({
            data: {
              ...block,
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
          const result = await insertBlock({
            data: {
              ...block,
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
          // Path: $.selectionSet.insert_blocks_one.args.object[0].responders.data[0].user
          const result = await insertBlock({
            data: {
              ...block,
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
          const result = await insertBlock({
            data: {
              ...block,
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
        const root = createRandomBlockInput()
        it("should insert with root replacing existing root_id", async () => {
          const rootResult = await insertBlock({ data: { ...root } })
          const result = await insertBlock({
            data: {
              ...block,
              root_id: root.id,
            },
          })
          expect(result.root.id).toEqual(root.id)
          expect(result.root_id).toEqual(root.id)
          await deleteBlockByPk({ id: block.id })
          await deleteBlockByPk({ id: root.id })
        })
        it("should insert while creating a new root (rarely used)", async () => {
          const result = await insertBlock({
            data: {
              ...block,
              root: { data: { ...root } },
            },
          })
          expect(result.root.id).toEqual(root.id)
          expect(result.root_id).toEqual(root.id)
          await deleteBlockByPk({ id: block.id })
          await deleteBlockByPk({ id: root.id })
        })
      })

      describe("With parent", () => {
        const parent = createRandomBlockInput()
        it("can connect with existing parent_id", async () => {
          const parentResult = await insertBlock({ data: { ...parent } })
          const result = await insertBlock({
            data: {
              ...block,
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
          await deleteBlockByPk({ id: block.id })
          await deleteBlockByPk({ id: parent.id })
        })
        it("should insert while creating a new parent (rarely used)", async () => {
          const result = await insertBlock({
            data: {
              ...block,
              parents: { data: [{ parent: { data: parent } }] },
            },
          })
          expect(result.parents[0].parent.id).toEqual(parent.id)
          await deleteBlockByPk({ id: block.id })
          await deleteBlockByPk({ id: parent.id })
        })
      })

      describe("With children", () => {
        const child1 = createRandomBlockInput()
        const child2 = createRandomBlockInput()
        it("can not connect with existing children", async () => {
          // upsert won't return any children ids
          const child1Result = await insertBlock({ data: { ...child1 } })
          const child2Result = await insertBlock({ data: { ...child2 } })
          const result = await insertBlock({
            data: {
              ...block,
              children: {
                data: [
                  { child_id: child1.id, sibling_order: 1 },
                  { child_id: child2.id, sibling_order: 2 },
                ],
              },
            },
          })
          expect(result.children.length).toBeGreaterThan(0)
          await deleteBlockByPk({ id: block.id })
          await deleteBlockByPk({ id: child1.id })
          await deleteBlockByPk({ id: child2.id })
        })
        it("should insert while creating new children", async () => {
          const result = await insertBlock({
            data: {
              ...block,
              children: {
                data: [
                  { child: { data: child1 }, sibling_order: 1 },
                  { child: { data: child2 }, sibling_order: 2 },
                ],
              },
            },
          })
          expect(result.children.length).toEqual(2)
          await deleteBlockByPk({ id: block.id })
          await deleteBlockByPk({ id: child1.id })
          await deleteBlockByPk({ id: child2.id })
        })
      })
    })

    describe("Update Mutation", () => {
      beforeEach(async () => {
        await insertBlock({ data: block })
      })

      afterEach(async () => {
        await deleteBlockByPk({ id: block.id })
      })

      it.skip("should not update id, it's unexpected", async () => {
        const result = await updateBlockByPk({
          id: block.id,
          data: { id: "invalid" },
        })
        expect(result).toBeUndefined()
        await deleteBlockByPk({ id: "invalid" })
      })
      it("should not update unexistent field", async () => {
        const name = "Bell " + Math.floor(Math.random() * 10)
        const result = await updateBlockByPk({
          id: block.id,
          data: { lable: name },
        })
        expect(result).toBeUndefined()
      })
      it("should update name", async () => {
        const name = "Bell " + Math.floor(Math.random() * 10)
        const result = await updateBlockByPk({
          id: block.id,
          data: { name },
        })
        expect(result.name).toEqual(name)
      })
      it("should update state", async () => {
        const state = "Success"
        const result = await updateBlockByPk({
          id: block.id,
          data: { state },
        })
        expect(result.state).toEqual(state)
        expect(result.blockState.value).toEqual(state)
      })
      it("should not allow invalid state enum value", async () => {
        const state = "invalid"
        const result = await updateBlockByPk({
          id: block.id,
          data: { state },
        })
        expect(result).toBeUndefined()
      })
      it("is able to update type (but undesired)", async () => {
        const type = "API"
        const result = await updateBlockByPk({
          id: block.id,
          data: { type },
        })
        expect(result.type).toEqual(type)
        expect(result.blockType.value).toEqual(type)
      })
      it("should not allow invalid type enum value", async () => {
        const type = "invalid"
        const result = await updateBlockByPk({
          id: block.id,
          data: { type },
        })
        expect(result).toBeUndefined()
      })

      describe("Update block_requestor", () => {
        const user = createRandomUserInput()
        beforeEach(async () => {
          await insertUser({ data: user })
        })

        afterEach(async () => {
          await deleteUserByPk({ id: user.id })
        })
        it("should add and remove requestor via block_requestor", async () => {
          const insertResult = await insertBlockRequestor({
            data: {
              block_id: block.id,
              user_id: user.id,
            },
          })
          expect(insertResult.block.requestors[0].user_id).toEqual(user.id)
          const deleteResult = await deleteBlockRequestorByPk({
            block_id: block.id,
            user_id: user.id,
          })
          expect(deleteResult.block.requestors).toEqual([])
        })
      })

      describe("Update root", () => {
        const root = createRandomBlockInput()
        beforeEach(async () => {
          await insertBlock({ data: root })
        })

        afterEach(async () => {
          await deleteBlockByPk({ id: root.id })
        })
        it("should connect to an existing root (don't usually happen though)", async () => {
          const result = await updateBlockByPk({
            id: block.id,
            data: { root_id: root.id },
          })
          expect(result.root.id).toEqual(root.id)
          expect(result.root_id).toEqual(root.id)
          // clean up
          await updateBlockByPk({
            id: block.id,
            data: { root_id: null },
          })
        })
      })

      describe("Update parent", () => {
        const parent = createRandomBlockInput()
        beforeEach(async () => {
          await insertBlock({ data: parent })
        })

        afterEach(async () => {
          await deleteBlockByPk({ id: parent.id })
        })
        it("should connect to an existing parent", async () => {
          const result = await insertBlockParentChild({
            data: {
              parent_id: parent.id,
              child_id: block.id,
            },
          })
          expect(result.parent_id).toEqual(parent.id)

          const parentResult = await getBlockByPk(parent.id)
          expect(parentResult.children.length).toEqual(1)

          // clean up
          await updateBlockByPk({
            id: block.id,
            data: {
              parent_id: null,
            },
          })
        })
      })

      describe("Update children", () => {
        const child = createRandomBlockInput()
        beforeEach(async () => {
          await insertBlock({ data: child })
        })

        afterEach(async () => {
          await deleteBlockByPk({ id: child.id })
        })
        it("cannot connect to existing children via children's parent id ", async () => {
          const childResult = await updateBlockByPk({
            id: child.id,
            data: {
              parents: { data: [{ parent_id: block.id }] },
            },
          })
          expect(childResult).toBeUndefined()
        })

        it("should connect to existing children using multiple mutations (correct solution)", async () => {
          const result = await insertBlockParentChild({
            data: {
              parent_id: block.id,
              child_id: child.id,
            },
          })
          expect(result.parent_id).toEqual(block.id)
          expect(result.child_id).toEqual(child.id)
        })
        it("should remove existing children using multiple mutations (correct solution)", async () => {
          const insertResult = await insertBlockParentChild({
            data: {
              parent_id: block.id,
              child_id: child.id,
            },
          })
          const result = await deleteBlockParentChildByPk({
            parent_id: block.id,
            child_id: child.id,
          })
          expect(result.parent_id).toEqual(block.id)
          expect(result.child_id).toEqual(child.id)
        })
      })
    })
  })
})
