<template>
  <div class="user" v-show="loginInfo">
    <mu-avatar :src="loginInfo.avatar_url"  slot="left" :size="200" style="margin:20px auto;display:block"/>
    <mu-divider shallowInset/>
    <mu-list>
      <mu-list-item title="姓名">
        <mu-icon slot="left" value="person"/>
        <mu-badge :content="loginInfo.name || loginInfo.login" primary slot="after"/>
      </mu-list-item>
      <mu-list-item title="邮箱">
        <mu-icon slot="left" value="email"/>
        <mu-badge :content="loginInfo.email || '未公开'" primary slot="after"/>
      </mu-list-item>
      <mu-list-item title="博客">
        <mu-icon slot="left" value="address"/>
      </mu-list-item>
      <mu-divider shallowInset/>
      <mu-list-item title="退出" @click="open">
        <mu-icon slot="left" value="power_settings_new"/>
      </mu-list-item>
    </mu-list>
    <mu-dialog :open="dialog" title="是否退出" @close="close">
      <mu-flat-button slot="actions" @click="close" primary label="取消"/>
      <mu-flat-button slot="actions" primary @click="signOut" label="确定"/>
  </mu-dialog>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'

export default {
  name: 'user',
  data() {
    return {
      dialog: false
    }
  },
  computed: {
    ...mapState([
      'loginInfo',
      'loginStatus'
    ])
  },
  methods: {
    ...mapActions([
      'setLoginInfo',
      'setLoginStatus'
    ]),
    open() {
      this.dialog = true
    },
    close() {
      this.dialog = false
    },
    signOut() {
      this.dialog = false
      this.setLoginStatus(false)
      this.setLoginInfo('')
      this.$router.push({
        path: '/login'
      })
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
