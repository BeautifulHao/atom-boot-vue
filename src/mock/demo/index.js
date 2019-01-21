import Mock from 'mockjs'
import '@/mock/extend'

const listDb = Mock.mock({
  'list|500': [
    {
      name: { first: '@cfirst', last: '@clast' },
      gender: '@GENDER',
      city: () => {
        return Mock.Random.city(true)
      },
      age: () => {
        return Mock.Random.natural(15, 80)
      },
      status: '@STATUS',
      id: () => { return Mock.Random.id() },
      checkInDate: () => { return Mock.Random.date('yyyy-MM-dd') },
      uuid: () => {
        return Mock.Random.guid()
      }
    }
  ]
}).list

Mock.mock(/\/demo\/list(.*?)/, 'get', options => {
  let params = new URLSearchParams(options.url.substr(options.url.indexOf('?')))
  let pageSize = params.get('pageSize') ? params.get('pageSize') : 10
  let currentPage = params.get('currentPage') ? params.get('currentPage') : 1
  let sorter = params.get('sorter')
  let order = params.get('order')

  let gender = params.get('gender') ? params.get('gender').split(',') : []
  let status = params.get('status') ? params.get('status').split(',') : []

  let results =
    gender.length > 0
      ? listDb.filter(item => gender.indexOf(item.gender) >= 0)
      : listDb
  results =
    status.length > 0
      ? results.filter(item => status.indexOf(item.status) >= 0)
      : results

  if (sorter && order) {
    if (order === 'ascend') {
      results.sort((one, two) => {
        if (one[sorter] > two[sorter]) {
          return 1
        } else if (one[sorter] === two[sorter]) {
          return 0
        } else {
          return -1
        }
      })
    } else {
      results.sort((one, two) => {
        if (one[sorter] > two[sorter]) {
          return -1
        } else if (one[sorter] === two[sorter]) {
          return 0
        } else {
          return 1
        }
      })
    }
  }

  let total = results.length

  if (results.length >= pageSize * (currentPage - 1)) {
    results = results.filter(
      (element, index, array) =>
        index >= pageSize * (currentPage - 1) && index < pageSize * currentPage
    )
  } else {
    currentPage = 1
    results = results.filter(
      (element, index, array) => index >= 0 && index < pageSize
    )
  }

  return {
    results: results,
    info: {
      total: total,
      pageSize: pageSize,
      currentPage: currentPage
    }
  }
})
