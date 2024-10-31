import { Server, ServerRoute } from '@hapi/hapi'
import stream from '../routes/stream.js'
import health from '../routes/health.js'

const plugin: any = {
  plugin: {
    name: 'router',
    register: (server: Server) => {
      server.route(new Array<ServerRoute>().concat(
        stream,
        health
      ))
    },
  },
}

export default plugin
