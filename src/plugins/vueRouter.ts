import { createRouter, createWebHistory, RouteLocation } from 'vue-router'
import Home from '../views/Home.vue'
import { store } from '../store'

const DataSource = () => import('../views/DataSource.vue')
const GraphBuilder = () => import('../views/GraphBuilder.vue')
const Model = () => import('../views/Model.vue')
const ModelBuilder = () => import('../views/ModelBuilder.vue')
const TagManage = () => import('../views/TagManage.vue')
const Concept = () => import('../views/Concept.vue')

const Auth = () => import('../views/Auth/index.vue')
const Signin = () => import('../views/Auth/Signin.vue')
const Signup = () => import('../views/Auth/Signup.vue')
const Verify = () => import('../views/Auth/Verify.vue')

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
    name: '数据',
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
    path: '/graphbuilder',
    name: '构建',
    component: GraphBuilder,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from) => {
  if (!to.path.startsWith('/auth') && store.state.user === null) {
    const authURL: RouteLocation = {
      path: '/auth/signin',
      matched: [],
      fullPath: '',
      query: {},
      hash: '',
      name: undefined,
      params: {},
      redirectedFrom: from,
      meta: {},
    }
    store.commit('toggleBar', false)
    return authURL
  }
  return true
})

export { routes }
export default router
