import { inject } from "vue"
import type { apis } from "./worker"

const useWorker = () =>
    (inject("worker") as typeof apis)

export { useWorker }