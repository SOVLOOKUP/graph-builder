import { createApp } from 'vue'
import App from './App.vue'
// import store from './store'
import vuetify from './plugins/vuetify'

const MApp = createApp(App)

MApp.use(vuetify)

// Rubick.use(store)
MApp.mount('#app')
