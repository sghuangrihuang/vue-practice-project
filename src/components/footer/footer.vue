<template>
  <mu-paper class="footer">
    <mu-bottom-nav :value="bottomNav" shift @change="handleChange">
      <mu-bottom-nav-item value="home" title="home" icon="home" to="/home"/>
      <mu-bottom-nav-item value="subject" title="subject" icon="subject" to="/home" />
      <mu-bottom-nav-item value="message" title="message" icon="message" to="/" />
      <mu-bottom-nav-item value="user" title="user" icon="person" :to="userStatus" />
    </mu-bottom-nav>
  </mu-paper>
</template>

<script>
import {mapState} from 'vuex'

export default {
  data () {
    return {
      bottomNav: 'home'
    }
  },
  created() {
    this.facthData()
  },
  computed: {
    ...mapState([
      'loginStatus'
    ]),
    userStatus() {
      return this.loginStatus ? '/user' : '/login'
    }
  },
  methods: {
    handleChange (val) {
      this.bottomNav = val
    },
    facthData() {
      if (this.$route.path === '/user' || this.$route.path === '/login') {
        this.bottomNav = 'user'
      } else {
        this.bottomNav = 'home'
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
 .footer
  position fixed
  left 0
  right 0
  bottom 0
  height 56px
</style>
