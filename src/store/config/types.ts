type ModeType = 'build' | 'app'

interface ConfigStore {
  serverBaseUrl: string
  mode: ModeType
  showBar: boolean
}

export { ModeType, ConfigStore }
