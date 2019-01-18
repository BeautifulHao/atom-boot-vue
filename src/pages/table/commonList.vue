<template>
  <a-table :columns="columns"
    :rowKey="record => record.uuid"
    :dataSource="data"
    :pagination="pagination"
    :loading="loading"
    @change="handleTableChange">
    <template slot="name" slot-scope="name">
      {{name.show}} - {{name.title}}
    </template>
  </a-table>
</template>

<script>
import { getList } from '@/api/demo'

const columns = [{
  title: '姓名',
  dataIndex: 'name',
  sorter: true,
  width: '20%',
  scopedSlots: { customRender: 'name' }
}, {
  title: '性别',
  dataIndex: 'gender',
  filters: [
    { text: 'Male', value: 'male' },
    { text: 'Female', value: 'female' }
  ],
  width: '20%'
}, {
  title: '所在城市',
  dataIndex: 'city'
}]

export default {
  mounted () {
    this.fetch()
  },
  data () {
    return {
      data: [],
      pagination: {'showQuickJumper': true, 'showSizeChanger': true},
      loading: false,
      columns
    }
  },
  methods: {
    handleTableChange (pagination, filters, sorter) {
      console.log(pagination)
      const pager = { ...this.pagination }
      pager.current = pagination.current
      this.pagination = pager
      this.fetch({
        results: pagination.pageSize,
        page: pagination.current,
        sortField: sorter.field,
        sortOrder: sorter.order,
        ...filters
      })
    },
    fetch (params = {}) {
      console.log('params:', params)
      this.loading = true

      getList({ results: 10, ...params }).then((data) => {
        let ret = data.data
        const pagination = { ...this.pagination }
        pagination.total = ret.info.total
        this.loading = false
        this.data = ret.results
        this.pagination = pagination
      })
    }
  }
}
</script>
