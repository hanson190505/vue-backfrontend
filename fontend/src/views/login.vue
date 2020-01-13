<template>
  <div class="login_container">
    <div class="login_box">
      <!-- logo -->
      <div class="avatar_box">
        <img src="../assets/img/logo.png" alt="" />
      </div>
      <!-- 登录框 -->
      <el-form
        :model="loginform"
        :rules="LoginFormRoles"
        ref="LoginFormRef"
        class="login_form"
      >
        <el-form-item prop="username">
          <el-input
            placeholder="请输入用户名"
            prefix-icon="el-icon-user"
            v-model="loginform.username"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
            v-model="loginform.password"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetlogin">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { request } from '../network/rquest'
import qs from 'qs'
export default {
  data() {
    return {
      loginform: {
        username: '',
        password: '',
        ac: 'login'
      },
      LoginFormRoles: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入用密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    resetlogin() {
      this.$refs.LoginFormRef.resetFields()
    },
    login() {
      this.$refs.LoginFormRef.validate(valid => {
        if (!valid) {
          return
        }
        request({
          url: 'users/',
          method: 'POST',
          // params: { ac: "login" },
          headers: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          data: qs.stringify(this.loginform)
        })
          .then(res => {
            if (res.data.status === 410) {
              return this.$message.error('用户名不存在')
            }
            if (res.data.status === 411) {
              return this.$message.error('密码错误')
            }
            if (res.data.status === 412) {
              return this.$message.error('用户审核中')
            }
            this.$message.success('登录成功')
            window.sessionStorage.setItem('token', res.data.token)
            this.$router.replace('/home')
          })
          .catch(res => {})
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.avatar_box {
  height: 130px;
  width: 130px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 10px;
  box-shadow: #ddd;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eee;
  }
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.btns {
  display: flex;
  justify-content: flex-end;
}
</style>
