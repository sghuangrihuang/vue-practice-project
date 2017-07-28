<template>
  <div class="login">
    <div class="warrper">
      <mu-text-field v-model="userLoginName" label="Access Token" :errorText="error" labelFloat/>
      <mu-raised-button @click="login" label="查看" class="demo-raised-button" primary/>
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
      userLoginName: 'sghuangrihuang',
      error: ''
    }
  },
  computed: {
    ...mapState([
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
      let url = `https://api.github.com/users/${this.userLoginName}`
      axios.get(url).then(res => {
        this.setLoginStatus(true)
        this.setLoginInfo(res.data)
        this.$router.push({
          path: '/user'
        })
      }).catch(res => {
        this.error = '用户名错误，请重新输入'
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
