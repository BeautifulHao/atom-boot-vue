import axios from 'axios'
import { baseUrl } from '@/config'

/**
 *
 *
 * @class HttpRequest
 */
class HttpRequest {
  /**
   *Creates an instance of HttpRequest.
   * @param {*} [url=baseUrl]
   * @memberof HttpRequest
   */
  constructor (url = baseUrl) {
    this.url = url
    // loading 加载多请求等待
    this.queue = {}
  }
  getInsideConfig () {
    const config = {
      baseURL: this.url,
      headers: {}
    }
    return config
  }
  interceptors (instance) {
    instance.interceptors.request.use(config => {
      // 添加全局加载loading
      // (`开始加载数据:`, config)
      // const token = sessionStorage.getItem('token')
      // if (token && token.length > 0) {
      //   config.headers['Authorization'] = 'Bearer ' + token
      // }
      return config
    }, error => {
      return Promise.reject(error)
    })

    instance.interceptors.response.use(res => {
      // console.log(`数据加载结束:`, res)
      return res
    }, error => {
      if (error.response.status === 401) {
        // console.log('当前请求需要身份认证!')
      }
      if (error.response.status === 403) {
        // console.log('当前请求无权访问!')
      }
      return Promise.reject(error)
    })
  }
  request (options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance)
    return instance(options)
  }
}

export default HttpRequest
