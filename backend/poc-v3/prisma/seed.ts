import { PrismaClient } from '@prisma/client'
import { BlockType, State } from '@prisma/client'

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
        name: 'Parallel Container',
        description: 'Default container which runs child blocks in parallel',
        type: BlockType.COMPOSITE_PARALLEL,
        inCatalog: true,
      },
      {
        name: 'Sequential Container',
        description:
          'Sequential container which runs child blocks sequentially',
        type: BlockType.COMPOSITE_SEQUENTIAL,
        inCatalog: true,
      },
      {
        name: 'Gather Info Form',
        description: 'Gather Information from Responders',
        type: BlockType.LEAF_FORM,
        inCatalog: true,
      },
      {
        name: 'Approval Form',
        description: 'Ask for Approval',
        type: BlockType.LEAF_FORM,
        inCatalog: true,
      },
      {
        name: 'Dummy API',
        description: 'Dummy API',
        type: BlockType.LEAF_API,
        inCatalog: true,
      },
      {
        name: 'Status Update Request Sequential',
        description:
          'Status Update which gathers information and gets approval',
        type: BlockType.COMPOSITE_SEQUENTIAL,
        inCatalog: true,
        children: {
          create: [
            {
              name: 'Gather Info Form',
              description: 'Gather Information from Responders',
              type: BlockType.LEAF_FORM,
              inCatalog: false,
              state: State.ACTIVE,
            },
            {
              name: 'Approval Form',
              description: 'Ask for Approval',
              type: BlockType.LEAF_FORM,
              inCatalog: false,
              state: State.PENDING,
            },
          ],
        },
      },
      {
        name: 'Status Update Request Parallel',
        description:
          'Status Update which gathers information and gets approval',
        type: BlockType.COMPOSITE_PARALLEL,
        inCatalog: true,
        children: {
          create: [
            {
              name: 'Gather Info Form',
              description: 'Gather Information from Responders',
              type: BlockType.LEAF_FORM,
              inCatalog: false,
              state: State.ACTIVE,
            },
            {
              name: 'Approval Form',
              description: 'Ask for Approval',
              type: BlockType.LEAF_FORM,
              inCatalog: false,
              state: State.ACTIVE,
            },
          ],
        },
      },
      {
        name: 'Status Update Request Parallel -> Sequential',
        description:
          'Status Update which gathers information and gets approval',
        type: BlockType.COMPOSITE_PARALLEL,
        inCatalog: true,
        children: {
          create: [
            {
              name: 'Status Update Request',
              description:
                'Status Update which gathers information and gets approval',
              type: BlockType.COMPOSITE_SEQUENTIAL,
              inCatalog: false,
              children: {
                create: [
                  {
                    name: 'Gather Info Form',
                    description: 'Gather Information from Responders',
                    type: BlockType.LEAF_FORM,
                    inCatalog: false,
                    state: State.ACTIVE,
                  },
                  {
                    name: 'Approval Form',
                    description: 'Ask for Approval',
                    type: BlockType.LEAF_FORM,
                    inCatalog: false,
                    state: State.PENDING,
                  },
                ],
              },
            },
            {
              name: 'Approval Form',
              description: 'Ask for Approval',
              type: BlockType.LEAF_FORM,
              inCatalog: false,
              state: State.ACTIVE,
            },
          ],
        },
      },
      {
        name: 'Status Update Request Sequential -> Parallel',
        description:
          'Status Update which gathers information and gets approval',
        type: BlockType.COMPOSITE_SEQUENTIAL,
        inCatalog: true,
        children: {
          create: [
            {
              name: 'Status Update Request',
              description:
                'Status Update which gathers information and gets approval',
              type: BlockType.COMPOSITE_PARALLEL,
              inCatalog: false,
              children: {
                create: [
                  {
                    name: 'Gather Info Form',
                    description: 'Gather Information from Responders',
                    type: BlockType.LEAF_FORM,
                    inCatalog: false,
                    state: State.ACTIVE,
                  },
                  {
                    name: 'Approval Form',
                    description: 'Ask for Approval',
                    type: BlockType.LEAF_FORM,
                    inCatalog: false,
                    state: State.ACTIVE,
                  },
                ],
              },
            },
            {
              name: 'Approval Form',
              description: 'Ask for Approval',
              type: BlockType.LEAF_FORM,
              inCatalog: false,
              state: State.PENDING,
            },
          ],
        },
      },
    ].map((data) => db.block.create({ data })),
  )

  console.log('Seeded: %j', results)
}

const main = async () => {
  await seedUsers()
  await seedCatalog()
  db.disconnect()
}

main()