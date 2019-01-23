<template>
  <div>
    我是明细界面
    {{busKey}}:{{editType}}
  </div>
</template>

<script>
export default {
  name: 'CommonDetail',
  props: ['busKey', 'editType'],
  data () {
    return {
    }
  }
}

</script>
<style lang='less' scoped>
</style>
