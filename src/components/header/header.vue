<template>
  <div class="header">
    <tabs ref="tabs"></tabs>
    <button class='btn' @click='showTabs'>切换</button>
  </div>
</template>

 <script type="text/ecmascript-6">
  import tabs from '../tabs/tabs'

  export default {
    methods: {
      showTabs() {
        this.$refs.tabs.show()
      }
    },
    components: {
      tabs
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .header
    position relative
    height 44px
    background #fff
    .btn
      position absolute
      top 10px
      height 20px
      padding 10px
      line-height 2px
      right 10px
</style>