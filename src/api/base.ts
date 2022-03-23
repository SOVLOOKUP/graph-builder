import ky from 'ky'
import { useConfigStore } from '../store'

const API = () => {
  const configStore = useConfigStore()
  return ky.create({
    mode: 'cors',
    // throwHttpErrors: false,
    prefixUrl: new URL('api', configStore.serverBaseUrl).href,
  })
}

export default API
