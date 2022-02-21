
export interface Item extends Object {
    id: number
    attributes: {
        name: string
    }
}

// Concept 关联查询出的 Tag
export interface GiTag {
    id: number
    gi_tag: {
        data: Tag | null
    }
}

// Tag 
export interface TagField {
    name: string
    description: string
}

export interface Tag extends Item {
    id: number
    attributes: TagField
}

// Concept 
export interface Concept extends Item {
    id: number
    attributes: {
        name: string
        jsonldurl: string
        tag: GiTag[]
    }
}

export interface CellData {
    id: string
    concept: Concept
    from?: {
        id: string,
        tag: Tag
    }
    to?: {
        id: string,
        tag: Tag
    }
}

// 数据类型
export type DataType = "string" | "number" | "bigint" | "boolean"

// 数据集元数据
export interface MetaData { name: string; type: DataType }

// 数据字段映射
export interface DataMap {
    // 数据集的列名
    fromField: string
    // tag 的名称, 转换后的字段名
    toField: string
    // 数据类型
    type: DataType
}

// 概念类
export interface Category {
    name: string
    jsonldurl: string
    tags: TagField[]
}

export interface NodeTask {
    // task uuid
    uuid: string
    // 数据集 id 
    id: number | null
    // 隶属哪个 Category
    category: string
    // 字段映射
    map: DataMap[]
}

interface fromto {
    uuid: string
    field: string
}

export interface EdgeTask extends NodeTask {
    from: fromto
    to: fromto
}

// 图谱构建任务
export interface TaskMeta {
    // 所有的概念类
    categories: Category[]
    // 数据映射, 数据集 id 和其字段的映射
    nodeTasks: NodeTask[]
    edgeTasks: EdgeTask[]
}

// GraphCanvas
export interface NodeData {
    concept: Concept
}

export interface EdgeData {
    from: Tag
    to: Tag
    concept: Concept
}

// store
// config
export type ModeType = 'build' | 'app'

export interface ConfigStore {
    serverBaseUrl: string
    mode: ModeType
    showBar: boolean
}
// user
// 用户登录
export interface UserAuth {
    identifier: string
    password: string
}

// 用户注册
export interface UserRegister {
    email: string
    username: string
    password: string
}

// 用户登录返回
export interface UserLoginResp {
    jwt: string
    user: {
        blocked: boolean
        confirmed: boolean
        createdAt: string
        email: string
        id: number
        provider: string
        updatedAt: string
        username: string
    }
}

// pinia 中的用户信息
export interface UserStore extends UserLoginResp {
    // null is not login
    logintime?: number
}

export interface DataCollection {
    id: number
    attributes: {
        name: string
        metadata: MetaData[]
    }
}

// taskProcessor
export interface FromTo<NodeType> {
    node: NodeType
    field: string
}

export interface Result<T> {
    result: T
    status: "success" | "error"
    msg?: string
}

export interface GraphDBPlugin<NodeType, EdgeType> {
    nodeProcessor: (node: object) => Promise<Result<NodeType>>
    edgeProcessor: (
        edge: object,
        from: FromTo<NodeType>,
        to: FromTo<NodeType>,
    ) => Promise<Result<EdgeType>>
}
