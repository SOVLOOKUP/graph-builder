import { inject } from "vue"
import type funcs from "./worker"

const useWorker = () =>
    inject("worker") as typeof funcs

export { useWorker }