<template>
  <div class="login">
    <section class="form_container">
      <div class="manage_tip">
        <span class="title">纳米在线后台管理系统</span>
        <el-form
          :model="loginUser"
          status-icon
          :rules="rules"
          ref="loginForm"
          label-width="60px"
          class="loginForm"
        >

          <el-form-item
            label="邮箱"
            prop="email"
          >
            <el-input
              v-model="loginUser.email"
              placeholder="请输入邮箱"
            ></el-input>
          </el-form-item>

          <el-form-item
            label="密码"
            prop="password"
          >
            <el-input
              type="password"
              v-model="loginUser.password"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-button
              type="primary"
              class="submit_btn"
              @click="submitForm('loginForm')"
            >登录</el-button>
          </el-form-item>
          <div class="tiparea">
            <p>还没有账号？现在 <router-link to="/register">注册</router-link>
            </p>
          </div>
        </el-form>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      loginUser: {
        emial: '',
        password: ''
      },
      rules: {
        email: [
          {
            required: true,
            message: '请输入邮箱地址!',
            trigger: 'blur'
          },
          {
            type: 'email',
            message: '请输入正确的邮箱地址',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '密码不能为空',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios
            .post('/users/login', { ...this.loginUser })
            .then((res) => {
              if (res && res.data.code === 0) {
                const { token } = res.data
                localStorage.setItem('broToken', token)
                const decoded = this.$utils.decodeToken(token)
                this.$store.dispatch(
                  'setAuthenticated',
                  !this.$utils.isEmpty(decoded)
                )
                this.$store.dispatch('setUser', decoded)
                this.$router.push('/index')
              }
            })
            .catch(err => console.log(err))
        }
      })
    }
  }
}
</script>

<style scoped>
.login {
  position: relative;
  width: 100%;
  height: 100%;
  background: url(../assets/bg.jpg) no-repeat center center;
  background-size: 100% 100%;
}
.form_container {
  width: 370px;
  height: 210px;
  position: absolute;
  top: 10%;
  left: 34%;
  padding: 25px;
  border-radius: 5px;
  text-align: center;
}
.form_container .manage_tip .title {
  font-family: 'Microsoft YaHei';
  font-weight: bold;
  font-size: 26px;
  color: #fff;
}
.loginForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}

.submit_btn {
  width: 100%;
}

.tiparea {
  text-align: right;
  font-size: 12px;
  color: #333;
}

.tiparea p a {
  color: #409eff;
}
</style>
