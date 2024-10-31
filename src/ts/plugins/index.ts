import { Server } from '@hapi/hapi'
import logging from './logging.js'
import router from './router.js'
import config from '../config.js'

async function registerPlugins (server: Server): Promise<void> {
  const plugins: any[] = [
    logging,
    router,
  ]

  if (config.get('isDev')) {
    const Blipp = await import('blipp')
    plugins.push(Blipp)
  }

  await server.register(plugins)
}

export { registerPlugins }
