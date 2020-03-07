<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/ships' }">出货管理</el-breadcrumb-item>
      <el-breadcrumb-item>出货列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row>
      <el-col :span="4">
        <backend-searchVue @parentMethod="pagination"></backend-searchVue>
      </el-col>
      <el-col :span="6">
        <date-search @dateSearchDate="dateSearchDate"></date-search>
      </el-col>
    </el-row>
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
          <span>{{
            (scope.row.sub_order.pro_weight * 1 * scope.row.sub_order.pro_qt) /
              1000
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="出货重量(kg)" width="120" prop="ship_weight">
        <template slot-scope="scope">
          <span>{{ scope.row.ship_weight }}</span>
        </template>
      </el-table-column>
      <el-table-column label="出货费用(¥)" width="100" prop="ship_cost">
        <template slot-scope="scope">
          <span>{{ scope.row.ship_cost }}</span>
        </template>
      </el-table-column>
    </el-table>
    <pagi-nation
      @pagination="pagination"
      :getDataTotal="dataTotal"
    ></pagi-nation>
  </div>
</template>

<script>
import pagiNation from '@/components/common/pagiNation'
import dateSearch from '@/components/common/dateSearch'
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
    backendSearchVue,
    dateSearch
  },
  methods: {
    //日期搜索
    dateSearchDate(value) {
      if (!value) {
        this.pagination()
      } else {
        this.pagination({
          start_date: value[0],
          end_date: value[1],
          argument: 'date_search'
        })
      }
    },
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
    this.pagination()
  }
}
</script>

<style scoped></style>
