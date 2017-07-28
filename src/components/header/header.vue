<template>
  <mu-appbar title="github" class="header">
    <mu-icon-menu icon="more_vert" slot="right" :value="theme" @change="changeTheme">
      <mu-menu-item title="LIGHT" value="light"/>
      <mu-menu-item title="DARK" value="dark"/>
      <mu-menu-item title="CARBON" value="carbon"/>
      <mu-menu-item title="TEAL" value="teal"/>
    </mu-icon-menu>
  </mu-appbar>
</template>
<script>
import light from '!raw-loader!muse-ui/dist/theme-default.css'
import dark from '!raw-loader!muse-ui/dist/theme-dark.css'
import carbon from '!raw-loader!muse-ui/dist/theme-carbon.css'
import teal from '!raw-loader!muse-ui/dist/theme-teal.css'
export default {
  data() {
    return {
      theme: 'light',
      themes: {
        light,
        dark,
        carbon,
        teal
      }
    }
  },
  methods: {
    changeTheme(theme) {
      this.theme = theme
      const styleEl = this.getThemeStyle()
      styleEl.innerHTML = this.themes[theme] || ''
    },
    getThemeStyle() {
      const themeId = 'muse-theme'
      let styleEl = document.getElementById(themeId)
      if (styleEl) return styleEl
      styleEl = document.createElement('style')
      styleEl.id = themeId
      document.body.appendChild(styleEl)
      return styleEl
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .header
    position fixed
    top 0
    left 0
    right 0
    height 56px
</style>
