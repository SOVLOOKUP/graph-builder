export default interface Neo4jAdapterConfig {
  url: string
  database: string
  auth?: {
    username: string
    password: string
  }
}
