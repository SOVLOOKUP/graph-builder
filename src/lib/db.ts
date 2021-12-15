import type { AceBase } from 'acebase'
const dbName = 'db'

let db: AceBase

const getDB = async (name: string = dbName) => {
  db = db ?? (await import('acebase')).AceBase.WithIndexedDB(name)
  return db
}

export default getDB
