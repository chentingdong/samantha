import { getBellByPk, getBlockByPk } from "../graphql"
describe("GraphQL", () => {
  describe("Queries", () => {
    it("should return single bell by pk", async () => {
      const bell_id = "s4Uq5-3xUX5bljHUIJMLW"
      const result = await getBellByPk(bell_id)
      expect(result.id).toEqual(bell_id)
      expect(result.root_block_id).toBeDefined()
      expect(result.sub_bells.length).toBeGreaterThanOrEqual(0)
      expect(result.user_participations.length).toBeGreaterThanOrEqual(0)
      expect(result.bellhop_participations.length).toBeGreaterThanOrEqual(0)
      expect(result.bell_executors.length).toBeGreaterThanOrEqual(0)
    })
    it("should return single block by pk", async () => {
      // this is a Goal
      const block_id = "bVeXuHvMlUVpbM2e4zMy9"
      const result = await getBlockByPk(block_id)
      expect(result.id).toEqual(block_id)
      expect(result.local_id).toBeDefined()
      expect(result.type).toBeDefined()
      expect(result.user_participations.length).toBeGreaterThanOrEqual(0)
      expect(result.goal).toBeDefined()
      expect(result.goal.id).toBeDefined()
      expect(result.task).toBeNull()
      expect(result.bell_executor).toBeNull()
      expect(result.children.length).toBeGreaterThanOrEqual(0)
    })
  })
  describe("Mutations", () => {})
})
