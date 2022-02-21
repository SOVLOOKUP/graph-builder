import type { GraphDBAdapter } from 'src/types'

// todo neo4j 驱动
const adapter = (config: object): GraphDBAdapter<string, string> => ({
    nodeProcessor: async (node) => ({
        result: '',
        status: 'success',
    }),
    edgeProcessor: async (edge, from, to) => ({
        result: '',
        status: 'success',
    }),
})

export default {
    configSchema: {},
    adapter
}
