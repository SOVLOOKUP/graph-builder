import { App } from "vue"
import type FuncType from '../lib/worker'
import { spawn, Worker } from 'threads'

const workers = await spawn<typeof FuncType>(new Worker("/worker.es.js"))

export default {
    install: (Vue: App<any>) => {
        Vue.provide("worker", workers)
    }
}