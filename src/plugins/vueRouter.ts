import { createRouter, createWebHistory, RouteLocationRaw } from 'vue-router'
import Home from '../views/Home.vue'
import { store } from '../store'

const DataSource = () => import('../views/DataSource.vue')
const GraphBuilder = () => import('../views/GraphBuilder.vue')
const Project = () => import('../views/Project.vue')
const TagManage = () => import('../views/TagManage.vue')
const User = () => import('../views/User.vue')

const Auth = () => import('../views/Auth/index.vue')
const Signin = () => import('../views/Auth/Signin.vue')
const Signup = () => import('../views/Auth/Signup.vue')

const routes = [
  {
    path: '/auth',
    name: '认证',
    component: Auth,
    children: [
      {
        path: 'signin',
        component: Signin,
      },
      {
        path: 'signup',
        component: Signup,
        name: 'signup',
      },
    ],
  },
  {
    path: '/',
    name: '首页',
    component: Home,
  },
  {
    path: '/project',
    name: '项目',
    component: Project,
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
    path: '/graphbuilder',
    name: '构建',
    component: GraphBuilder,
  },
  {
    path: '/user',
    name: '用户中心',
    component: User,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// todo 重定向回来
router.beforeEach(async (to) => {
  if (!to.path.startsWith('/auth') && store.state.user === null) {
    const authURL: RouteLocationRaw = {
      path: '/auth/signin',
    }
    return authURL
  }
  return true
})

export { routes }
export default router
