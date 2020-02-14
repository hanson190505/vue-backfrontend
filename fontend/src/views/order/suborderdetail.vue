<template>
  <div>
    <el-row>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/orders' }"
          >订单管理</el-breadcrumb-item
        >
        <el-breadcrumb-item>明细列表</el-breadcrumb-item>
        <backend-search
          v-on:getSearchSuborder="getSearchSuborder"
          @parentMethod="pagination"
        ></backend-search>
      </el-breadcrumb>
    </el-row>
    <el-table
      :data="subOrderData"
      border
      show-summary
      highlight-current-row
      style="width=99.9%"
      v-loading="loading"
      :summary-method="getSummaries"
      @select="handleSelect"
      @select-all="handleSelect"
      :row-class-name="tableRowClassName"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :default-sort="{ prop: 'order_date', order: 'descending' }"
    >
      <el-table-column
        type="selection"
        width="60"
        align="center"
      ></el-table-column>
      <el-table-column label="客户" align="center" width="100" fixed>
        <template slot-scope="scope">
          <span
            class="col-cont"
            v-html="showDate(scope.row.order_number.customer)"
          ></span>
        </template>
      </el-table-column>
      <el-table-column label="订单编号" align="center" width="140" fixed>
        <template slot-scope="scope">
          <span
            class="col-cont"
            v-html="showDate(scope.row.order_number.order_number)"
          ></span>
        </template>
      </el-table-column>
      <el-table-column
        label="下单日期"
        align="center"
        width="100"
        sortable
        prop="order_date"
        fixed
      >
        <template slot-scope="scope">
          <span
            class="col-cont"
            v-html="showDate(scope.row.order_number.order_date)"
          ></span>
        </template>
      </el-table-column>
      <el-table-column label="订单交期" align="center" width="100">
        <template slot-scope="scope">
          <span
            class="col-cont"
            v-html="showDate(scope.row.order_number.deliver_date)"
          ></span>
        </template>
      </el-table-column>
      <el-table-column label="产品名称" align="center" width="100">
        <template slot-scope="scope">
          <span class="col-cont" v-html="showDate(scope.row.pro_name)"></span>
        </template>
      </el-table-column>
      <el-table-column label="产品类别" align="center" width="80">
        <template slot-scope="scope">
          <span>{{ proType[scope.row.pro_item - 1] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="产品尺寸" align="center" width="120">
        <template slot-scope="scope">
          <span class="col-cont" v-html="showDate(scope.row.pro_size)"></span>
        </template>
      </el-table-column>
      <el-table-column label="产品颜色" align="center" width="120">
        <template slot-scope="scope">
          <span class="col-cont" v-html="showDate(scope.row.pro_color)"></span>
        </template>
      </el-table-column>
      <el-table-column label="产品包装" align="center" width="120">
        <template slot-scope="scope">
          <span class="col-cont" v-html="showDate(scope.row.pro_pack)"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="产品描述"
        align="center"
        width="140"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span class="col-cont" v-html="showDate(scope.row.pro_desc)"></span>
        </template>
      </el-table-column>
      <el-table-column label="数量" align="center" width="80" prop="pro_qt">
        <template slot-scope="scope">
          <span class="col-cont" v-html="showDate(scope.row.pro_qt)"></span>
        </template>
      </el-table-column>
      <el-table-column label="单价($)" align="center" width="70">
        <template slot-scope="scope">
          <span class="col-cont" v-html="showDate(scope.row.pro_price)"></span>
        </template>
      </el-table-column>
      <el-table-column label="重量(g)" align="center" width="70">
        <template slot-scope="scope">
          <span class="col-cont" v-html="showDate(scope.row.pro_weight)"></span>
        </template>
      </el-table-column>
      <el-table-column label="汇率" align="center" width="70">
        <template slot-scope="scope">
          <span
            class="col-cont"
            v-html="showDate(scope.row.order_number.ex_rate)"
          ></span>
        </template>
      </el-table-column>
      <el-table-column
        label="订单金额($)"
        align="center"
        width="100"
        prop="sub_amount"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.sub_amount | toThousandFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="订单金额(¥)"
        align="center"
        width="100"
        prop="rmb_amount"
      >
        <template slot-scope="scope">
          <span>{{
            (scope.row.sub_amount * scope.row.order_number.ex_rate)
              | toThousandFilter
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="采购金额(¥)"
        align="center"
        width="100"
        prop="purchaseAmount"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.purchaseAmount | toThousandFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="出货金额(¥)"
        align="center"
        width="100"
        prop="shipAmount"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.shipAmount | toThousandFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="毛利(¥)"
        align="center"
        width="100"
        prop="profit_rmb"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.profit_rmb | toThousandFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="毛利($)"
        align="center"
        width="100"
        prop="profit_usd"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.profit_usd | toThousandFilter }}</span>
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
import { getSubOrderList } from '@/api/order'
import backendSearch from '@/components/common/backendSearch'
import pagiNation from '@/components/common/pagiNation'
export default {
  components: {
    backendSearch,
    pagiNation
  },
  data() {
    return {
      //控制页面加载动画
      loading: true,
      proType: ['硅胶', '五金', 'USB', '移动电源', '其他'],
      subOrderData: [],
      //分页相关配置
      dataTotal: 0
    }
  },
  methods: {
    //单选行事件
    handleSelect(row) {
      //selection是所有选中行的数据,格式是array
      //row点击选框当前行的数据
      // 第一个参数是在父组件on监听的方法
      // 第二个参数是需要传的值
      this.$emit('getSelectSuborder', row)
    },
    //全选事件
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
    //分页函数
    pagination(params) {
      //子组件backendSearch清空搜索条件时调用,设定page默认值为1
      if (!params) {
        params = { page: 1, page_size: 10 }
      }
      return getSubOrderList(params).then(res => {
        let resData = res.data
        this.dataTotal = resData.count
        this.loading = false
        let purchaseSum = 0
        let shipSum = 0
        this.subOrderData = []
        resData.results.forEach(el => {
          if (el.purchases.length !== 0) {
            el.purchases.forEach(p => {
              purchaseSum += p.purchase_amount * 1
            })
          }
          if (el.ships.length !== 0) {
            el.ships.forEach(s => {
              shipSum += s.ship_cost * 1
            })
          }
          //增加采购,出货,毛利计算
          let profit = {
            purchaseAmount: purchaseSum,
            shipAmount: shipSum,
            profit_rmb:
              el.sub_amount * el.order_number.ex_rate - purchaseSum - shipSum,
            profit_usd:
              el.sub_amount - (purchaseSum + shipSum) / el.order_number.ex_rate
          }
          this.subOrderData.push(Object.assign(el, profit))
        })
      })
    },
    //表尾合计
    getSummaries(param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总计'
          return
        }
        //map函数把各列内容转为数字,然后返回一个列表(每一列一个列表)
        const values = data.map(item => {
          if (column.property === 'rmb_amount') {
            //在对data数据进行map处理时,判断是不是自定义列,然后返回计算后的结果
            return Number(item.order_number.ex_rate * item.sub_amount)
          } else {
            return Number(item[column.property])
          }
        })

        //如果每列的每一个都是数字,则计算该列的和
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return Math.floor(prev * 100) / 100 + Math.floor(curr * 100) / 100
              // return prev + curr
            } else {
              return Math.floor(prev * 100) / 100
            }
          }, 0)
          // sums[index] += ' 元'
        } else {
          sums[index] = 'N/A'
        }
      })
      return sums
    },
    //标记紧急订单
    tableRowClassName({ row, rowIndex }) {
      if (row.order_number.is_done === 4 && row.is_ship === 1) {
        return 'urgency-row'
      }
      return ''
    },
    //接收子组件传递的数据
    getSearchSuborder(serchSuborderData) {
      this.subOrderData = serchSuborderData.results
      this.dataTotal = serchSuborderData.count
    }
  },
  created() {
    this.pagination()
  }
}
</script>

<style scoped></style>
