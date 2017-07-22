<template>
  <div class="login">
    <div v-if="loginInfo" class="userInfo">
      <img :src='loginInfo.avatar_url' class="avatar"/>  
      <p style="text-align:center" class="name">{{loginInfo.loginname}}</p>
    </div>
    <div v-show="!loginStatus" style="margin-top:40px">
      <input type='text' v-model="access_token" style="margin-left: 20px"/>
      <button  @click='textClick()'>登陆</button>
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
      access_token: '68d97a95-249b-4fe4-bd43-6f17e073b206'
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
    back() {
      this.$router.back(-1)
    },
    textClick(singer) {
      if (this.loginStatus) {
        return
      }
      let url = 'https://cnodejs.org/api/v1/accesstoken'
      axios.post(url, {
        accesstoken: this.access_token
      }).then(res => {
        this.setLoginStatus(true)
        this.setLoginInfo(res.data)
        this.back()
      }).catch(res => {
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  .login
    .userInfo
      .avatar
        width 80px
        height 80px
        margin 0 auto 20px
        display block 
      .name
        text-align center
        font-size 18px
</style>
