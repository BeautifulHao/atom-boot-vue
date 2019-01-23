import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/login/Login'
import { setTitle, checkLogin } from '@/utils/common'
import NProgress from 'nprogress/nprogress'
import RouteView from '@/layouts/RouteView'
import MenuView from '@/layouts/MenuView'
import store from '@/store'

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
        },
        {
          path: '/demo',
          name: 'demo',
          component: RouteView,
          meta: {
            title: '测试',
            needLogin: false
          },
          invisible: false,
          icon: 'lock',
          children: [
            {
              path: '/demo/item',
              name: 'item',
              component: () => import('@/pages/demo/needLogin.vue'),
              icon: 'none'
            },
            {
              path: '/demo/route',
              name: 'demoRoute',
              component: () => import('@/pages/demo/routeTest.vue'),
              meta: {
                title: '路由测试',
                needLogin: false
              }
            }
          ]
        },
        {
          path: '/list',
          name: 'list',
          meta: {
            title: '列表页',
            needLogin: true
          },
          component: RouteView,
          icon: 'table',
          children: [
            {
              path: '/list/demo',
              name: 'common-list',
              component: () => import('@/pages/table/commonList'),
              icon: 'none',
              meta: {
                title: '通用表格',
                // 自动收折菜单
                maxContent: true
              }
            },
            {
              path: '/list/item/:busKey/:editType',
              name: 'common-list-item',
              component: () => import('@/pages/table/commonDetail'),
              icon: 'none',
              invisible: true,
              props: true,
              meta: {
                title: '通用明细',
                maxContent: false
              }
            },
            {
              path: '/list/query',
              name: '查询表格',
              component: () => import('@/pages/list/QueryList'),
              icon: 'none'
            },
            {
              path: '/list/primary',
              name: '标准列表',
              component: () => import('@/pages/list/StandardList'),
              icon: 'none'
            },
            {
              path: '/list/card',
              name: '卡片列表',
              component: () => import('@/pages/list/CardList'),
              icon: 'none'
            },
            {
              path: '/list/search',
              name: '搜索列表',
              component: () => import('@/pages/list/search/SearchLayout'),
              icon: 'none',
              children: [
                {
                  path: '/list/search/article',
                  name: '文章',
                  component: () => import('@/pages/list/search/ArticleList'),
                  icon: 'none'
                },
                {
                  path: '/list/search/application',
                  name: '应用',
                  component: () =>
                    import('@/pages/list/search/ApplicationList'),
                  icon: 'none'
                },
                {
                  path: '/list/search/project',
                  name: '项目',
                  component: () => import('@/pages/list/search/ProjectList'),
                  icon: 'none'
                }
              ]
            }
          ]
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
      next({ name: 'login', params: { redirectTo: to } })
    }
  } else {
    next()
  }
})

router.afterEach((routeTo, routeFrom) => {
  if (routeTo.meta && routeTo.meta.maxContent) {
    store.commit('setting/setMenuCollapsed', routeTo.meta.maxContent)
  }
  NProgress.done()
})

export default router
