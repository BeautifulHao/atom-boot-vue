import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/login/Login'
import { setTitle, checkLogin } from '@/utils/common'
import NProgress from 'nprogress/nprogress'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      meta: {
        title: '登录',
        needLogin: false
      },
      props: true,
      component: Login,
      invisible: true
    },
    {
      path: '/',
      name: 'main',
      meta: {
        title: '首页',
        needLogin: true
      },
      invisible: false
    },
    {
      path: '/demo',
      name: 'demo',
      meta: {
        title: '测试',
        needLogin: true
      },
      component: () => import('@/pages/demo/needLogin.vue'),
      invisible: true
    }
  ]
})

// 路由守卫
router.beforeEach((to, from, next) => {
  if (from.name !== null) {
    NProgress.start()
  }

  to.meta && setTitle(to.meta.title)

  if (to.meta.needLogin === true) {
    const isLogin = checkLogin()
    if (isLogin) {
    // 如果没有添加过路由，处理动态添加路由
    // 处理过路由，直接next
      next()
    } else {
      next({ name: 'login', params: {redirectTo: to} })
    }
  } else {
    next()
  }
})

router.afterEach((routeTo, routeFrom) => {
  NProgress.done()
})

export default router
