<template>
  <div>
    <el-table
      :data="userData"
      border
      highlight-current-row
      style="width=99.9%"
      v-loading="loading"
      :row-class-name="tableRowClassName"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <el-table-column
        type="selection"
        width="60"
        align="center"
      ></el-table-column>
      <el-table-column label="用户名" align="center" width="100" fixed>
        <template slot-scope="scope">
          <span>{{ scope.row.u_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建日期" align="center" width="260" fixed>
        <template slot-scope="scope">
          <span>{{ scope.row.creat_time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="角色" align="center" width="100" fixed>
        <template slot-scope="scope">
          <el-tag disable-transitions slot="reference">{{
            scope.row.tag
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center" width="100" fixed>
        <template slot-scope="scope">
          <el-tag :type="scope.row.type" disable-transitions slot="reference">{{
            scope.row.status
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="120">
        <template slot-scope="scope">
          <el-button @click="changeRow(scope.row)" type="text" size="mini"
            >修改</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <pagi-nation
      @pagination="pagination"
      :getDataTotal="dataTotal"
    ></pagi-nation>
    <change-data ref="changeForm"></change-data>
  </div>
</template>

<script>
import pagiNation from '@/components/common/pagiNation'
import changeData from './changeData'
import { getUserInfo, patchUser } from '@/api/user'
export default {
  name: 'userTable',
  components: {
    pagiNation,
    changeData
  },
  data() {
    return {
      userData: [],
      loading: true,
      dataTotal: 0
    }
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      switch (row.permissions) {
        case 1:
          row.tag = '超级管理员'
          break
        case 2:
          row.tag = '总经理'
          break
        case 3:
          row.tag = '业务经理'
          break
        case 4:
          row.tag = '业务'
          break
        case 5:
          row.tag = '采购经理'
          break
        case 6:
          row.tag = '采购'
          break
        case 7:
          row.tag = '货运经理'
          break
        case 8:
          row.tag = '货运'
          break
        case 9:
          row.tag = '财务经理'
          break
        case 10:
          row.tag = '财务'
          break
        default:
          row.tag = '未分配'
          break
      }
      switch (row.is_use) {
        case 1:
          row.status = '可用'
          row.type = 'success'
          break
        case 0:
          row.status = '禁用'
          row.type = 'warning'
          break
        default:
          break
      }
      return ''
    },
    pagination(params) {
      //子组件backendSearch清空搜索条件时调用,设定page默认值为1
      if (!params) {
        params = { page: 1, page_size: 10 }
      }
      getUserInfo(params).then(res => {
        this.userData = res.data.results
        this.dataTotal = res.data.count
        this.loading = false
      })
    },
    changeRow(row) {
      this.$refs.changeForm.handleChange(row)
    }
  },
  created() {
    this.pagination()
  }
}
</script>

<style scoped></style>
