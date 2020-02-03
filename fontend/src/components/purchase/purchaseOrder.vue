<template>
  <div>
    <el-table
      ref="purchaseOrderTable"
      :data="this.$store.getters.purchaseData.results"
      highlight-current-row
      @current-change="handleCurrentChange"
      border
      style="width=99.9%"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <el-table-column type="index" width="40"></el-table-column>
      <el-table-column label="供应商" align="center" width="120">
        <template slot-scope="scope">
          <span class="col-cont" v-html="showDate(scope.row.purchaser.lite_name)"></span>
        </template>
      </el-table-column>
      <el-table-column label="采购单号" align="center" width="150">
        <template slot-scope="scope">
          <span class="col-cont" v-html="showDate(scope.row.purchase_number)"></span>
        </template>
      </el-table-column>
      <el-table-column label="采购日期" align="center" width="100">
        <template slot-scope="scope">
          <span class="col-cont" v-html="showDate(scope.row.purchase_date)"></span>
        </template>
      </el-table-column>
      <el-table-column label="采购交期" align="center" width="100">
        <template slot-scope="scope">
          <span class="col-cont" v-html="showDate(scope.row.deliver_date)"></span>
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center" width="150">
        <template slot-scope="scope">
          <span class="col-cont" v-html="showDate(scope.row.text)"></span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="操作" fixed="right" width="100" align="center">
        <template slot-scope="scope">
          <el-button @click="addSubPurchase(scope.row)" type="text" size="mini">新增明细</el-button>
        </template>
      </el-table-column>-->
    </el-table>
    <pagi-nation @pagination="pagination" :getDataTotal="dataTotal"></pagi-nation>
  </div>
</template>

<script>
import pagiNation from '../common/pagiNation'
export default {
  name: 'purchaseOrder',
  components: {
    pagiNation
  },
  data() {
    return {
      search: '',
      PurchaseOrderData: [],
      loading: true,
      dataTotal: 0
    }
  },
  methods: {
    // 关键字高亮
    showDate(val) {
      val = val + ''
      if (val.indexOf(this.search) !== -1 && this.search !== '') {
        return val.replace(
          this.search,
          '<font color="#ff4400">' + this.search + '</font>'
        )
      } else {
        return val
      }
    },
    handleCurrentChange(row) {
      console.log(row)
      this.$store.state.purchase_number = row.id
    },
    //新增采购明细
    addSubPurchase() {},
    pagination(params) {
      //子组件backendSearch清空搜索条件时调用,设定page默认值为1
      if (!params) {
        params = { page: 1, page_size: 10 }
      }
      this.$store
        .dispatch('purchaseStore/setPurchaseData', params)
        .then(res => {
          this.loading = false
          this.dataTotal = res.data.count
        })
    }
  },
  created() {
    this.pagination()
  }
}
</script>

<style scoped>
</style>
