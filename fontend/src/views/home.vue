<template>
  <div class="home">
    <el-container>
      <el-header height="60px">
        <!-- Header content -->
        <el-row>
          <!-- logo区 -->
          <el-col :span="3">
            <div class="logo">
              <span>CMS管理系统</span>
            </div>
          </el-col>
          <!-- 导航区 -->
          <el-col :span="15">
            <nav-bar></nav-bar>
          </el-col>
          <!-- 个人信息区 -->
          <el-col :span="6">
            <div class="userinfo">
              <span class="username">{{ username }}</span>
              <el-button type="info" @click="logout" size="medium">退出</el-button>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-main height>
        <!-- Main content -->
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>
<script>
import navBar from '../components/navbar'
export default {
  name: 'home',
  components: {
    navBar
  },
  data() {
    return {
      username: window.localStorage.getItem('name')
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('userInfo/logout')
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
.el-header {
  background-color: #545c64;
  font-size: 20px;
}
.logo {
  line-height: 60px;
  height: 60px;
}
.userinfo {
  line-height: 60px;
  height: 60px;
  float: right;
  .username {
    margin-right: 10px;
  }
}
</style>
