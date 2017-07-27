<template>
  <mu-paper class="footer">
    <mu-bottom-nav :value="bottomNav" shift @change="handleChange">
      <mu-bottom-nav-item value="home" title="home" icon="home" to="/home"/>
      <mu-bottom-nav-item value="subject" title="subject" icon="subject" to="/home" />
      <mu-bottom-nav-item value="message" title="message" icon="message" to="/" />
      <mu-bottom-nav-item value="person" title="person" icon="person" to="/login" />
    </mu-bottom-nav>
  </mu-paper>
</template>

<script>
export default {
  data () {
    return {
      bottomNav: 'home'
    }
  },
  created() {
    this.facthData()
  },
  methods: {
    handleChange (val) {
      this.bottomNav = val
    },
    facthData() {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
 .footer
  position absolute
  bottom 0
  width 100%
  left 0
</style>
