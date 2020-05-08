import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

main()

async function main() {
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

  db.disconnect()
}
