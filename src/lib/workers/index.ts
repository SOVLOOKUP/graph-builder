import apis from './apis'
import { spawn, Worker } from 'threads'

const entrypoint = '/worker/index.es.js'
const workers = await spawn<typeof apis>(new Worker(entrypoint))

export default workers
