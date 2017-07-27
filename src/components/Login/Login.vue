<template>
  <div class="login">
    <div class="warrper">
      <mu-text-field v-model="access_token" label="Access Token" :errorText="error" labelFloat/>
      <mu-raised-button @click="login" label="登录" class="demo-raised-button" primary/>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import {mapActions, mapState} from 'vuex'

export default {
  name: 'login',
  data() {
    return {
      access_token: '68d97a95-249b-4fe4-bd43-6f17e073b206',
      error: ''
    }
  },
  computed: {
    ...mapState([
      'testMess',
      'loginStatus',
      'loginInfo'
    ])
  },
  methods: {
    ...mapActions([
      'setLoginInfo',
      'setLoginStatus'
    ]),
    login() {
      if (this.loginStatus) {
        return
      }
      let _this = this
      let url = 'https://cnodejs.org/api/v1/accesstoken'
      axios.post(url, {
        accesstoken: _this.access_token
      }).then(res => {
        _this.setLoginStatus(true)
        _this.setLoginInfo(res.data)
        _this.$router.push({
          path: '/user'
        })
      }).catch(res => {
        _this.error = 'error'
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  .login
    position absolute
    top 56px
    left 0
    right 0
    bottom 56px
    z-index 10
    display: flex;
    .warrper
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .demo-raised-button
        margin-top 40px
        width 256px
</style>
