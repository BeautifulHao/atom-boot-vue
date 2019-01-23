import http from './index'

export const getList = (params) => {
  return http.request({
    url: '/demo/list',
    method: 'GET',
    params: params
  })
}

export const deleteItems = (params) => {
  return http.request({
    url: '/demo/delete',
    method: 'POST',
    data: params
  })
}
