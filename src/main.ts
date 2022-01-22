import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './plugins/vueRouter'
import { store, key } from './store'
import Notifications from '@kyvg/vue3-notification'

const MainApp = createApp(App)

MainApp.use(vuetify)
MainApp.use(store, key)
MainApp.use(router)
MainApp.use(Notifications)

MainApp.mount('#app')
