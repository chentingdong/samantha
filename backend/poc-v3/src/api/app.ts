import { use, settings, server, log, schema } from 'nexus'
import { prisma } from 'nexus-plugin-prisma'
import { auth } from '../plugins/jwt-auth'
import { shield } from 'nexus-plugin-shield'
import { APP_SECRET } from './utils'
import { rules } from './permissions'
import cors from 'cors'

settings.change({ logger: { level: 'debug', pretty: true } })

server.express.use(cors())

// Enables the Prisma plugin
use(prisma())

// Enables the JWT Auth plugin
use(auth({ appSecret: APP_SECRET }))

// Enables the Shield plugin
use(shield({ rules, options: { allowExternalErrors: true } }))
