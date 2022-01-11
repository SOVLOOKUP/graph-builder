import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const DataSource = () => import('../views/DataSource.vue')
const GraphBuilder = () => import('../views/GraphBuilder.vue')
const Project = () => import('../views/Project.vue')
const TagManage = () => import('../views/TagManage.vue')
const Auth = () => import('../views/Auth/Auth.vue')
const Signin = () => import('../views/Auth/Signin.vue')
const SigninIdentifier = () => import('../views/Auth/SigninIdentifier.vue')

const routes = [
  {
    path: '/',
    name: '首页',
    icon: 'https://gw.alipayobjects.com/zos/antfincdn/0b4HzOcEJY/Graphin.svg',
    component: Home,
  },
  {
    path: '/auth',
    name: '认证',
    icon: 'https://gw.alipayobjects.com/zos/antfincdn/0b4HzOcEJY/Graphin.svg',
    component: Auth,
    children: [
      {
        path: 'signin',
        component: Signin,
        children: [
          {
            path: 'identifier',
            name: 'signin',
            component: SigninIdentifier,
          },
          // {
          //   path: 'password',
          //   name: 'password',
          //   component: SigninPassword,
          // },
        ],
      },
      // {
      //   path: 'signup',
      //   component: Signup,
      //   name: 'signup',
      // },
    ],
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
  history: createWebHashHistory(),
  routes,
})
export { routes }
export default router
