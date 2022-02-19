
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
export interface Tag extends Item {
    id: number
    attributes: {
        name: string
        description: string
    }
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
    concept: Concept
    from?: Tag
    to?: Tag
}

// 数据类型
export type DataType = "string" | "number" | "bigint" | "boolean"

// 数据集元数据
export interface MetaData { name: string; type: DataType }

// 数据字段映射
export interface DataMap {
    // 数据集的列名
    from: string
    // tag 的名称, 转换后的字段名
    to: string
    // 数据类型
    type: DataType
}

// 概念类
export interface Category {
    jsonldurl: string
}

// 图谱构建任务
export interface TaskMeta {
    // 所有的概念类
    categories: Map<string, Category>
    // 数据映射, 数据集 id 和其字段的映射
    data: Map<number, DataMap[]>
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