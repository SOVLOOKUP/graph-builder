import type {
    EdgeTask,
    FromTo,
    GraphDBAdapter,
    NodeTask,
    TaskMeta,
} from 'src/types'
import { strapi } from '.'
import neo4j from '../adapter/neo4j'

interface TaskParams {
    taskID: number
    db: {
        type: 'neo4j',
        config: object
    }
}

// 1. 读取实体数据转换为目标格式<写入到图数据库> 入参: 实体数据 返回: 数据库返回
// 2. 读取关系数据转换为目标格式<根据实体返回的 ID 写入关系数据到图数据库> 入参: 关系数据 + 两头实体返回 返回: 数据库返回
// todo 外部可观测
class Task {
    private params: TaskParams
    private taskMeta!: TaskMeta
    private adapter!: GraphDBAdapter<any, any>

    constructor(params: TaskParams) {
        this.params = params
    }

    private getTaskMeta = async (id: number) => {
        return (
            await strapi.findOne<{ attributes: { taskMeta: TaskMeta } }>(
                'gi-tasks',
                id,
                {
                    fields: ['taskMeta'],
                },
            )
        ).data.attributes.taskMeta
    }

    _init = async () => {
        // 获取任务信息
        this.taskMeta = await this.getTaskMeta(this.params.taskID)

        // 初始化图数据库适配器
        switch (this.params.db.type) {
            case 'neo4j':
                this.adapter = neo4j.adapter(this.params.db.config)
                break
            default:
                throw Error(`Not supported database type ${this.params.db.type}`)
        }

        return this
    }

    private nodeTaskProcessor = async (nodeTask: NodeTask) => {
        // todo 读取数据得到 Raw
        nodeTask
        const nodeRaw: object[] = []
        for (const item of nodeRaw) {
            // todo 转换数据格式到目标格式
            this.taskMeta.categories
            const newItem = item
            // 写入到图数据库
            const res = await this.adapter.nodeProcessor(newItem)
            // todo 将返回值按 UUID 保存到 indexeddb
            res
        }
    }

    private edgeTaskProcessor = async (edgeTask: EdgeTask) => {
        // todo 读取数据得到 Raw
        edgeTask
        const nodeRaw: object[] = []
        for (const item of nodeRaw) {
            // todo 转换数据格式到目标格式
            this.taskMeta.categories
            const newItem = item
            // todo 取得 source 和 target 的内容
            const from: FromTo<any> = {
                node: {} as any,
                field: '',
            }
            const to: FromTo<any> = {
                node: {} as any,
                field: '',
            }
            // 写入到图数据库
            const res = await this.adapter.edgeProcessor(newItem, from, to)
            // todo 将返回值按 UUID 保存到 indexeddb
            res
        }
    }

    start = async () => {
        // todo 改用池批量处理
        // 先处理 node
        for (const nodeTask of this.taskMeta.nodeTasks) {
            await this.nodeTaskProcessor(nodeTask)
        }
        // 再处理 edge
        for (const edgeTask of this.taskMeta.edgeTasks) {
            await this.edgeTaskProcessor(edgeTask)
        }
        console.log("ok");
    }
}

const startTask = async (
    params: TaskParams,
) => {
    const task = await new Task(params)._init()
    return await task.start()
}

export default {
    startTask,
}
