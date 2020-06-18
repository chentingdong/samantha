import { PrismaClient } from '@prisma/client'
import { BlockType, State } from '@prisma/client'
import uuid from 'uuid'

const deleteUsers = async (db: PrismaClient) => {
  const { count } = await db.user.deleteMany({ where: {} })
  console.log(`Deleted ${count} users.`)
}

const deleteBlocks = async (db: PrismaClient) => {
  const { count } = await db.block.deleteMany({ where: {} })
  console.log(`Deleted ${count} blocks.`)
}

const deleteBlockDefs = async (db: PrismaClient) => {
  const { count } = await db.blockDef.deleteMany({ where: {} })
  console.log(`Deleted ${count} blockDefs.`)
}

const cleanUp = async (db: PrismaClient) => {
  await deleteUsers(db)
  await deleteBlocks(db)
  await deleteBlockDefs(db)
}

const seedUsers = async (db: PrismaClient) => {
  const results = await Promise.all(
    [
      {
        id: 'Google_111918078641246610063',
        name: 'Baiji He',
        email: 'bhe@bellhop.io',
      },
      {
        id: 'Google_109551792009621810100',
        name: 'Adam Hiatt',
        email: 'ahiatt@bellhop.io',
      },
      {
        id: 'Google_115419186368884878540',
        name: 'Tingdong Chen',
        email: 'tchen@bellhop.io',
      },
    ].map((data) => db.user.create({ data })),
  )

  console.log(`Seeded ${results.length} users: \n${JSON.stringify(results)}`)
}

const seedCatalog = async (db: PrismaClient) => {
  const results = await Promise.all(
    [
      {
        id: uuid.v4(),
        name: 'Parallel Container',
        description: 'Default container which runs child blocks in parallel',
        type: BlockType.COMPOSITE_PARALLEL,
      },
      {
        id: uuid.v4(),
        name: 'Sequential Container',
        description:
          'Sequential container which runs child blocks sequentially',
        type: BlockType.COMPOSITE_SEQUENTIAL,
      },
      {
        id: uuid.v4(),
        name: 'Gather Info Form',
        description: 'Gather Information from Responders',
        type: BlockType.LEAF_FORM,
        action: 'SpendRequestForm',
      },
      {
        id: uuid.v4(),
        name: 'Approval Form',
        description: 'Ask for Approval',
        type: BlockType.LEAF_FORM,
        action: 'SpendRequestApproval',
      },
      {
        id: uuid.v4(),
        name: 'Dummy API',
        description: 'Dummy API',
        type: BlockType.LEAF_API,
      },
      {
        id: uuid.v4(),
        name: 'Status Update Request Sequential',
        description:
          'Status Update which gathers information and gets approval',
        type: BlockType.COMPOSITE_SEQUENTIAL,
        children: {
          create: [
            {
              id: uuid.v4(),
              name: 'Gather Info Form',
              description: 'Gather Information from Responders',
              type: BlockType.LEAF_FORM,
            },
            {
              id: uuid.v4(),
              name: 'Approval Form',
              description: 'Ask for Approval',
              type: BlockType.LEAF_FORM,
            },
          ],
        },
      },
      {
        id: uuid.v4(),
        name: 'Status Update Request Parallel',
        description:
          'Status Update which gathers information and gets approval',
        type: BlockType.COMPOSITE_PARALLEL,
        children: {
          create: [
            {
              id: uuid.v4(),
              name: 'Gather Info Form',
              description: 'Gather Information from Responders',
              type: BlockType.LEAF_FORM,
            },
            {
              id: uuid.v4(),
              name: 'Approval Form',
              description: 'Ask for Approval',
              type: BlockType.LEAF_FORM,
            },
          ],
        },
      },
      {
        id: uuid.v4(),
        name: 'Status Update Request Parallel -> Sequential',
        description:
          'Status Update which gathers information and gets approval',
        type: BlockType.COMPOSITE_PARALLEL,
        children: {
          create: [
            {
              id: uuid.v4(),
              name: 'Status Update Request',
              description:
                'Status Update which gathers information and gets approval',
              type: BlockType.COMPOSITE_SEQUENTIAL,
              children: {
                create: [
                  {
                    id: uuid.v4(),
                    name: 'Gather Info Form',
                    description: 'Gather Information from Responders',
                    type: BlockType.LEAF_FORM,
                  },
                  {
                    id: uuid.v4(),
                    name: 'Approval Form',
                    description: 'Ask for Approval',
                    type: BlockType.LEAF_FORM,
                  },
                ],
              },
            },
            {
              id: uuid.v4(),
              name: 'Approval Form',
              description: 'Ask for Approval',
              type: BlockType.LEAF_FORM,
            },
          ],
        },
      },
      {
        id: uuid.v4(),
        name: 'Status Update Request Sequential -> Parallel',
        description:
          'Status Update which gathers information and gets approval',
        type: BlockType.COMPOSITE_SEQUENTIAL,
        children: {
          create: [
            {
              id: uuid.v4(),
              name: 'Status Update Request',
              description:
                'Status Update which gathers information and gets approval',
              type: BlockType.COMPOSITE_PARALLEL,
              children: {
                create: [
                  {
                    id: uuid.v4(),
                    name: 'Gather Info Form',
                    description: 'Gather Information from Responders',
                    type: BlockType.LEAF_FORM,
                  },
                  {
                    id: uuid.v4(),
                    name: 'Approval Form',
                    description: 'Ask for Approval',
                    type: BlockType.LEAF_FORM,
                  },
                ],
              },
            },
            {
              id: uuid.v4(),
              name: 'Approval Form',
              description: 'Ask for Approval',
              type: BlockType.LEAF_FORM,
            },
          ],
        },
      },
    ].map((data) => db.blockDef.create({ data })),
  )
  console.log(
    `Seeded ${results.length} blockDefs: \n${JSON.stringify(results)}`,
  )
}

const seedBlocks = async (db: PrismaClient) => {
  const results = await Promise.all(
    [
      {
        id: uuid.v4(),
        name: 'Status Update Request Parallel -> Sequential',
        description:
          'Status Update which gathers information and gets approval',
        type: BlockType.COMPOSITE_PARALLEL,
        state: State.ACTIVE,
        control: '',
        context: '',
        parent: {},
        children: {
          create: [
            {
              id: uuid.v4(),
              name: 'Gather Info Form',
              description: 'Gather Information from Responders',
              type: BlockType.LEAF_FORM,
            },
            {
              id: uuid.v4(),
              name: 'Approval Form',
              description: 'Ask for Approval',
              type: BlockType.LEAF_FORM,
            },
          ],
        },
        requestors: {
          connect: [
            {
              id: 'Google_115419186368884878540',
            },
          ],
        },
        responders: {
          connect: [
            {
              id: 'Google_115419186368884878540',
            },
          ],
        },
      },
    ].map((data) => db.block.create({ data })),
  )

  console.log(`Seeded ${results.length} blocks: \n${JSON.stringify(results)}`)
}
const main = async () => {
  const db = new PrismaClient()
  await cleanUp(db)
  await seedUsers(db)
  await seedCatalog(db)
  await seedBlocks(db)
  db.disconnect()
}

if (require.main === module) {
  main()
}

export { cleanUp, seedUsers, seedCatalog, deleteBlocks }
