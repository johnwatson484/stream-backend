import 'log-timestamp'
import { Server } from '@hapi/hapi'
import { init as initDatabase } from './data/postgres.js'
import { createServer } from './server.js'

async function init (): Promise<void> {
  await initDatabase()
  const server: Server = await createServer()
  await server.start()
  console.log('Server running on %s', server.info.uri)
}

process.on('unhandledRejection', (err: Error) => {
  console.log(err)
  process.exit(1)
})

init()
