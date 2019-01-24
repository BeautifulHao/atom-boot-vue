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

export const getItem = (params) => {
  return http.request({
    url: '/demo/item',
    method: 'GET',
    params: params
  })
}

export const saveItem = (params) => {
  return http.request({
    url: '/demo/save',
    method: 'POST',
    data: params
  })
}
