import type {
    DataMap,
    EdgeTask,
    GraphDBAdapter,
    NodeTask,
    TaskMeta,
} from 'src/types'
import adapters, { AdapterNames } from '../adapter'
import Strapi from 'strapi-sdk-js'
import { Observable, Subject } from 'threads/observable'
import { openDB, deleteDB, IDBPDatabase } from 'idb'

let subject = new Subject()

interface TaskFactoryParams {
  url: string
  db: {
    type: AdapterNames
    config: object
  }
}

// 1. 读取实体数据转换为目标格式<写入到图数据库> 入参: 实体数据 返回: 数据库返回
// 2. 读取关系数据转换为目标格式<根据实体返回的 ID 写入关系数据到图数据库> 入参: 关系数据 + 两头实体返回 返回: 数据库返回
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

  private makeGet =
    (storeName: string) => async (q: IDBValidKey | IDBKeyRange) =>
      await this.db.get(storeName, q)

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
      const totalItemNum = nodeRaw.length
      let completeItemNum = 0

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
            // 类型不对应的情况
            // if (typeof item[fromField] !== map.type) {}
          }
        }
        // 写入属于哪个类别
        newItem['category'] = category
        let res: any

        if (
          (task as EdgeTask).from !== undefined &&
          (task as EdgeTask).to !== undefined
        ) {
          // edge 任务查找返回
          const from = {
            get: this.makeGet((task as EdgeTask).from.uuid),
            field: (task as EdgeTask).from.field,
            category: (task as EdgeTask).from.category,
          }
          const to = (task as EdgeTask).to && {
            get: this.makeGet((task as EdgeTask).to.uuid),
            field: (task as EdgeTask).to.field,
            category: (task as EdgeTask).to.category,
          }
          // 写入到图数据库
          res = await processor(newItem, from, to, (task as EdgeTask).field)
        } else {
          // 写入到图数据库
          res = await (processor as typeof this.adapter['nodeProcessor'])(
            newItem,
          )
        }
        // 将返回值按 UUID 保存到 indexeddb
        await this.db.put(task.uuid, res)
        completeItemNum += 1
        subject.next({
          uuid: task.uuid,
          process: completeItemNum / totalItemNum,
        })
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

    const adapter = adapters[this.params.db.type]?.adapter

    if (adapter === undefined) {
      throw Error(`Not supported database type ${this.params.db.type}`)
    }

    this.adapter = adapter(this.params.db.config as any)
    return this
  }

  private nodeTaskProcessor = async (nodeTask: NodeTask) =>
    await this.newTaskProcessor(this.adapter.nodeProcessor)(nodeTask)

  private edgeTaskProcessor = async (edgeTask: EdgeTask) =>
    await this.newTaskProcessor(this.adapter.edgeProcessor)(edgeTask)

  start = async (id: number) => {
    // 获取任务信息
    this.taskMeta = await this.getTaskMeta(id)

    const dbName = Date.now().toString()
    // 创建本地缓存 db
    const allUUID = this.taskMeta.edgeTasks
      .map((i) => i.uuid)
      .concat(this.taskMeta.nodeTasks.map((i) => i.uuid))

    subject.next(allUUID)

    this.db = await openDB(dbName, 1, {
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

    // 先处理 node
    for (const nodeTask of this.taskMeta.nodeTasks) {
      await this.nodeTaskProcessor(nodeTask)
    }
    // 再处理 edge
    for (const edgeTask of this.taskMeta.edgeTasks) {
      await this.edgeTaskProcessor(edgeTask)
    }
    subject.next('ok')
    subject.complete()
    subject = new Subject()
    await deleteDB(dbName)
  }
}

let taskFactory: TaskFactory | null = null

export default {
  // 创建任务工厂
  async initTaskFactory(params: TaskFactoryParams) {
    taskFactory = await new TaskFactory(params)._init()
  },
  // 开始任务
  async startTask(id: number) {
    await taskFactory?.start(id)
  },
  // 状态监控
  values() {
    return Observable.from(subject)
  },
}
