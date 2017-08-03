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
      <mu-list-item title="仓库" @click="reposClick">
        <mu-icon slot="left" value="folder"/>
        <mu-badge :content="`${loginInfo.public_repos}`" slot="after" primary/>
      </mu-list-item>
      <mu-list-item title="粉丝"  @click="followerClick">
        <mu-icon slot="left" value="person_pin"/>
        <mu-badge :content="`${loginInfo.followers}`" slot="after" primary/>
      </mu-list-item>
      <mu-list-item title="关注" @click="followingClick">
        <mu-icon slot="left" value="favorite"/>
        <mu-badge :content="`${loginInfo.following}`" slot="after" primary/>
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
    <transition name="test">
      <div class="testList" v-show="itemArr && itemArr.length">
        <mu-icon-button icon="reply" slot="left" @click="closeTest"/>
        <mu-icon-menu icon="more_vert" :value="branches" @change="changeVal">
          <mu-menu-item v-for="(item, index) in itemArr" :key="index" :title="item.name" :value="item.name"/>
        </mu-icon-menu>
        <mu-menu-item :title="branches">
          <mu-badge :content="`${commitList.length}`" slot="after" primary/>
        </mu-menu-item>
        <mu-list>
          <mu-list-item v-for="(item, index) in commitList" :key="index" 
            :title="item.commit.author.name" 
            :describeText="item.commit.message" 
            :afterText="item.commit.author.date | toDate">
          </mu-list-item>
        </mu-list>
      </div>
    </transition>
    <transition name="move">
      <div class="moveList" v-show="moveFlag">
        <mu-icon-button icon="reply" color="red" slot="left" @click="closeFlag"/>
        <mu-list v-show="followers && followers.length">
          <mu-list-item v-for="item in followers" :key="item.id" :title="item.name || item.login" :describeText="item.html_url">
            <mu-avatar :src="item.avatar_url" slot="leftAvatar" />
            <mu-icon value="info" slot="right"/>
          </mu-list-item>
        </mu-list>
        <mu-list v-show="repos && repos.length ">
          <mu-list-item @click="itemclick(repo)" v-for="repo in repos" :key="repo.id" :title="repo.name" :describeText="repo.description || 'no description'">
            <mu-icon value="folder" slot="left" primary/>
          </mu-list-item>
        </mu-list>
        <mu-list v-show="following && following.length">
          <mu-list-item v-for="item in following" :key="item.id" :title="item.name || item.login" :describeText="item.html_url">
            <mu-avatar :src="item.avatar_url" slot="leftAvatar" />
            <mu-icon value="info" slot="right"/>
          </mu-list-item>
        </mu-list>
      </div>
    </transition>
    <transition name="fade">
      <div class="loading" v-show="loadingFlag">
        <mu-circular-progress :size="60" :strokeWidth="3" />
      </div>
    </transition>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import axios from 'axios'

export default {
  name: 'user',
  data() {
    return {
      dialog: false,
      followers: {
        type: Object
      },
      loadingFlag: false,
      repos: {
        type: Object
      },
      moveFlag: false,
      following: {
        type: Object
      },
      selectItem: '',
      itemArr: {
        type: Array
      },
      branches: 'master',
      commitList: []
    }
  },
  computed: {
    ...mapState([
      'loginInfo',
      'loginStatus'
    ])
  },
  filters: {
    toDate(val) {
      return val.replace(/T/g, ' ').replace(/Z/g, '')
    }
  },
  methods: {
    ...mapActions([
      'setLoginInfo',
      'setLoginStatus'
    ]),
    closeTest() {
      this.itemArr = []
    },
    changeVal(val) {
      this.branches = val
      let url = `${this.selectItem}?sha=${val}`
      axios.get(url).then((res) => {
        this.commitList = res.data
        this.loadingFlag = false
      }).catch((res) => {
        console.log(res)
      })
    },
    itemclick(repo) {
      let commitUrl = repo.commits_url.split('{')[0]
      let url = repo.branches_url.split('{')[0]
      this.loadingFlag = true
      axios.get(url).then((res) => {
        this.itemArr = res.data
        this.selectItem = commitUrl
        this.changeVal('master')
      }).catch((res) => {
        console.log(res)
      })
    },
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
    },
    closeFlag() {
      this.moveFlag = false
      this.followers = {}
      this.repos = {}
      this.following = {}
    },
    followingClick() {
      if (!this.loginInfo.following) {
        return
      }
      let url = `https://api.github.com/users/${this.loginInfo.login}/following`
      this.loadingFlag = true
      axios.get(url).then((res) => {
        this.following = res.data
        this.loadingFlag = false
        this.moveFlag = true
      }).catch((res) => {
        console.log(res)
      })
    },
    followerClick() {
      if (!this.loginInfo.followers) {
        return
      }
      let url = `https://api.github.com/users/${this.loginInfo.login}/followers`
      this.loadingFlag = true
      axios.get(url).then((res) => {
        this.followers = res.data
        this.loadingFlag = false
        this.moveFlag = true
      }).catch((res) => {
        console.log(res)
      })
    },
    reposClick() {
      if (!this.loginInfo.public_repos) {
        return
      }
      let url = `https://api.github.com/users/${this.loginInfo.login}/repos`
      this.loadingFlag = true
      axios.get(url).then((res) => {
        this.repos = res.data
        this.loadingFlag = false
        this.moveFlag = true
      }).catch((res) => {
        console.log(res)
      })
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.moveList
  position: absolute
  top:0px
  left: 0
  right 0
  bottom:0px
  z-index: 30
  background-color: #FFF
  transform:translate3d(0,0,0)
  &.move-enter-active,&.move-leave-active
    transition: all 0.2s linear
  &.move-enter,&.move-leave-active
    transform:translate3d(100%,0,0)
.testList
  position: absolute
  top:0px
  left: 0
  right 0
  bottom:0px
  z-index: 35
  background-color: #FFF
  transform:translate3d(0,0,0)
  &.test-enter-active,&.test-leave-active
    transition: all 0.2s linear
  &.test-enter,&.test-leave-active
    transform:translate3d(100%,0,0)
  .mu-list
    background-color: #FFF
.loading
  position: absolute
  top:0px
  left: 0
  right 0
  text-align center
  bottom:0px
  z-index: 30
  display flex
  flex-direction column
  align-items center
  justify-content center
  opacity 1
  background-color: rgba(0, 0, 0, .5)
  &.fade-enter-active, &.fade-leave-active
    transition: all 0.2s linear
  &.fade-enter,&.fade-leave-active
    opacity 0
</style>
