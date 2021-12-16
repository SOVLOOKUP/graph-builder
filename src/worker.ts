import { expose } from 'threads/worker'
import apis from './lib/workers/apis'
expose(apis)
