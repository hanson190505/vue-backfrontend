<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/purchases' }"
        >采购列表</el-breadcrumb-item
      >
      <el-breadcrumb-item>采购明细</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row>
      <el-col :span="4">
        <!-- 搜索组件 -->
        <backend-searchVue @parentMethod="pagination"></backend-searchVue>
      </el-col>
      <el-col :span="6">
        <date-search @dateSearchDate="dateSearchDate"></date-search>
      </el-col>
    </el-row>
    <el-table
      :data="subPurchaseOrderData"
      style="width: 99.9%"
      show-summary
      border
      size="mini"
      highlight-current-row
    >
      <el-table-column label="采购单号" width="100" fixed>
        <template slot-scope="scope">
          <span>{{ scope.row.purchase_number.purchase_number }}</span>
        </template>
      </el-table-column>
      <el-table-column label="供应商" width="100" fixed>
        <template slot-scope="scope">
          <span>{{ scope.row.purchase_number.purchaser.lite_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="采购日期" width="90">
        <template slot-scope="scope">
          <span>{{ scope.row.purchase_number.purchase_date }}</span>
        </template>
      </el-table-column>
      <el-table-column label="采购交期" width="90">
        <template slot-scope="scope">
          <span>{{ scope.row.purchase_number.deliver_date }}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单编号" width="120">
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
      <el-table-column label="产品描述" width="120">
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
          <span>{{ scope.row.sub_order.pro_price }}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单金额($)" width="90" prop="sub_amount">
        <template slot-scope="scope">
          <span>{{ scope.row.sub_order.sub_amount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="采购数量" width="90">
        <template slot-scope="scope">
          <span :style="markData(scope.row)">{{ scope.row.purchase_qt }}</span>
        </template>
      </el-table-column>
      <el-table-column label="采购单价(¥)" width="90">
        <template slot-scope="scope">
          <span>{{ scope.row.purchase_price }}</span>
        </template>
      </el-table-column>
      <el-table-column label="采购金额(¥)" width="100" prop="purchase_amount">
        <template slot-scope="scope">
          <span>{{ scope.row.purchase_amount | toThousandFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="采购毛利(¥)" width="100" prop="profit_rmb">
        <template slot-scope="scope">
          <span>{{ scope.row.profit_rmb | toThousandFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="采购毛利($)" width="100" prop="profit_usd">
        <template slot-scope="scope">
          <span>{{ scope.row.profit_usd | toThousandFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" width="140">
        <template slot-scope="scope">
          <span>{{ scope.row.text }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="60" align="center">
        <template slot-scope="scope">
          <el-button
            @click="checkPurchaseDetail(scope.row)"
            type="text"
            size="mini"
            >查看</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <add-purchase ref="addpurchase"></add-purchase>
    <!-- 分页 -->
    <pagi-nation
      @pagination="pagination"
      :getDataTotal="purchaseDetail.count"
    ></pagi-nation>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import pagiNation from '@/components/common/pagiNation'
import backendSearchVue from '@/components/common/backendSearch.vue'
import dateSearch from '@/components/common/dateSearch'
import addPurchaseorder from './addPurchaseorder'
export default {
  name: 'purchaseDetail',
  components: {
    pagiNation,
    backendSearchVue,
    'add-purchase': addPurchaseorder,
    dateSearch
  },
  data() {
    return {
      subPurchaseOrderData: [],
      subOrderData: [],
      dataTotal: 0
    }
  },
  computed: {
    //只能在tamplate里引用???
    ...mapGetters(['purchaseDetail'])
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
      this.subPurchaseOrderData = []
      if (!params) {
        params = { page: 1, page_size: 10 }
      }
      this.$store
        .dispatch('purchaseStore/setPurchaseDetailData', params)
        .then(res => {
          let data = this.$store.getters.purchaseDetail.results
          data.forEach(el => {
            let profit = {
              profit_rmb: (
                el.sub_order.sub_amount * el.sub_order.order_number.ex_rate -
                el.purchase_amount
              ).toFixed(2),
              profit_usd: (
                el.sub_order.sub_amount -
                el.purchase_amount / el.sub_order.order_number.ex_rate
              ).toFixed(2)
            }
            this.subPurchaseOrderData.push(Object.assign(el, profit))
          })
          // this.subPurchaseOrderData = this.$store.getters.purchaseDetail.results
        })
    },
    addRow() {},
    //查看订单明细
    checkPurchaseDetail(row) {
      this.$refs.addpurchase.purchaseDetaiCheck(row)
    },
    //如果采购数量大于订单数量,则标记采购数量数据
    markData(row) {
      if (row.purchase_qt > row.pro_qt) {
        return { color: '#c21010' }
      }
    }
    //和并列,有问题
    // objectSpanMethod({ row, column, rowIndex, columnIndex }) {
    //   if (columnIndex === 0) {
    //     if (rowIndex % 2 === 0) {
    //       return {
    //         rowspan: 2,
    //         colspan: 1
    //       }
    //     } else {
    //       return {
    //         rowspan: 0,
    //         colspan: 0
    //       }
    //     }
    //   }
    // }
  },
  created() {
    this.pagination({ page: 1, page_size: 10 })
  }
}
</script>

<style scoped></style>
