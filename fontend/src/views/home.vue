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
            <el-menu
              :default-active="activeIndex"
              class="el-menu-home"
              mode="horizontal"
              @select="handleSelect"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b"
              router
            >
              <el-menu-item index="/home">首页</el-menu-item>
              <el-submenu index="1">
                <template slot="title">客户管理</template>
                <el-menu-item index="/customers">客户列表</el-menu-item>
              </el-submenu>
              <el-submenu index="2">
                <template slot="title">订单管理</template>
                <el-menu-item index="/orders">订单列表</el-menu-item>
                <el-menu-item index="/suborders">订单明细</el-menu-item>
              </el-submenu>
              <el-submenu index="3">
                <template slot="title">采购管理</template>
                <el-menu-item index="/purchases">采购列表</el-menu-item>
                <el-menu-item index="/purchasedetails">采购明细</el-menu-item>
              </el-submenu>
            </el-menu>
          </el-col>
          <!-- 个人信息区 -->
          <el-col :span="6">
            <div class="userinfo">
              <a href="http://" target="_blank" rel="noopener noreferrer">官网</a>
              <span>{{ username }}</span>
              <el-button type="info" @click="logout" size="medium">退出</el-button>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-main height>
        <!-- Main content -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  name: 'home',
  data() {
    return {
      activeIndex: '1',
      username: this.$store.state.username
    }
  },
  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    handleSelect(key, keypath) {}
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
  height: 60px;
  float: right;
}
// .el-header {
//   background-color: #373d41;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   color: #fff;
//   font-size: 30px;
//   > div {
//     display: flex;
//     align-items: center;
//   }
// }
// .el-aside {
//   background-color: #3e4353;
//   .el-menu {
//     border-right: 0px;
//   }
// }
// .el-main {
//   background-color: #eaedf1;
// }
// .home-container {
//   height: 100%;
// }
// .toggle-button {
//   background-color: #404454;
//   font-size: 10px;
//   line-height: 20px;
//   text-align: center;
//   letter-spacing: 0.2em;
// }
</style>
