import funcs from './funcs'
import { spawn, Worker } from 'threads'

const workers = await spawn<typeof funcs>(new Worker("/worker.es.js"))

export default workers