import Mock from 'mockjs'
import '@/mock/extend'

let listDb = Mock.mock({
  'list|500': [
    {
      name: '@cname',
      gender: '@GENDER',
      city: () => {
        return Mock.Random.city(true)
      },
      age: () => {
        return Mock.Random.natural(15, 80)
      },
      status: '@STATUS',
      id: () => {
        return Mock.Random.id()
      },
      checkInDate: () => {
        return Mock.Random.date('yyyy-MM-dd')
      },
      'key|+1': 1
    }
  ]
}).list

Mock.mock(/\/demo\/list(.*?)/, 'get', options => {
  let params = new URLSearchParams(options.url.substr(options.url.indexOf('?')))
  let pageSize = params.get('pageSize') ? params.get('pageSize') : 10
  let currentPage = params.get('currentPage') ? params.get('currentPage') : 1
  let sorter = params.get('sorter')
  let order = params.get('order')
  let name = params.get('name')
  let id = params.get('id')
  let age = params.get('age') ? parseInt(params.get('age')) : undefined
  let checkInDate = params.get('checkInDate')
  let city = params.get('city')

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

  if (name) {
    results = results.filter(
      item => item.name.indexOf(name) > -1
    )
  }

  if (id) {
    results = results.filter(item => item.id.indexOf(id) > -1)
  }

  if (age) {
    results = results.filter(item => age === item.age)
  }

  if (city) {
    results = results.filter(item => item.city.indexOf(city) > -1)
  }

  if (checkInDate) {
    results = results.filter(item => item.checkInDate === checkInDate)
  }

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

  if (results.length > pageSize * (currentPage - 1)) {
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
    pagination: {
      total: total,
      pageSize: pageSize,
      currentPage: currentPage
    }
  }
})

Mock.mock(/\/demo\/delete(.*?)/, 'post', ({ body }) => {
  const { items } = JSON.parse(body)
  if (items.length > 0) {
    listDb = listDb.filter(item => items.indexOf(item.key) === -1)
  }

  return {
    result: true,
    message: 'success'
  }
})

Mock.mock(/\/demo\/save(.*?)/, 'post', ({ body }) => {
  const { item } = JSON.parse(body)

  if (item && item.key) {
    let indexItem = listDb.findIndex(i => i.key === item.key)
    if (indexItem > -1) {
      listDb[indexItem] = item
    }
  } else {
    let createKey = 0
    listDb.forEach(function (e) {
      if (e.key >= createKey) {
        createKey = e.key + 1
      }
    })

    item.key = createKey

    if (!item.id || item.id.length !== 18) {
      item.id = Mock.Random.id()
    }

    listDb.unshift(item)
  }

  return {
    result: true,
    message: item
  }
})

Mock.mock(/\/demo\/item(.*?)/, 'get', options => {
  let params = new URLSearchParams(options.url.substr(options.url.indexOf('?')))
  let key = params.get('key') ? parseInt(params.get('key')) : undefined
  let result = {
    result: true,
    message: {}
  }

  if (!key) {
    result.result = false
    result.message = '请求参数无效!'
  } else {
    result.message = listDb.find((value) => value.key === key)
    if (!result.message) {
      result.result = false
      result.message = '当前单据已经不存在!'
    }
  }
  return result
})
