<template>
  <div>
    It is a Demo
    <button @click="NProgressMethod">NProgress</button>
  </div>
</template>
<script>
import NProgress from 'nprogress/nprogress'

export default {
  name: 'DemoItem',
  data () {
    return {
      desc: '空白页面测试',
      value: 1
    }
  },
  methods: {
    NProgressMethod () {
      NProgress.start()
    }
  }
}
</script>
<style lang="less">
</style>
