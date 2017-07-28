<template>
  <div id="app">
    <m-header></m-header>
    <div class="contentWarrper">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <m-footer></m-footer>
  </div>
</template>

<script>
import header from './components/header/header'
import footer from './components/footer/footer'

export default {
  name: 'app',
  components: {
    'm-header': header,
    'm-footer': footer
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .contentWarrper
    position fixed
    top 56px
    bottom 56px
    left 0
    right 0px
    overflow-y auto
    overflow-x hidden
</style>
