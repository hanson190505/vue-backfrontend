<template>
  <div>
    <backend-searchVue @parentMethod="pagination"></backend-searchVue>
    <el-table
      :data="this.$store.getters.shipDetailData.results"
      style="width: 99.9%"
      show-summary
      border
      highlight-current-row
    >
      <el-table-column label="出货单号" width="140" fixed>
        <template slot-scope="scope">
          <span>{{ scope.row.ship_number.ship_number }}</span>
        </template>
      </el-table-column>
      <el-table-column label="出货日期" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.ship_number.ship_date }}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单编号" width="140">
        <template slot-scope="scope">
          <span>{{ scope.row.sub_order.order_number.order_number }}</span>
        </template>
      </el-table-column>
      <el-table-column label="产品名称" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.sub_order.pro_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="产品尺寸" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.sub_order.pro_size }}</span>
        </template>
      </el-table-column>
      <el-table-column label="产品颜色" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.sub_order.pro_color }}</span>
        </template>
      </el-table-column>
      <el-table-column label="产品包装" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.sub_order.pro_pack }}</span>
        </template>
      </el-table-column>
      <el-table-column label="产品描述" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.sub_order.pro_desc }}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单数量" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.sub_order.pro_qt }}</span>
        </template>
      </el-table-column>
      <el-table-column label="产品重量(kg)" width="100">
        <template slot-scope="scope">
          <span>{{scope.row.sub_order.pro_weight*1*scope.row.sub_order.pro_qt/1000}}</span>
        </template>
      </el-table-column>
      <el-table-column label="出货重量(kg)" width="120" prop="ship_weight">
        <template slot-scope="scope">
          <span>{{scope.row.ship_weight}}</span>
        </template>
      </el-table-column>
      <el-table-column label="出货费用(¥)" width="100" prop="ship_cost">
        <template slot-scope="scope">
          <span>{{scope.row.ship_cost}}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="操作" width="120" align="center">
        <template slot-scope="scope">
          <el-button @click="changeShipDetail(scope.row)" type="text" size="mini">修改</el-button>
          <el-button @click="handleDelete(scope.$index, scope.row)" type="text" size="mini">删除</el-button>
        </template>
      </el-table-column>-->
    </el-table>
    <pagi-nation @pagination="pagination" :getDataTotal="dataTotal"></pagi-nation>
  </div>
</template>

<script>
import pagiNation from '@/components/common/pagiNation'
import backendSearchVue from '@/components/common/backendSearch.vue'
export default {
  name: 'shipDetail',
  data() {
    return {
      loading: true,
      dataTotal: 0
    }
  },
  components: {
    pagiNation,
    backendSearchVue
  },
  methods: {
    pagination(params) {
      //子组件backendSearch清空搜索条件时调用,设定page默认值为1
      if (!params) {
        params = { page: 1, page_size: 10 }
      }
      this.$store.dispatch('shipStore/setShipDetailData', params).then(res => {
        this.loading = false
        this.dataTotal = res.data.count
      })
    },
    handleCurrentChange() {}
  },
  created() {
    this.pagination({ page: 1, page_size: 10 })
  }
}
</script>

<style scoped>
</style>