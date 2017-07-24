<template>
  <div class='tabs-wrapper'>
    <transition name="fade">
      <div class="tabs" v-show="tabFlag" @click.stop='tabFlag=!tabFlag'>
        <div class="tabBox" @click.stop>
          <router-link tag="div" class="tab-item" to="/home">首页</router-link>
          <router-link tag="div" class="tab-item" to="/login" v-show="!loginStatus">登陆</router-link>
          <div class="tab-item" v-show="loginStatus" @click.prevent.stop="signOut">退出</div>
          <div class="close" @click='hide'>Close</div>
        </div>
      </div>
    </transition>
    <confirm ref="confirm" @confirm="confirmClear" text="是否退出账号" confirmBtnText="是" cancelBtnText="否"></confirm>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import confirm from '../confirm/confirm'

export default {
  name: 'home',
  data() {
    return {
      tabFlag: false
    }
  },
  computed: {
    ...mapState([
      'loginStatus'
    ])
  },
  methods: {
    ...mapActions([
      'setLoginInfo',
      'setLoginStatus'
    ]),
    show() {
      this.tabFlag = true
    },
    hide() {
      this.tabFlag = false
    },
    signOut() {
      this.$refs.confirm.show()
    },
    confirmClear() {
      this.setLoginInfo('')
      this.setLoginStatus(false)
      this.hide()
    }
  },
  components: {
    confirm
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  .tabs
    position fixed
    width 100%
    text-align center
    top 0
    left 0
    height 100%
    z-index 10
    transform:translate3d(0, 0, 0)
    &.fade-enter-active, &.fade-leave-active
      transition: all 0.2s linear
		&.fade-enter, &.fade-leave-active
      transform:translate3d(-100%, 0, 0)
    .tabBox
      position absolute
      z-index 15
      left 0
      top 0
      width 40%
      height 100%
      background rgba(0, 0, 0, .6)
      .tab-item
        font-size 18px
        line-height 40px
      .close
        position absolute
        bottom 0
        left 0
        width 100%
        height 40px
        line-height 40px
</style>
