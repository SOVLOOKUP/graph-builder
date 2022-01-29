import ky from 'ky'
import { useConfigStore } from '../store'

const API = () => {
  const configStore = useConfigStore()
  return ky.create({
    mode: 'cors',
    // throwHttpErrors: false,
    prefixUrl: `${configStore.serverBaseUrl}/api/`,
  })
}

export default API
