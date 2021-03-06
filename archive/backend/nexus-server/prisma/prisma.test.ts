import { PrismaClient } from '@prisma/client'
import { seedUsers, seedCatalog, cleanUp } from './seed'

describe('Test Prisma', () => {
  const db = new PrismaClient()

  afterAll((done) => {
    db.disconnect()
    done()
  })

  // it('should be able to clean up', async () => {
  //   await cleanUp(db)
  //   const userCount = await db.user.count()
  //   const blockCount = await db.block.count()
  //   const blockDefCount = await db.blockDef.count()

  //   expect(userCount).toEqual(0)
  //   expect(blockCount).toEqual(0)
  //   expect(blockDefCount).toEqual(0)
  // })

  it('should not fail', async () => {
    const blockDef = await db.blockDef.findOne({
      where: {
        id: '2b989bcd-37b4-45b9-b923-2382e9a3c8b',
      },
    })
    expect(blockDef).toEqual(null)
  })
})
