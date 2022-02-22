import { expose } from 'threads/worker'
import taskProcessor from './lib/worker/taskProcess'

expose(taskProcessor)