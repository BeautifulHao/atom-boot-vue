import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/login/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: '登录页',
      component: Login,
      invisible: true
    },
    {
      path: '/',
      name: '首页',
      redirect: '/login',
      invisible: true
    }
  ]
})
