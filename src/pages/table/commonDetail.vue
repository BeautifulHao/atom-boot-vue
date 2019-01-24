<template>

  <a-card :bordered="true"
          :style="{minHeight:minHeight}">
    <div>
      <a-form layout="horizontal"
              :form="formQuery"
              bordered="true">
        <div>
          <a-row>
            <a-col :md="8"
                   :sm="24">
              <a-form-item label="姓 名"
                           :labelCol="{span: 5}"
                           :wrapperCol="{span: 18, offset: 1}"
                           key="userName">
                <a-input placeholder="请输入人员姓名"
                         v-decorator="['name',{rules: [{ required: true, message: '请输入人员姓名' }]}]"
                         :disabled="isDisable" />
              </a-form-item>
            </a-col>
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
                                v-decorator="['age',{}]"
                                :disabled="isDisable" />
              </a-form-item>
            </a-col>
            <a-col :md="8"
                   :sm="24">
              <a-form-item label="性 别"
                           :labelCol="{span: 5}"
                           :wrapperCol="{span: 18, offset: 1}"
                           key="gender">
                <a-select placeholder="请选择"
                          v-decorator="['gender',{}]"
                          :disabled="isDisable">
                  <a-select-option value="male">男性</a-select-option>
                  <a-select-option value="female">女性</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :md="8"
                   :sm="24">
              <a-form-item label="身份证"
                           :labelCol="{span: 5}"
                           :wrapperCol="{span: 18, offset: 1}"
                           key="id">
                <a-input placeholder="请输入位身份证信息"
                         v-decorator="['id',{}]"
                         :disabled="isDisable" />
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
                          :disabled="isDisable">
                  <a-select-option value="in">在职</a-select-option>
                  <a-select-option value="stop">停职</a-select-option>
                  <a-select-option value="out">离职</a-select-option>
                </a-select>
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
                               v-decorator="['checkInDate',{}]"
                               :disabled="isDisable" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :md="8"
                   :sm="24">
              <a-form-item label="地 址"
                           :labelCol="{span: 5}"
                           :wrapperCol="{span: 18, offset: 1}"
                           key="city">
                <a-input placeholder="请输入地址"
                         v-decorator="['city',{}]"
                         :disabled="isDisable" />
              </a-form-item>
            </a-col>
          </a-row>
        </div>
      </a-form>
    </div>
    <div class="operator">
      <a-row>
        <a-col :md="24"
               :sm="24"
               style="text-align: right;margin-bottom:18px;">
          <a-button type="primary"
                    icon="save"
                    size="large"
                    @click="saveClick"
                    v-show="this.model !== 'View'">保存</a-button>
          <a-button type="primary"
                    style="margin-left: 8px"
                    icon="select"
                    size="large"
                    @click="backClick">返回</a-button>
        </a-col>
      </a-row>
    </div>
  </a-card>

</template>

<script>
import { getItem, saveItem } from '@/api/demo'
const minHeight = window.innerHeight - 64 - 10 - 40

export default {
  name: 'CommonDetail',
  props: ['busKey', 'editType'],
  mounted () {
    this.initForm()
  },
  data () {
    return {
      formQuery: this.$form.createForm(this),
      minHeight: minHeight + 'px',
      formValue: {},
      key: this.busKey === '*' ? '' : this.busKey,
      model: this.editType
    }
  },
  computed: {
    isDisable () {
      return this.model === 'View'
    }
  },
  methods: {
    saveClick () {
      let me = this
      this.formQuery.validateFields(
        (err, item) => {
          if (!err) {
            if (item.checkInDate) {
              item.checkInDate = this.$moment(item.checkInDate).format('YYYY-MM-DD')
            }
            item.key = this.key
            saveItem({ item }).then((data) => {
              let ret = data.data
              if (ret.result === true) {
                me.$message.success('保存成功')
                this.key = ret.message.key
                this.model = 'Edit'
              } else {
                me.$error({
                  title: '保存失败',
                  content: `失败原因：${ret.message}`
                })
              }
            })
          }
        }
      )
    },
    backClick () {
      this.$router.replace({ name: 'common-list', params: { replace: this.$route.fullPath } })
    },
    fetch (key) {
      getItem({ key: key }).then((data) => {
        let ret = data.data
        if (ret.result === true) {
          this.formValue = ret.message
          this.formValue.checkInDate = this.$moment(this.formValue.checkInDate)
          this.formQuery.setFieldsValue(this.formValue)
        } else {
          this.$error({
            title: '获取数据失败',
            content: `发生了以下错误：${ret.message}`
          })
        }
      })
    },
    initForm () {
      this.key = this.busKey === '*' ? '' : this.busKey
      this.model = this.editType
      if (this.model === 'Edit' || this.model === 'View') {
        this.fetch(this.key)
      } else {
        this.formQuery.resetFields()
      }
    }
  },
  activated () {
    // 进入页面会带参数
    if (this.$route.params.replace) {
      this.initForm()
    }
  }
}

</script>
<style lang='less' scoped>
.operator {
  margin: 24px;
  position: relative;
}
</style>
