import Mock from 'mockjs'
import '@/mock/extend'

const listDb = () => {
  return Mock.mock({
    'list|10': [
      {
        name: { show: '@ADMIN', title: '@GROUP' },
        gender: '@GENDER',
        city: '@CITY',
        uuid: Mock.Random.id()
      }
    ]
  }).list
}

Mock.mock(/\/demo\/list(.*?)/, 'get', () => {
  return {
    results: listDb(),
    info: {
      seed: 'bdae9bf677c8494d',
      total: 200,
      results: 10,
      page: 1,
      version: '1.2'
    }
  }
})
