<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/purchases' }">采购列表</el-breadcrumb-item>
      <el-breadcrumb-item>采购明细</el-breadcrumb-item>
      <!-- 搜索组件 -->
      <backend-searchVue @parentMethod="pagination"></backend-searchVue>
    </el-breadcrumb>
    <el-table :data="subPurchaseOrderData" style="width: 99.9%" show-summary>
      <el-table-column label="订单编号" width="140">
        <template slot-scope="scope">
          <span>{{ scope.row.sub_order.order_number }}</span>
        </template>
      </el-table-column>
      <el-table-column label="产品名称" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.sub_order.pro_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="产品描述" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.sub_order.pro_desc }}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单数量" width="90">
        <template slot-scope="scope">
          <span>{{ scope.row.sub_order.pro_qt }}</span>
        </template>
      </el-table-column>
      <el-table-column label="产品单价($)" width="90">
        <template slot-scope="scope">
          <span>{{scope.row.sub_order.pro_price}}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单金额($)" width="90">
        <template slot-scope="scope">
          <span>{{scope.row.sub_order.sub_amount}}</span>
        </template>
      </el-table-column>
      <el-table-column label="采购数量" width="90">
        <template slot-scope="scope">
          <el-input v-model="scope.row.purchase_qt"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="采购单价($)" width="90">
        <template slot-scope="scope">
          <el-input v-model="scope.row.purchase_price"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="采购金额($)" width="100">
        <template slot-scope="scope">
          <el-input v-model="scope.row.purchase_amount"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="备注" width="140">
        <template slot-scope="scope">
          <el-input v-model="scope.row.text"></el-input>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <pagi-nation @pagination="pagination" :getDataTotal="dataTotal"></pagi-nation>
  </div>
</template>

<script>
import pagiNation from '../common/pagiNation'
import backendSearchVue from '../common/backendSearch.vue'
export default {
  name: 'purchaseDetail',
  components: {
    pagiNation,
    backendSearchVue
  },
  data() {
    return {
      subPurchaseOrderData: [],
      subOrderData: [],
      dataTotal: 0
    }
  },
  methods: {
    pagination(params) {
      if (!params) {
        params = { page: 1, page_size: 10 }
      }
      this.$store
        .dispatch('purchaseStore/setPurchaseDetailData', params)
        .then(res => {
          let data = this.$store.getters.purchaseDetail
          this.subPurchaseOrderData = data.results
          this.datatoTal = data.count
        })
    },
    addRow() {}
  },
  created() {
    // this.$store.dispatch('purchaseStore/setPurchaseDetailData').then(res => {
    //   this.subPurchaseOrderData = this.$store.getters.purchaseDetail.results
    // })
    this.pagination({ page: 1, page_size: 10 })
  }
}
</script>

<style scoped></style>
