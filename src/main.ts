import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './plugins/vueRouter'
import { store, key } from './store'

const MainApp = createApp(App)

MainApp.use(vuetify)
MainApp.use(store, key)
MainApp.use(router)

MainApp.mount('#app')
