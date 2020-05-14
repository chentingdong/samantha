import { use } from 'nexus'
import { prisma } from 'nexus-plugin-prisma'
import { auth } from '../plugins/jwt-auth'
import { shield } from 'nexus-plugin-shield'
import { APP_SECRET } from './utils'
import { rules } from './permissions'
import { settings } from 'nexus'
import cors from 'cors'
import { server } from 'nexus'

server.express.use(cors())

// Enables the Prisma plugin
use(prisma())

// Enables the JWT Auth plugin
use(auth({ appSecret: APP_SECRET }))

// Enables the Shield plugin
use(shield({ rules }))

settings.change({
  logger: {
    level: 'debug',
  },
})
