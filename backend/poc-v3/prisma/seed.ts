import { PrismaClient } from '@prisma/client'

import { BlockType } from '@prisma/client'

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
        description: 'parallel container by default.',
        type: BlockType.COMPOSITE_PARALLEL,
        inCatalog: true,
      },
      {
        name: 'Sequential Container',
        description: 'sequencial container that child blocks run sequencially.',
        type: BlockType.COMPOSITE_SEQUENTIAL,
        inCatalog: true,
      },
      {
        name: 'FORM 1',
        type: BlockType.LEAF_FORM,
        inCatalog: true,
      },
      {
        name: 'FORM 2',
        type: BlockType.LEAF_FORM,
        inCatalog: true,
      },
      {
        name: 'FORM 3',
        type: BlockType.LEAF_FORM,
        inCatalog: true,
      },
      {
        name: 'API 1',
        type: BlockType.LEAF_API,
        inCatalog: true,
      },
      {
        name: 'API 2',
        type: BlockType.LEAF_API,
        inCatalog: true,
      },
      {
        name: 'API 3',
        type: BlockType.LEAF_API,
        inCatalog: true,
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
