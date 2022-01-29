import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { debounce } from 'ts-debounce'
import { PiniaDebounce } from '@pinia/plugin-debounce'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
pinia.use(PiniaDebounce(debounce))

export default pinia
