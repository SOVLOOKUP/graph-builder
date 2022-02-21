import { App } from "vue"
import type FuncType from '../lib/worker'
import { spawn, Worker } from 'threads'
import { useConfigStore } from "../store"

const workers = await spawn<typeof FuncType>(new Worker("/worker.es.js"))

export default {
    install: async (Vue: App<any>) => {
        await workers._init(useConfigStore().serverBaseUrl)
        Vue.provide("worker", workers)
    }
}

export { workers }