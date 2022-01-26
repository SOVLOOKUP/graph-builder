import { createApp } from 'vue'
import App from './App.vue'
import router from './plugins/vueRouter'
import { store, key } from './store'
import { Quasar } from 'quasar'

import Toast, { useToast } from 'vue-toastification'
import 'vue-toastification/dist/index.css'

import quasarLang from 'quasar/lang/zh-CN'
import quasarIconSet from 'quasar/icon-set/svg-material-icons'

// Import Quasar css
import 'quasar/src/css/index.sass'

const MainApp = createApp(App)
const toast = useToast()

MainApp.use(Quasar, {
  lang: quasarLang,
  iconSet: quasarIconSet,
  plugins: {}, // import Quasar plugins and add here
})
MainApp.use(store, key)
MainApp.use(router)
MainApp.use(Toast, {
  transition: 'Vue-Toastification__fade',
  maxToasts: 10,
  newestOnTop: true,
  position: 'bottom-right',
  timeout: 2000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: true,
  hideProgressBar: true,
  closeButton: 'button',
  icon: true,
  rtl: false,
})

MainApp.config.errorHandler = async (err, _vm, info) => {
  toast.error((err as Error).message + '\n' + info)
}

MainApp.mount('#app')
