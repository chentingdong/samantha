import { use, settings, server, log, schema } from 'nexus'
import { prisma } from 'nexus-plugin-prisma'
import { auth } from 'nexus-plugin-jwt-auth'
import { shield } from 'nexus-plugin-shield'
import { APP_SECRET } from './utils'
import { rules } from './permissions'
import cors from 'cors'
import * as Sentry from '@sentry/node'

Sentry.init({
  dsn:
    'https://d866f1d7be1542138ab4a52e41ecf622@o405323.ingest.sentry.io/5270750',
})

settings.change({ logger: { filter: { level: 'debug' }, pretty: true } })

server.express.use(Sentry.Handlers.requestHandler())

server.express.use(Sentry.Handlers.errorHandler())

server.express.use(cors())

// Enables the Prisma plugin
use(prisma())

// Enables the JWT Auth plugin
use(auth({ appSecret: APP_SECRET }))

// Enables the Shield plugin
use(shield({ rules, options: { allowExternalErrors: true } }))
