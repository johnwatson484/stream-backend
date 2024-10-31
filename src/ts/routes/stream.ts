import { ServerRoute, Request, ResponseToolkit, ResponseObject } from '@hapi/hapi'
import { getUsers, User } from '../data/postgres.js'

const routes: ServerRoute[] = [{
  method: 'GET',
  path: '/stream/postgres',
  handler: async (_request: Request, h: ResponseToolkit): Promise<ResponseObject> => {
    const users: User[] = await getUsers()
    return h.response({ data: users })
  },
}, {
  method: 'GET',
  path: '/stream/csv',
  handler: (_request: Request, h: ResponseToolkit): ResponseObject => {
    return h.response('ok')
  },
}]

export default routes
