<template>
  <div class="home">
    <tabs ref="tabs"></tabs>
    <button @click="showTabs">test</button>   
  </div>
</template>

<script>
import tabs from '../tabs/tabs'
import {mapActions, mapState} from 'vuex'

export default {
  name: 'home',
  data() {
    return {}
  },
  computed: {
    ...mapState([
      'loginStatus'
    ])
  },
  methods: {
    ...mapActions([
      'setLoginInfo',
      'setLoginStatus'
    ]),
    showTabs() {
      this.$refs.tabs.show()
    }
  },
  components: {
    confirm,
    tabs
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  .tabs
    position fixed
    width 100%
    text-align center
    top 0
    left 0
    height 100%
    z-index 10
    transform:translate3d(0, 0, 0)
    &.fade-enter-active, &.fade-leave-active
      transition: all 0.2s linear
		&.fade-enter, &.fade-leave-active
      transform:translate3d(-100%, 0, 0)
    .tabBox
      position absolute
      z-index 15
      left 0
      top 0
      width 40%
      height 100%
      background rgba(0, 0, 0, .6)
      .tab-item
        font-size 18px
        line-height 40px
</style>
