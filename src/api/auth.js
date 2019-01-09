import http from './index'
// import Qs from 'qs'

export const login = ({ username, password }) => {
  return http.request({
    url: '/auth/login',
    method: 'post',
    // data: Qs.stringify({ 'username': username, 'password': password }),
    data: { username, password },
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  })
}

export const logout = () => {
  return http.request({
    url: '/api/logout',
    method: 'post'
  })
}
