import type { GraphDBAdapterFactory } from 'src/types'
import neo4j from 'neo4j-driver'

// 根据 JSON 构建 Cypher 语句主题
const toString = (ob: object | string, defaultKeys?: string[]) => {
  if (typeof ob === 'string') {
    return `"${ob}"`
  }

  const items = []
  const keys = defaultKeys ?? Object.keys(ob)
  for (const key of keys) {
    const obValue = ob[key]
    let value = obValue
    if (typeof obValue === 'string') {
      value = `"${obValue}"`
    }
    items.push(`${key}:${value.toString()}`)
  }
  return `{${items.join(',')}}`
}

export interface Neo4jAdapterConfig {
  url: string
  database: string
  auth?: {
    username: string
    password: string
  }
}

// neo4j 驱动
const adapter: GraphDBAdapterFactory<Neo4jAdapterConfig, any, any> = (
  config,
) => {
  const auth =
    config.auth && neo4j.auth.basic(config.auth.username, config.auth.password)
  const driver = neo4j.driver(config.url, auth)
  const session = driver.session({
    database: config.database,
    defaultAccessMode: neo4j.session.WRITE,
  })

  return {
    nodeProcessor: async (node) => {
      const tag = node?.category?.name
      delete node['category']
      const keys = Object.keys(node)
      // 插入这个 node
      // [2 todo] 概念展示字段选择, 只能是字符串(这里和mapper中需要展示)
      const cmd = `CREATE (${node[keys.at(0) as string]}:${tag} ${toString(
        node,
        keys,
      )})`
      return {
        result: await session.run(cmd),
        status: 'success',
      }
    },

    edgeProcessor: async (edge, from, to, field) => {
      const tag = edge?.category?.name
      delete edge['category']
      const keys = Object.keys(edge)
      // [2 todo] 概念展示字段选择, 只能是字符串

      const cmd = `
       MATCH (a:${from.category}),(b:${to.category})
       WHERE a.${from.field} = ${toString(edge[field.from])} AND b.${
        to.field
      } = ${toString(edge[field.to])}
       CREATE (a)-[${keys.at(0) as string}:${tag} ${toString(
        edge,
        keys,
      )}] -> (b)
       `
      return {
        result: await session.run(cmd),
        status: 'success',
      }
    },
  }
}

export default {
  configSchema: {},
  adapter,
}
