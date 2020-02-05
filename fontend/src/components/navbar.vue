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
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'navBar',
  data() {
    return {
      activeIndex: '1'
    }
  },
  methods: {
    handleSelect(key, keypath) {}
  }
}
</script>

<style scoped></style>
