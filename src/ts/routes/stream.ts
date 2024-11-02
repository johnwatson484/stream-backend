import { ServerRoute, Request, ResponseToolkit, ResponseObject } from '@hapi/hapi'
import { getUsers, getUsersByPage, User } from '../data/postgres.js'
import { Readable } from 'stream'

const routes: ServerRoute[] = [{
  method: 'GET',
  path: '/postgres',
  handler: async (_request: Request, h: ResponseToolkit): Promise<ResponseObject> => {
    const users: User[] = await getUsers()
    return h.response({ data: users })
  },
}, {
  method: 'GET',
  path: '/postgres/stream',
  handler: async (_request: Request, h: ResponseToolkit): Promise<ResponseObject> => {
    let page = 1
    const stream: Readable = new Readable({
      async read (_size) {
        const users: User[] = await getUsersByPage(page)
        if (users.length === 0) {
          this.push(null) // End the stream
        }
        this.push(JSON.stringify({ data: users }))
        page++
      }
    })

    return h.response(stream)
  },
}, {
  method: 'GET',
  path: '/csv/stream',
  handler: async (_request: Request, h: ResponseToolkit): Promise<ResponseObject> => {
    let page = 1
    const stream: Readable = new Readable({
      async read (_size) {
        const users: User[] = await getUsersByPage(page)
        if (users.length === 0) {
          this.push(null) // End the stream
        }
        const csvData: string = users.map((row: any) => {
          return `${Object.values(row).map(value => {
            if (value instanceof Date) {
              return value.toISOString()
            }
            return value
          }).join(',')}\n`
        }).join('')
        this.push(csvData)
        page++
      }
    })

    return h.response(stream)
  },
}]

export default routes
