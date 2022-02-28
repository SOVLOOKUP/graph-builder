import { createApp } from 'vue'
import App from './App.vue'
import router from './plugins/router'
import { Quasar } from 'quasar'
import pinia from './plugins/pinia'
import { Icon } from '@iconify/vue'
import Toast, { useToast } from 'vue-toastification'
import 'vue-toastification/dist/index.css'

import quasarLang from 'quasar/lang/zh-CN'
import quasarIconSet from 'quasar/icon-set/svg-material-icons'
import 'quasar/src/css/index.sass'
import posthog from 'posthog-js'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const MainApp = createApp(App)
const toast = useToast()

MainApp.config.unwrapInjectedRef = true

MainApp.use(Quasar, {
  lang: quasarLang,
  iconSet: quasarIconSet,
  plugins: {}, // import Quasar plugins and add here
})
MainApp.use(ElementPlus)
MainApp.use(pinia)
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
  throw err
}

MainApp.component('Icon', Icon)

// posthog 分析
posthog.init('phc_wzpudJnq92BwkTvWftGfbefRtIHgyKdtbKlMrR8H8iT', {
  api_host: 'https://app.posthog.com',
})

MainApp.mount('#app')
