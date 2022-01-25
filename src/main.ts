import { createApp } from 'vue'
import App from './App.vue'
// import vuetify from './plugins/vuetify'
import router from './plugins/vueRouter'
import { store, key } from './store'
import Notifications, { notify } from '@kyvg/vue3-notification'
import { Quasar } from 'quasar'

import quasarLang from 'quasar/lang/zh-CN'
import quasarIconSet from 'quasar/icon-set/svg-material-icons'

// Import Quasar css
import 'quasar/src/css/index.sass'

const MainApp = createApp(App)

// MainApp.use(vuetify)
MainApp.use(Quasar, {
  lang: quasarLang,
  iconSet: quasarIconSet,
  plugins: {}, // import Quasar plugins and add here
})
MainApp.use(store, key)
MainApp.use(router)
MainApp.use(Notifications)

MainApp.config.errorHandler = async (err, _vm, info) => {
  notify({
    type: 'error',
    title: (err as Error).message,
    text: info,
  })
}

MainApp.mount('#app')
