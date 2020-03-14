<template>
  <div>
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
      <el-menu-item index="/dash">首页</el-menu-item>
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
      <el-submenu index="4">
        <template slot="title">出货管理</template>
        <el-menu-item index="/shiporders">出货列表</el-menu-item>
        <el-menu-item index="/shipdetails">出货明细</el-menu-item>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">产品管理</template>
        <el-menu-item index="/products">产品列表</el-menu-item>
        <el-menu-item index="/upload">图片列表</el-menu-item>
      </el-submenu>
      <el-submenu index="6" v-if="checkpermission()">
        <template slot="title">系统管理</template>
        <el-menu-item index="/staffs">用户列表</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'navBar',
  // v-if="window.localStorage.getItem('permissions')===1"
  data() {
    return {
      activeIndex: '1'
    }
  },
  methods: {
    handleSelect(key, keypath) {},
    //TODO:权限控制????
    checkpermission() {
      return this.$store.getters.permissions === 1
      // return window.localStorage.getItem('permissions') === '1'
    }
  },
  created() {}
}
</script>

<style scoped></style>
