<template>
  <div id="app">
    <m-header></m-header>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
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

</style>
