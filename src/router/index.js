import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/login/Login'
import { setTitle, checkLogin } from '@/utils/common'
import NProgress from 'nprogress/nprogress'
import PageView from '@/layouts/PageView'
import RouteView from '@/layouts/RouteView'
import MenuView from '@/layouts/MenuView'

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
      component: MenuView,
      redirect: '/login',
      meta: {
        title: '首页',
        needLogin: true
      },
      invisible: false,
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          component: RouteView,
          meta: {
            title: '看 板',
            needLogin: false
          },
          icon: 'dashboard',
          children: [
            {
              path: '/dashboard/workplace',
              name: 'workplace',
              meta: {
                title: '工作台',
                needLogin: false
              },
              component: () => import('@/pages/dashboard/WorkPlace'),
              icon: 'bar-chart'
            },
            {
              path: '/dashboard/analysis',
              name: 'analysis',
              meta: {
                title: '分析报告',
                needLogin: false
              },
              component: () => import('@/pages/dashboard/Analysis'),
              icon: 'bars'
            }
          ]
        }
      ]
    },
    {
      path: '/demo',
      name: 'demo',
      component: PageView,
      meta: {
        title: '测试',
        needLogin: true
      },
      invisible: true,
      children: [
        {
          path: '/demo/item',
          name: 'item',
          component: () => import('@/pages/demo/needLogin.vue'),
          icon: 'none'
        }
      ]
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
