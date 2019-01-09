import Mock from 'mockjs'
import '@/mock/extend'

const user = Mock.mock({
  name: '@ADMIN',
  avatar: '@AVATAR',
  address: '@CITY',
  welcome: '@WELCOME',
  timefix: '@TIMEFIX',
  position: '@POSITION'
})

Mock.mock('/auth/login', 'post', ({body}) => {
  let result = {
    result: false,
    message: ''
  }
  const { username, password } = JSON.parse(body)
  if (username !== 'admin' || password !== '123456') {
    result.result = false
    result.message = '账户名或密码错误（admin/123456）'
  } else {
    result.result = true
    result.message = Mock.mock('@TIMEFIX') + '，欢迎回来'
    result.data = {}
    result.data.user = user
    result.data.token = Mock.Random.id()
  }
  return result
})
