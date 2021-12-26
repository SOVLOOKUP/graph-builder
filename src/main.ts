import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './plugins/vueRouter'
const MApp = createApp(App)

MApp.use(vuetify)

MApp.use(router)

// Rubick.use(store)
MApp.mount('#app')
