<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/orders' }"
        >订单管理</el-breadcrumb-item
      >
      <el-breadcrumb-item>明细列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row>
      <el-col :span="6">
        <backend-search
          v-on:getSearchSuborder="getSearchSuborder"
          @parentMethod="pagination"
        ></backend-search>
      </el-col>
    </el-row>
    <el-table
      :data="subOrderData"
      border
      stripe
      show-summary
      style="width=99.9%"
      v-loading="loading"
      :summary-method="getSummaries"
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
      <el-table-column label="客户" align="center" width="100">
        <template slot-scope="scope">
          <span
            class="col-cont"
            v-html="showDate(scope.row.order_number.customer)"
          ></span>
        </template>
      </el-table-column>
      <el-table-column label="订单编号" align="center" width="140">
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
        label="金额($)"
        align="center"
        width="100"
        prop="sub_amount"
      >
        <template slot-scope="scope">
          <span class="col-cont" v-html="showDate(scope.row.sub_amount)"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="金额(¥)"
        align="center"
        width="100"
        prop="rmb_amount"
      >
        <template slot-scope="scope">
          <span
            class="col-cont"
            v-html="
              showDate(scope.row.sub_amount * scope.row.order_number.ex_rate)
            "
          ></span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      @prev-click="handleprevious"
      @next-click="handlenext"
      :current-page="currentPage"
      :page-sizes="[10, 50, 100, 200]"
      :page-size="page_size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="dataTotal"
    ></el-pagination>
  </div>
</template>

<script>
import { getSubOrderList } from '@/api/order'
import backendSearch from './backendSearch'
export default {
  components: {
    backendSearch
  },
  data() {
    return {
      //控制页面加载动画
      loading: true,
      proType: ['硅胶', '五金', 'USB', '移动电源', '其他'],
      subOrderData: [],
      //分页相关配置
      dataTotal: 0,
      page_size: 10,
      currentPage: 0,
      previous: null,
      next: null
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
    //分页设置
    handleSizeChange(val) {
      getSubOrderList({ page_size: val }).then(res => {
        let resData = res.data
        this.page_size = val
        this.loading = false
        this.subOrderData = resData.results
        this.dataTotal = resData.count
      })
    },
    //选择页码
    handleCurrentChange(val) {
      this.pagination(val)
    },
    //上一页
    handleprevious(val) {
      this.pagination(val)
    },
    //下一页
    handlenext(val) {
      this.pagination(val)
    },
    //分页函数
    pagination(val) {
      //子组件backendSearch清空搜索条件时调用,设定page默认值为1
      if (!val) {
        val = 1
      }
      return getSubOrderList({ page: val, page_size: this.page_size }).then(
        res => {
          let resData = res.data
          this.loading = false
          this.subOrderData = resData.results
          this.dataTotal = resData.count
        }
      )
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
              return prev + curr
            } else {
              console.log(prev)

              return prev
            }
          }, 0)
          // sums[index] += ' 元'
        } else {
          sums[index] = 'N/A'
        }
      })

      return sums
    },
    getSearchSuborder(serchSuborderData) {
      this.subOrderData = serchSuborderData
    }
  },
  created() {
    getSubOrderList().then(res => {
      let resData = res.data
      this.loading = false
      this.subOrderData = resData.results
      this.dataTotal = resData.count
    })
  }
}
</script>

<style scoped></style>
