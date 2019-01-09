import Vue from 'vue'
import App from './App'
import router from './router'
import 'ant-design-vue/dist/antd.css'
import Antd from 'ant-design-vue'
import Viser from 'viser-vue'
import axios from 'axios'
import '@/mock'
import store from './store'
import PouchDB from 'pouchdb'
import '@/utils/cookie.js'

Vue.prototype.$axios = axios
// 生产环境关闭提示
Vue.config.productionTip = false
// 图表类插件
Vue.use(Viser)
Vue.use(Antd)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  mounted () {
    var db = new PouchDB('admindb')
    db.get('currUser').then(doc => {
      // 刷新页面时填充当前用户
      this.$store.commit('account/setuser', doc.user)
    }).catch(error => {
      // 首次登录没有用户
      if (error.status === 404) {
        console.log('welcome to atom-boot framework! ')
      }
    })
  }
})
