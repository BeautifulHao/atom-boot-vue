<template>
  <div class="container">
    <div class="content">
     <div class="top">
      <div class="header">
          <span class="title">系统登录</span>
      </div>
      </div>
      <div class="spliter">
        <a-divider dashed />
      </div>
      <div class="login">
        <a-form @submit="onSubmit" :autoFormCreate="(form) => this.form = form">
          <a-tabs size="large" :tabBarStyle="{textAlign: 'center'}" style="padding: 0 2px;">
            <a-tab-pane tab="账户密码登录" key="1">
              <a-alert type="error" :closable="true" v-show="error" :message="error" showIcon style="margin-bottom: 24px;" />
              <a-form-item
                fieldDecoratorId="username"
                :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入账户名', whitespace: true}]}">
                <a-input size="large" placeholder="admin" >
                  <a-icon slot="prefix" type="user" />
                </a-input>
              </a-form-item>
              <a-form-item
                fieldDecoratorId="password"
                :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入密码', whitespace: true}]}">
                <a-input size="large" placeholder="123456" type="password">
                  <a-icon slot="prefix" type="lock" />
                </a-input>
              </a-form-item>
            </a-tab-pane>
            <a-tab-pane tab="手机号登录" key="2">
              <a-form-item>
                <a-input size="large" placeholder="手机号码" >
                  <a-icon slot="prefix" type="mobile" />
                </a-input>
              </a-form-item>
              <a-form-item>
                <a-row :gutter="8" style="margin: 0 -4px">
                  <a-col :span="16">
                    <a-input size="large" placeholder="验证码">
                    <a-icon slot="prefix" type="mail" />
                  </a-input>
                  </a-col>
                  <a-col :span="8" style="padding-left: 4px">
                    <a-button style="width: 100%" class="captcha-button" size="large">获取验证码</a-button>
                  </a-col>
                </a-row>
              </a-form-item>
            </a-tab-pane>
          </a-tabs>
          <div>
            <a-checkbox :value="autoLogin" >自动登录</a-checkbox>
            <a style="float: right;">忘记密码</a>
          </div>
          <a-form-item>
            <a-button :loading="logging" style="width: 100%;margin-top: 24px" size="large" htmlType="submit" type="primary">登录</a-button>
          </a-form-item>
          <div>
            其他登录方式
            <a-icon class="icon" type="alipay-circle" />
            <a-icon class="icon" type="taobao-circle" />
            <a-icon class="icon" type="weibo-circle" />
            <router-link style="float: right;" to="/dashboard/workplace" >注册账户</router-link>
          </div>
        </a-form>
      </div>
    </div>
    <global-footer :link-list="linkList" :copyright="copyright" />
  </div>
</template>

<script>
import GlobalFooter from '../../layouts/GlobalFooter'
import { login } from '@/api/auth'

export default {
  name: 'Login',
  components: {GlobalFooter},
  props: ['redirectTo'],
  data () {
    return {
      logging: false,
      error: '',
      autoLogin: false
    }
  },
  computed: {
    systemName () {
      return this.$store.state.setting.systemName
    },
    linkList () {
      return this.$store.state.setting.footerLinks
    },
    copyright () {
      return this.$store.state.setting.copyright
    }
  },
  methods: {
    onSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.logging = true
          login({
            username: this.form.getFieldValue('username'),
            password: this.form.getFieldValue('password')
          }).then((res) => {
            this.logging = false
            const result = res.data
            if (result.result === true) {
              const user = result.data.user
              this.$store.commit('account/setuser', user)
              this.$message.success(result.message, 3)
              this.$cookies.set('token', result.data.token, '0')

              if (this.redirectTo) {
                let {name, path, query, params} = this.redirectTo
                this.$router.push({name, path, query, params})
              } else {
                this.$router.push('/dashboard/workplace')
              }
            } else {
              this.error = result.message
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  @import './bgBlue.less';

  .container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: auto;
    background-size: 100%;
    .content {
      padding: 32px 0;
      flex: 1;
      background: #f0f2f5  no-repeat center @bgimg;
      @media (min-width: 768px){
        padding: 112px 0 24px;
      }
      .top {
        margin: 0 auto;
        width: 400px;
        background: #ffffff;
        text-align: center;
        .header {
          height: 80px;
          line-height: 82px;
          text-align: left;
          padding-left: 30px;
          .title {
            font-size: 31px;
            font-family: 'Myriad Pro', 'Helvetica Neue', Arial, Helvetica, sans-serif;
            font-weight: 500;
            position: relative;
            color: #379ed1;
            top: 2px;
          }
        }
      }
      .spliter {
        margin: 0 auto;
        background: #ffffff;
        width: 400px;
        .ant-divider-horizontal{
          margin: 0;
        }
      }
      .login {
        width: 400px;
        height: 420px;
        background: #ffffff;
        padding: 0 30px;
        margin: 0 auto;
        @media screen and (max-width: 576px) {
          width: 95%;
        }
        @media screen and (max-width: 320px) {
          .captcha-button{
            font-size: 14px;
          }
        }
        .icon {
          font-size: 24px;
          color: rgba(0, 0, 0, 0.2);
          margin-left: 16px;
          vertical-align: middle;
          cursor: pointer;
          transition: color 0.3s;
          &:hover {
            color: #1890ff;
          }
        }
      }
    }
  }
</style>
