<template>
  <a-card :bordered="false">
    <div class="operator">
      <a-button-group>
        <a-button @click="addItem"
                  icon="plus">新建</a-button>
        <a-button @click="eidtItem"
                  icon="edit">修改</a-button>
        <a-button @click="deleteItem"
                  icon="delete">删除</a-button>
        <a-button @click="viewItem"
                  icon="info-circle">查看</a-button>
        <a-dropdown>
          <a-menu @click="handleMenuClick"
                  slot="overlay">
            <a-menu-item key="lock">
              <a-icon type="lock" />禁用</a-menu-item>
            <a-menu-item key="unlock">
              <a-icon type="unlock" />启用</a-menu-item>
            <a-menu-item key="audit">
              <a-icon type="safety" />审批</a-menu-item>
          </a-menu>
          <a-button>
            <a-icon type="bars" /> 更多操作
            <a-icon type="down" />
          </a-button>
        </a-dropdown>
        <a-button :icon="advanced ? 'up' : 'down'"
                  @click="qSearch">
          高级查找
        </a-button>
      </a-button-group>
    </div>
    <div :class="advanced ? null : 'showSearch'">
      <a-form layout="horizontal"
              :form="formQuery">
        <div>
          <a-row>
            <a-col :md="8"
                   :sm="24">
              <a-form-item label="姓 名"
                           :labelCol="{span: 5}"
                           :wrapperCol="{span: 18, offset: 1}"
                           key="userName">
                <a-input placeholder="请输入人员姓名"
                         v-decorator="['name',{}]" />
              </a-form-item>
            </a-col>
            <a-col :md="8"
                   :sm="24">
              <a-form-item label="身份证"
                           :labelCol="{span: 5}"
                           :wrapperCol="{span: 18, offset: 1}"
                           key="id">
                <a-input placeholder="请输入位身份证信息"
                         v-decorator="['id',{}]" />
              </a-form-item>
            </a-col>
            <a-col :md="8"
                   :sm="24">
              <a-form-item label="状 态"
                           :labelCol="{span: 5}"
                           :wrapperCol="{span: 18, offset: 1}"
                           key="status">
                <a-select placeholder="请选择"
                          v-decorator="['status',{}]"
                          mode="multiple">
                  <a-select-option value="in">在职</a-select-option>
                  <a-select-option value="stop">停职</a-select-option>
                  <a-select-option value="out">离职</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :md="8"
                   :sm="24">
              <a-form-item label="年 龄"
                           :labelCol="{span: 5}"
                           :wrapperCol="{span: 18, offset: 1}"
                           key="age">
                <a-input-number style="width: 100%"
                                placeholder="请输入人员年龄"
                                :max="150"
                                :min="0"
                                :precision="0"
                                v-decorator="['age',{}]" />
              </a-form-item>
            </a-col>
            <a-col :md="8"
                   :sm="24">
              <a-form-item label="入职日期"
                           :labelCol="{span: 5}"
                           :wrapperCol="{span: 18, offset: 1}"
                           key="checkInDate">
                <a-date-picker style="width: 100%"
                               placeholder="请输入入职日期"
                               v-decorator="['checkInDate',{}]" />
              </a-form-item>
            </a-col>
            <a-col :md="8"
                   :sm="24">
              <a-form-item label="地 址"
                           :labelCol="{span: 5}"
                           :wrapperCol="{span: 18, offset: 1}"
                           key="city">
                <a-input placeholder="请输入地址"
                         v-decorator="['city',{}]" />
              </a-form-item>
            </a-col>
          </a-row>
        </div>
        <div>
          <a-row>
            <a-col :md="24"
                   :sm="24"
                   style="text-align: right;margin-bottom:18px;">
              <a-button type="primary"
                        icon="search"
                        @click="queryClick">查询</a-button>
              <a-button type="primary"
                        style="margin-left: 8px"
                        icon="rest"
                        @click='clearQueryClick'>重置</a-button>
            </a-col>
          </a-row>
        </div>
      </a-form>
    </div>
    <a-table :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
             :columns="columns"
             :dataSource="dataSource"
             :pagination="pagination"
             :loading="loading"
             :bordered="bordered"
             :rowKey="record => record.key"
             @change="handleTableChange">
      <template slot="name"
                slot-scope="name">
        {{name.first}}{{name.last}}
      </template>
      <template slot="gender"
                slot-scope="gender">
        {{gender === 'male' ? '男性' : '女性'}}
      </template>
      <template slot="status"
                slot-scope="status">
        <span v-show="status==='in'"
              style="color:green">在职</span>
        <span v-show="status==='stop'"
              style="color:red">停职</span>
        <span v-show="status==='out'"
              style="color:grey">离职</span>
      </template>
    </a-table>
  </a-card>
</template>

<script>
import { getList } from '@/api/demo'

const columns = [{
  title: '姓名',
  dataIndex: 'name',
  width: 100,
  scopedSlots: { customRender: 'name' }
}, {
  title: '年龄',
  dataIndex: 'age',
  sorter: true,
  align: 'left',
  width: 80
}, {
  title: '性别',
  dataIndex: 'gender',
  filters: [
    { text: '男性', value: 'male' },
    { text: '女性', value: 'female' }
  ],
  align: 'center',
  width: 80,
  scopedSlots: { customRender: 'gender' }
}, {
  title: '身份证',
  dataIndex: 'id',
  width: 180
}, {
  title: '入职日期',
  dataIndex: 'checkInDate',
  sorter: true,
  width: 120
}, {
  title: '状态',
  dataIndex: 'status',
  width: 80,
  align: 'center',
  scopedSlots: { customRender: 'status' }
}, {
  title: '地址',
  dataIndex: 'city'
}]

export default {
  mounted () {
    this.fetch({ pageSize: this.pagination.defaultPageSize })
  },
  data () {
    return {
      dataSource: [],
      pagination: { 'showQuickJumper': true, 'showSizeChanger': true, 'defaultPageSize': 10, showTotal: (total, range) => `当前：${range[0]}-${range[1]}, 共 ${total} 项` },
      loading: false,
      columns: columns,
      bordered: true,
      selectedRowKeys: [],
      advanced: false,
      formQuery: this.$form.createForm(this),
      tableFilters: {},
      tableOrder: {}
    }
  },
  methods: {
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    handleTableChange (pagination, filtersArg, sorter) {
      const pager = { ...this.pagination }
      pager.current = pagination.current
      this.pagination = pager

      const filters = Object.keys(filtersArg).reduce((obj, key) => {
        const newObj = { ...obj }
        newObj[key] = this.getValue(filtersArg[key])
        return newObj
      }, {})

      // 记录列表筛选条件
      this.tableFilters = { ...filters }
      this.tableOrder = { sorter: sorter.field, order: sorter.order }

      const query = this.getQuery()

      const params = {
        pageSize: pagination.pageSize,
        currentPage: pagination.current,
        ...filters,
        ...query
      }

      if (sorter.field) {
        params.sorter = sorter.field
        params.order = sorter.order
      }

      this.fetch(params)
    },
    fetch (params = {}) {
      this.loading = true
      getList({ ...params }).then((data) => {
        let ret = data.data
        const pagination = { ...this.pagination }
        pagination.total = ret.pagination.total
        pagination.current = parseInt(ret.pagination.currentPage)
        this.loading = false
        this.dataSource = JSON.parse(JSON.stringify(ret.results))
        this.pagination = pagination
      })
    },
    getValue (arry) {
      return arry.join(',')
    },
    handleMenuClick (e) {
      console.log(e.key)
    },
    addItem () {

    },
    eidtItem () {

    },
    viewItem () {

    },
    deleteItem () {

    },
    qSearch () {
      this.advanced = !this.advanced
    },
    clearQueryClick () {
      this.formQuery.resetFields()
    },
    queryClick () {
      let params = { ...this.getQuery(), ...this.tableFilters, ...this.tableOrder }
      this.fetch(params)
    },
    getQuery () {
      let qf = this.formQuery.getFieldsValue()
      if (qf['checkInDate']) {
        qf.checkInDate = this.$moment(qf.checkInDate).format('YYYY-MM-DD')
      }

      if (qf['status']) {
        qf.status = qf.status.join(',')
      }

      return qf
    }

  }
}
</script>

<style lang="less" scoped>
.operator {
  margin-bottom: 18px;
}
.showSearch {
  display: none;
}
</style>
