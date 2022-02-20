import { createRouter, createWebHistory } from 'vue-router'
import { authGuard, autoHideBarGuard } from './guard'

const Home = () => import('../../views/Home.vue')

const DataSource = () => import('../../views/DataSource.vue')
const Tasks = () => import('../../views/Tasks.vue')
const Model = () => import('../../views/Model.vue')
const ModelBuilder = () => import('../../views/ModelBuilder.vue')
const TagManage = () => import('../../views/TagManage.vue')
const Concept = () => import('../../views/Concept.vue')
const PluginCenter = () => import('../../views/PluginCenter.vue')

const Auth = () => import('../../views/Auth/index.vue')
const Signin = () => import('../../views/Auth/Signin.vue')
const Signup = () => import('../../views/Auth/Signup.vue')
const Verify = () => import('../../views/Auth/Verify.vue')

const routes = [
  {
    path: '/auth',
    name: '认证',
    component: Auth,
    children: [
      {
        path: 'signin',
        component: Signin,
        name: '登录',
      },
      {
        path: 'signup',
        component: Signup,
        name: '注册',
      },
      {
        path: 'verify',
        component: Verify,
        name: '验证',
      },
    ],
  },
  {
    path: '/',
    name: '首页',
    component: Home,
  },
  {
    path: '/model',
    name: '模型',
    component: Model,
  },
  {
    path: '/model/:id',
    name: '建模',
    component: ModelBuilder,
  },
  {
    path: '/datasource',
    name: '数据源',
    component: DataSource,
  },
  {
    path: '/tagmanager',
    name: '标签',
    component: TagManage,
  },
  {
    path: '/concept',
    name: '概念',
    component: Concept,
  },
  {
    path: '/tasks',
    name: '任务',
    component: Tasks,
  },
  {
    path: '/plugincenter',
    name: '插件中心',
    component: PluginCenter,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(authGuard)
router.beforeEach(autoHideBarGuard)

export default router
