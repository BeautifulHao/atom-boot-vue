<template>
  <div>
    <div>
      {{pageType}}
    </div>
    <a-button type="primary" @click="addClick">新增</a-button>
     <a-button type="primary" @click="editClick">修改</a-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  computed: {
    pageType () {
      return this.$route.params.pageType
    }
  },
  watch: {
    pageType (newValue) {
      console.log(newValue)
    },
    $route (to, from) {
      console.log(to)
    }
  },
  methods: {
    addClick () {
      this.$router.replace({ name: 'demoRoute', params: { pageType: 'add' } })
    },
    editClick () {
      this.$router.replace({ name: 'demoRoute', params: { pageType: 'edit' } })
    }
  }
}

</script>
<style lang='less' scoped>
</style>
