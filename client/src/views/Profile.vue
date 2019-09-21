<template>
  <div class="profile">
    <el-row class="row-bg" type="flex" justify="center">
      <el-col :span="8">
        <div class="user">
          <img class="avatar" :src="user.avatar" alt="avatar">
        </div>
      </el-col>
      <el-col :span="16">
        <div class="userinfo">
          <div class="user-item">
            <i class="icon el-icon-user-solid"></i>
            <span>{{user.name}}</span>
          </div>
          <div class="user-item">
            <i class="icon el-icon-s-tools"></i>
            <span>{{identity}}</span>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Profile',
  created() {
    this.identities = {
      manager: '管理员',
      employee: '员工'
    }
  },
  computed: {
    ...mapGetters(['user']),
    identity() {
      return this.identities[this.user.identity]
    }
  }
}
</script>
<style scoped>
.profile {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  /* padding: 16px; */
}
.icon {
  margin-right: 10px;
}
.row-bg {
  width: 100%;
  height: 100%;
}
.user {
  text-align: center;
  position: relative;
  top: 30%;
}
.user img {
  width: 150px;
  border-radius: 50%;
}
.user span {
  display: block;
  text-align: center;
  margin-top: 20px;
  font-size: 20px;
  font-weight: bold;
}
.userinfo {
  height: 100%;
  background-color: #eee;
}
.user-item {
  position: relative;
  top: 30%;
  padding: 26px;
  font-size: 28px;
  color: #333;
}
</style>
