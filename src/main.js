import Vue from 'vue'
import App from './App'
import '@/utils/cookie'
import router from './router'
import 'ant-design-vue/dist/antd.css'
import Antd from 'ant-design-vue'
import Viser from 'viser-vue'
import '@/mock'
import store from './store'
import PouchDB from 'pouchdb'
import 'nprogress/nprogress.css'
import moment from 'moment'
import 'moment/locale/zh-cn'

// 生产环境关闭提示
Vue.config.productionTip = false
// 图表类插件
Vue.use(Viser)
Vue.use(Antd)
Vue.prototype.$moment = moment

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  render: h => h(App),
  mounted () {
    // 判断是否已经登录
    let token = this.$cookies.get('token')
    if (token) {
      let db = new PouchDB('admindb')
      db.get('currUser').then(doc => {
        // 填充当前用户
        this.$store.commit('account/setuser', doc.user)
      }).catch(error => {
        // 首次登录没有用户
        if (error.status === 404) {
          console.log('welcome to atom-boot framework! ')
        }
      })
    }

    if (this.$store.state.setting.locale === 'zh_CN') {
      this.$moment.locale('zh-cn')
    }
  }
})
