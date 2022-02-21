import type { GraphDBPlugin } from 'src/types'

// todo neo4j 驱动
const plugin = (config: object): GraphDBPlugin<string, string> => ({
    nodeProcessor: async (node) => ({
        result: '',
        status: 'success',
    }),
    edgeProcessor: async (edge) => ({
        result: '',
        status: 'success',
    }),
})

export default plugin
