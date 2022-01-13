import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import config from '../config'

const DataSource = () => import('../views/DataSource.vue')
const GraphBuilder = () => import('../views/GraphBuilder.vue')
const Project = () => import('../views/Project.vue')
const TagManage = () => import('../views/TagManage.vue')

const Auth = () => import('../views/Auth/index.vue')
const Signin = () => import('../views/Auth/Signin.vue')
const Signup = () => import('../views/Auth/Signup.vue')

const routes = [
  // todo 没有认证就跳转到认证
  {
    path: '/auth',
    name: '认证',
    icon: config.logoURL,
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
    icon: config.logoURL,
    component: Home,
  },
  {
    path: '/project',
    name: '项目',
    icon: 'mdi-google-ads',
    component: Project,
  },
  {
    path: '/datasource',
    name: '数据',
    icon: 'mdi-database',
    component: DataSource,
  },
  {
    path: '/tagmanager',
    name: '标签',
    icon: 'mdi-tag',
    component: TagManage,
  },
  {
    path: '/graphbuilder',
    name: '构建',
    icon: 'mdi-crane',
    component: GraphBuilder,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})
export { routes }
export default router
