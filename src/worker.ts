import { expose } from 'threads/worker'
import funcs from './lib/worker'

expose(funcs)