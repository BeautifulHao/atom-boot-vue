<template>
  <div class="top">
    It is a Demo
    <button @click="NProgressMethod">NProgress</button>
  </div>
</template>
<script>
import NProgress from 'nprogress/nprogress'

export default {
  methods: {
    NProgressMethod () {
      NProgress.start()
    }
  }
}
</script>
<style lang="less">
.top{
  position:absolute;
  top:100px;
}
</style>
