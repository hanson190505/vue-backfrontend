<template>
  <div>
    <el-row>
      <el-col :span="2">
        <el-button type="text" @click="addNewShip">新增出货</el-button>
      </el-col>
      <el-col :span="6">
        <backend-searchVue @parentMethod="pagination"></backend-searchVue>
      </el-col>
    </el-row>

    <add-ship ref="addship"></add-ship>
    <el-table
      ref="shipOrderTable"
      :data="this.$store.getters.shipOrderData.results"
      highlight-current-row
      @current-change="handleCurrentChange"
      border
      show-summary
      style="width=99.9%"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <el-table-column type="index" width="60" align="center"></el-table-column>
      <el-table-column label="出货单号" align="center" width="140">
        <template slot-scope="scope">
          <span>{{ scope.row.ship_number }}</span>
        </template>
      </el-table-column>
      <el-table-column label="出货方式" align="center" width="100">
        <template slot-scope="scope">
          <span>{{ shipType[scope.row.ship_plan - 1] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="货运公司" align="center" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.ship_customer }}</span>
        </template>
      </el-table-column>
      <el-table-column label="出货日期" align="center" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.ship_date }}</span>
        </template>
      </el-table-column>
      <el-table-column label="出货重量(kg)" align="center" width="120" prop="ship_weight">
        <template slot-scope="scope">
          <span>{{ scope.row.ship_weight }}</span>
        </template>
      </el-table-column>
      <el-table-column label="出货费用(¥)" align="center" width="100" prop="ship_cost">
        <template slot-scope="scope">
          <span>{{ scope.row.ship_cost }}</span>
        </template>
      </el-table-column>
      <el-table-column label="目的地" align="center" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.destination }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="100" align="center">
        <template slot-scope="scope">
          <el-button @click="checkShipOrder(scope.row)" type="text" size="mini">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagi-nation @pagination="pagination" :getDataTotal="dataTotal"></pagi-nation>
    <check-ship ref="checkship"></check-ship>
  </div>
</template>

<script>
import pagiNation from '@/components/common/pagiNation'
import backendSearchVue from '@/components/common/backendSearch.vue'
import addShip from './addShip'
import checkShip from './checkShip'
import { getSubToken } from '@/api/token'
export default {
  name: 'shipOrder',
  components: {
    pagiNation,
    backendSearchVue,
    addShip,
    checkShip
  },
  data() {
    return {
      dataTotal: 0,
      loading: true,
      shipType: [
        'UPS',
        'FedEx',
        'DHL',
        '国内快递',
        '船运',
        '自提',
        '第三方',
        '其他'
      ]
    }
  },
  methods: {
    //新增采购
    addNewShip() {
      this.$refs.addship.addNewship()
    },
    pagination(params) {
      //子组件backendSearch清空搜索条件时调用,设定page默认值为1
      if (!params) {
        params = { page: 1, page_size: 10 }
      }
      this.$store.dispatch('shipStore/setShipOrderData', params).then(res => {
        this.loading = false
        this.dataTotal = res.data.count
      })
    },
    handleCurrentChange() {},
    //查看出货单
    checkShipOrder(row) {
      this.$refs.checkship.checkShip(row.id)
      getSubToken()
    }
  },
  created() {
    this.pagination({ page: 1, page_size: 10 })
  }
}
</script>

<style scoped></style>
