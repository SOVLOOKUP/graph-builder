import type {
    DataMap,
    EdgeTask,
    GraphDBAdapter,
    NodeTask,
    TaskMeta,
} from 'src/types'
import neo4j from '../adapter/neo4j'
import Strapi from 'strapi-sdk-js'
import { openDB, deleteDB, IDBPDatabase } from 'idb'

interface TaskFactoryParams {
    url: string
    db: {
        type: 'neo4j'
        config: object
    }
}

// 1. 读取实体数据转换为目标格式<写入到图数据库> 入参: 实体数据 返回: 数据库返回
// 2. 读取关系数据转换为目标格式<根据实体返回的 ID 写入关系数据到图数据库> 入参: 关系数据 + 两头实体返回 返回: 数据库返回
// todo 外部可观测
class TaskFactory {
    private params: TaskFactoryParams
    private taskMeta!: TaskMeta
    private adapter!: GraphDBAdapter<any, any>
    private strapi!: Strapi
    private db!: IDBPDatabase<unknown>

    constructor(params: TaskFactoryParams) {
        this.params = params
    }

    private getTaskMeta = async (id: number) =>
        (
            await this.strapi.findOne<{ attributes: { taskMeta: TaskMeta } }>(
                'gi-tasks',
                id,
                {
                    fields: ['taskMeta'],
                },
            )
        ).data.attributes.taskMeta

    private newTaskProcessor =
        (
            processor:
                | typeof this.adapter['nodeProcessor']
                | typeof this.adapter['edgeProcessor'],
        ) =>
            async (task: NodeTask | EdgeTask) => {
                // 构建 mapMeta
                const mapMeta = new Map<string, DataMap>()
                for (const mapper of task.map) {
                    mapMeta.set(mapper.fromField, mapper)
                }
                // 读取数据
                const nodeRaw: object[] = (task.id && (await this.getData(task.id))) ?? []
                const category = this.taskMeta.categories.find(
                    (i) => i.name === task.category,
                )


                // 对于每条数据
                for (const item of nodeRaw) {
                    const newItem = {}
                    // 的每个字段
                    for (const fromField in item) {
                        // 查找有无转换
                        const map = mapMeta.get(fromField)
                        // 有转换
                        if (map !== undefined) {
                            // 则转换字段放入新的对象
                            newItem[map.toField] = item[fromField]
                            if (typeof item[fromField] !== map.type) {
                                // todo 处理类型不对应的情况
                            }
                        }
                    }
                    // 写入属于哪个类别
                    newItem['category'] = category
                    let res: any

                    if ((task as EdgeTask).from !== undefined && (task as EdgeTask).to !== undefined) {
                        // edge 任务查找返回
                        const fromTx = this.db.transaction(
                            (task as EdgeTask).from.uuid,
                            'readonly',
                        )
                        const toTx = this.db.transaction(
                            (task as EdgeTask).to.uuid,
                            'readonly',
                        )
                        const from = {
                            tx: fromTx,
                            field: (task as EdgeTask).from.field,
                        }
                        const to = (task as EdgeTask).to && {
                            tx: toTx,
                            field: (task as EdgeTask).to.field,
                        }
                        // 写入到图数据库
                        res = await processor(newItem, from, to)
                    } else {
                        // 写入到图数据库
                        res = await (processor as typeof this.adapter['nodeProcessor'])(newItem)
                    }

                    // 将返回值按 UUID 保存到 indexeddb
                    await this.db.put(task.uuid, res)
                }
            }

    private getData = async (id: number) =>
        (
            await this.strapi.findOne<{ attributes: { data: any } }>(
                'gi-data-sources',
                id,
                {
                    fields: ['data'],
                },
            )
        ).data.attributes.data

    _init = async () => {
        // 初始化客户端
        this.strapi = new Strapi({ url: this.params.url })

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

    private nodeTaskProcessor = async (nodeTask: NodeTask) =>
        await this.newTaskProcessor(this.adapter.nodeProcessor)(nodeTask)

    private edgeTaskProcessor = async (edgeTask: EdgeTask) =>
        await this.newTaskProcessor(this.adapter.edgeProcessor)(edgeTask)

    start = async (id: number) => {
        // 获取任务信息
        this.taskMeta = await this.getTaskMeta(id)

        // 创建本地缓存 db
        const allUUID = this.taskMeta.edgeTasks
            .map((i) => i.uuid)
            .concat(this.taskMeta.nodeTasks.map((i) => i.uuid))

        this.db = await openDB(id.toString(), 1, {
            upgrade(db) {
                for (const uuid of allUUID) {
                    db.createObjectStore(uuid, {
                        // The 'id' property of the object will be the key.
                        keyPath: 'id',
                        // If it isn't explicitly set, create a value by auto incrementing.
                        autoIncrement: true,
                    })
                }
            },
        })
        // todo 改用池批量处理
        // 先处理 node
        for (const nodeTask of this.taskMeta.nodeTasks) {
            await this.nodeTaskProcessor(nodeTask)
        }
        // 再处理 edge
        for (const edgeTask of this.taskMeta.edgeTasks) {
            await this.edgeTaskProcessor(edgeTask)
        }

        await deleteDB(id.toString())
    }
}

let taskFactory: TaskFactory | null = null

// 创建任务工厂
const initTaskFactory = async (params: TaskFactoryParams) => {
    taskFactory = await new TaskFactory(params)._init()
}

// 开始任务
const startTask = async (id: number) => await taskFactory?.start(id)

export default {
    initTaskFactory,
    startTask,
}
