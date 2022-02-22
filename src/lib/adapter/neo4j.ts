import type { GraphDBAdapter } from 'src/types'

// [2 todo] neo4j 驱动
const adapter = (config: object): GraphDBAdapter<string, string> => ({
    nodeProcessor: async (tx) => {
        // console.log(tx)
        return {
            result: '',
            status: 'success',
        }
    },
    edgeProcessor: async (tx, from, to) => {
        // console.log(tx, from.tx, to)
        return {
            result: '',
            status: 'success',
        }
    },
})

export default {
    configSchema: {},
    adapter,
}
