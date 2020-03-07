<template>
  <div>
    <el-table
      :data="productsData"
      border
      show-summary
      highlight-current-row
      style="width=99.9%"
      v-loading="loading"
      :row-class-name="tableRowClassName"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    ></el-table>
    <el-table-column label="产品类别" align="center" width="90" fiexd>
      <template slot-scope="scope">
        <span>{{ scope.sub_type }}</span>
      </template>
    </el-table-column>
  </div>
</template>

<script>
export default {
  name: 'ProductTable',
  data() {
    return {}
  }
}
</script>

<style scoped></style>
