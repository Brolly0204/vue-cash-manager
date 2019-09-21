<template>
  <header class="head-nav">
    <el-row>
      <el-col class="logo-container" :span="6">
        <img class="logo" src="../assets/logo.png" alt="logo">
        <span class="title">布罗利在线后台管理系统</span>
      </el-col>
      <el-col class="user" :span="6">
        <div class="userinfo">
          <img :src="user.avatar" class="avatar" alt="">
          <div class="welcome">
            <p class="name comename">欢迎</p>
            <p class="name avatarname">{{user.name}}</p>
          </div>
          <span class="username">
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link">
                <i class="el-icon-caret-bottom el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="showInfo">个人信息</el-dropdown-item>
                <el-dropdown-item command="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </span>
        </div>
      </el-col>
    </el-row>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'HeadNav',
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    handleCommand(command) {
      this[command]()
    },
    showInfo() {
      this.$router.push('/profile')
    },
    logout() {
      console.log('logout')
      localStorage.removeItem('broToken')
      this.$store.dispatch('clearCurrentState')
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="stylus" scoped>
.head-nav {
  width: 100%;
  // height: 60px;
  min-width: 600px;
  padding: 5px 10px;
  background: #324057;
  color: #fff;
  border-bottom: 1px solid #1f2d3d;
  box-sizing border-box
}
.logo-container {
  line-height: 60px;
  min-width: 400px;
}
.logo {
  height: 50px;
  width: 50px;
  margin-right: 5px;
  vertical-align: middle;
  display: inline-block;
}
.title {
  vertical-align: middle;
  font-size: 22px;
  font-family: "Microsoft YaHei";
  letter-spacing: 3px;
}
.user {
  line-height: 60px;
  text-align: right;
  float: right;
  padding-right: 10px;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  vertical-align: middle;
  display: inline-block;
}
.welcome {
  display: inline-block;
  width: auto;
  vertical-align: middle;
  padding: 0 5px;
}
.name {
  line-height: 20px;
  text-align: center;
  font-size: 14px;
}
.comename {
  font-size: 12px;
}
.avatarname {
  color: #409eff;
  font-weight: bolder;
}
.username {
  cursor: pointer;
  margin-right: 5px;
}
.el-dropdown {
  color: #fff;
}
</style>
