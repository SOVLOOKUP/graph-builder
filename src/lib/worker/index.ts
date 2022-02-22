import taskProcess from './taskProcess'
import { spawn, Worker } from 'threads'

const workers = await spawn<typeof taskProcess>(new Worker("/worker.es.js"))

export default workers