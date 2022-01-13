import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './plugins/vueRouter'
import { store, key } from './store'

const MApp = createApp(App)

MApp.use(vuetify)
MApp.use(store, key)
MApp.use(router)

MApp.mount('#app')
