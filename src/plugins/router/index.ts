import { createRouter, createWebHistory } from 'vue-router'
import { authGuard } from './guard'
import lazyLoadView from './lazyLoad'
const lazyLoad = lazyLoadView()

const Home = () => lazyLoad(import('../../views/Home.vue'))
const DataSource = () => lazyLoad(import('../../views/DataSource.vue'))
const GraphBuilder = () => lazyLoad(import('../../views/GraphBuilder.vue'))
const Model = () => lazyLoad(import('../../views/Model.vue'))
const ModelBuilder = () => lazyLoad(import('../../views/ModelBuilder.vue'))
const TagManage = () => lazyLoad(import('../../views/TagManage.vue'))
const Concept = () => lazyLoad(import('../../views/Concept.vue'))

const Auth = () => lazyLoad(import('../../views/Auth/index.vue'))
const Signin = () => lazyLoad(import('../../views/Auth/Signin.vue'))
const Signup = () => lazyLoad(import('../../views/Auth/Signup.vue'))
const Verify = () => lazyLoad(import('../../views/Auth/Verify.vue'))

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
    path: '/graphbuilder',
    name: '构建',
    component: GraphBuilder,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(authGuard)

export default router
