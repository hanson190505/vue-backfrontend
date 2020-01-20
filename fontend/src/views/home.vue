<template>
  <el-container class="home-container">
    <el-header>
      <div>
        <span>CMS管理系统</span>
      </div>
      <el-button type="info" @click="logout" size="medium">退出</el-button>
    </el-header>

    <el-container>
      <el-aside width="200px">
        <div class="toggle-button">|||</div>
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#333744"
          text-color="#fff"
          active-text-color="#ffd04b"
          unique-opened
          router
        >
          <!-- :unique-opened="true"设置布尔值的时候需要:绑定数据,如果要设置true可以不设置,直接unique-opened -->
          <!-- 一级菜单 -->
          <el-submenu index v-for="(val, k) in asideData" :key="k">
            <!-- 一级菜单的模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i :class="val.icon"></i>
              <span>{{val.title}}</span>
            </template>
            <el-menu-item-group v-for="(v, k) in val" :key="k">
              <el-menu-item :index="v.path">{{v.title}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      asideData: [
        {
          title: '订单管理',
          path: '',
          icon: 'el-icon-s-order',
          chidren: {
            title: '订单列表',
            path: 'orders',
            icon: ''
          }
        },
        {
          title: '采购管理',
          path: '',
          icon: 'el-icon-shopping-cart-1',
          chidren: ''
        }
      ]
    }
  },
  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  font-size: 30px;
  > div {
    display: flex;
    align-items: center;
  }
}
.el-aside {
  background-color: #3e4353;
  .el-menu {
    border-right: 0px;
  }
}
.el-main {
  background-color: #eaedf1;
}
.home-container {
  height: 100%;
}
.toggle-button {
  background-color: #404454;
  font-size: 10px;
  line-height: 20px;
  text-align: center;
  letter-spacing: 0.2em;
}
</style>
