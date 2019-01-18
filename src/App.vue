<template>
 <a-locale-provider :locale="localeSetting">
  <div id="app">
    <router-view/>
  </div>
 </a-locale-provider>
</template>
<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import enGB from 'ant-design-vue/lib/locale-provider/en_GB'
export default {
  name: 'App',
  computed: {
    localeSetting () {
      return this.$store.state.setting.locale === 'zh_CN' ? zhCN : enGB
    }
  }
}
</script>
<style lang="less">
</style>
