import { PrismaClient } from '@prisma/client'
import { BlockType, State } from '@prisma/client'
import uuid from 'uuid'

const db = new PrismaClient()

const seedUsers = async () => {
  const results = await Promise.all(
    [
      {
        id: 'Google_111918078641246610063',
        name: 'Baiji He',
        email: 'bhe@bellhop.io',
      },
      {
        id: 'Google_103472621531484531270',
        name: 'Jin Wang',
        email: 'jwang@bellhop.io',
      },
      {
        id: 'Google_115419186368884878540',
        name: 'Tingdong Chen',
        email: 'tchen@bellhop.io',
      },
    ].map((data) => db.user.create({ data })),
  )

  console.log('Seeded: %j', results)
}

const seedCatalog = async () => {
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
      },
      {
        id: uuid.v4(),
        name: 'Approval Form',
        description: 'Ask for Approval',
        type: BlockType.LEAF_FORM,
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
  console.log('Seeded: %j', results)
}

const main = async () => {
  console.log(uuid.v4())
  await seedUsers()
  await seedCatalog()
  db.disconnect()
}

main()
