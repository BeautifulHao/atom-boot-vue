import http from './index'

export const getActivity = () => {
  return http.request({
    url: '/work/activity',
    method: 'get'
  })
}

export const getItem = () => {
  return http.request({
    url: '/work/team',
    method: 'get'
  })
}

export const getProject = () => {
  return http.request({
    url: '/work/project',
    method: 'get'
  })
}
