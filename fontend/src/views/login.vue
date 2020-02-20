<template>
  <div class="login_container">
    <div class="login_box">
      <!-- logo -->
      <div class="avatar_box">
        <img src="../assets/img/logo.png" alt />
      </div>
      <!-- 登录框 -->
      <el-form
        :model="loginform"
        :rules="LoginFormRoles"
        ref="LoginFormRef"
        class="login_form"
        inline-message
      >
        <el-form-item prop="u_name">
          <el-input
            placeholder="请输入用户名"
            prefix-icon="el-icon-user"
            v-model="loginform.u_name"
          ></el-input>
        </el-form-item>
        <el-form-item prop="u_password">
          <el-input
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
            v-model="loginform.u_password"
            type="password"
            @keyup.enter.native="login"
          ></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="register">注册</el-button>
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetlogin">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getUserInfo, getPubKey, getLogin, register } from '@/api/user'
export default {
  data() {
    return {
      loginform: {
        u_name: '',
        u_password: '',
        login: 'login'
      },
      LoginFormRoles: {
        u_name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        u_password: [
          { required: true, message: '请输入用密码', trigger: 'blur' },
          {
            min: 6,
            max: 256,
            message: '长度在 6 到 15 个字符',
            trigger: 'blur'
          }
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
        } else {
          getPubKey().then(res => {
            this.loginform.u_password = this.$jsEncrypt(
              this.loginform.u_password,
              res.data.pub_key
            )
            this.$store
              .dispatch('userInfo/loginSet', this.loginform)
              .then(res => {
                let status = res.data.status
                switch (status) {
                  case 410:
                    this.$message('用户名错误')
                    break
                  case 411:
                    this.$message('密码错误')
                    break
                  case 412:
                    this.$message('用户审核未通过')
                    break
                  case 2000:
                    //要用catch捕获这个错误,不然会报错,用replace不能跳转,会报错
                    // window.sessionStorage.setItem('token', res.data.token)
                    this.$router.replace('/dash').catch(err => {})
                    this.$message.success('登录成功')
                    // this.$store.state.username = loginform.username
                    break
                  default:
                    break
                }
              })
          })
        }
      })
    },
    register() {
      this.$refs.LoginFormRef.validate(valid => {
        if (!valid) {
          return
        } else {
          getPubKey()
            .then(res => {
              this.loginform.u_password = this.$jsEncrypt(
                this.loginform.u_password,
                res.data.pub_key
              )
              register(this.loginform)
                .then(res => {
                  this.$message('注册成功')
                })
                .catch(error => {
                  this.$message('注册失败,请更换用户名重试!')
                })
            })
            .catch(error => {
              this.$message('访问受限,请联系管理员')
            })
        }
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
