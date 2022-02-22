import { expose } from 'threads/worker'
import funcs from './lib/worker/funcs'

expose(funcs)