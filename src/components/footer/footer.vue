<template>
  <mu-paper class="footer">
    <mu-bottom-nav :value="bottomNav" shift @change="handleChange">
      <mu-bottom-nav-item value="movies" title="Movies" icon="ondemand_video" to="/login"/>
      <mu-bottom-nav-item value="music" title="Music" icon="music_note" to="/home" />
      <mu-bottom-nav-item value="books" title="Books" icon="books" to="/" />
      <mu-bottom-nav-item value="pictures" title="Pictures" icon="photo" to="/" />
    </mu-bottom-nav>
  </mu-paper>
</template>

<script>
export default {
  data () {
    return {
      bottomNav: 'movies',
      bottomNavColor: 'movies'
    }
  },
  methods: {
    handleChange (val) {
      this.bottomNav = val
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
