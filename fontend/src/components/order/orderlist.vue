<template>
  <div>
    <!-- 面包导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 订单表 -->
    <!-- 搜索框 -->
    <el-row :gutter="20">
      <el-col :span="6">
        <el-input v-model="search" size="mini" placeholder="关键字搜索:订单/日期/客户/地址/备注" />
      </el-col>
      <el-col :span="2">
        <el-button type="primary" @click="clearnSearchText">清除</el-button>
      </el-col>
      <el-col :span="2">
        <!-- <el-button type="primary" @click="dialogTableVisible = true">新增订单</el-button> -->
        <!-- 新增订单 -->
        <add-order></add-order>
      </el-col>
      <el-col :span="6">
        <!-- 日期范围选择器 -->
        <el-date-picker
          v-model="value2"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
          value-format="yyyy-MM-dd"
          @change="val => dateRangeChange(value2)"
        ></el-date-picker>
      </el-col>
    </el-row>
    <!-- 订单列表 -->
    <!-- :data="handlePage(page, pagesize).filter(data => !search || data.order_number.toLowerCase().includes(search.toLowerCase()))" -->
    <el-table
      ref="multipleTable"
      :data="handlePage(page, pagesize)"
      @selection-change="handleSelectionChange"
      border
      show-summary
      style="width=99.9%"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <el-table-column type="selection" width="40"></el-table-column>
      <el-table-column label="订单编号" align="center" width="120">
        <template slot-scope="scope">
          <span class="col-cont" v-html="showDate(scope.row.order_number)"></span>
        </template>
      </el-table-column>
      <el-table-column label="客户名称" width="120" align="center">
        <template slot-scope="scope">
          <span class="col-cont" v-html="showDate(scope.row.customer)"></span>
        </template>
      </el-table-column>
      <el-table-column label="下单日期" width="100" align="center">
        <template slot-scope="scope">
          <span class="col-cont" v-html="showDate(scope.row.order_date)"></span>
        </template>
      </el-table-column>
      <el-table-column label="订单交期" prop="deliver_date" width="100" align="center"></el-table-column>
      <el-table-column label="汇率" width="70" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.ex_rate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单金额($)" prop="order_amount" width="100" align="center"></el-table-column>
      <el-table-column label="出货地址" width="300" :show-overflow-tooltip="true" align="center">
        <template slot-scope="scope">
          <span class="col-cont" v-html="showDate(scope.row.ship_addr)"></span>
        </template>
      </el-table-column>
      <el-table-column label="备注" width="150" :show-overflow-tooltip="true" align="center">
        <template slot-scope="scope">
          <span class="col-cont" v-html="showDate(scope.row.text)"></span>
        </template>
      </el-table-column>
      <el-table-column label="业务" prop="sales" width="80" align="center"></el-table-column>
      <el-table-column label="完成状态" align="center">
        <template slot-scope="scope">
          <el-select size="mini" v-model="scope.row.is_done" clearable disabled>
            <el-option
              v-for="item in Options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </template>
      </el-table-column>
      <!-- 快捷搜索 -->
      <el-table-column label="操作" fixed="right" width="60" align="center">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="mini">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[1, 2, 5, 10]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="count"
    ></el-pagination>
  </div>
</template>

<script>
import AddOrder from './addorder'
import { getOrderList } from '../../api/order'
export default {
  components: {
    AddOrder
  },
  data() {
    return {
      tableData: [],
      sliceTableData: [],
      count: 0,
      pagesize: 10,
      page: 1,
      input1: '',
      select: '',
      // 日期范围选择器
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      Options: [
        { value: 1, label: '未完成' },
        {
          value: 2,
          label: '已完成'
        },
        {
          value: 3,
          label: '已超期'
        }
      ],
      // 日期选择器变量
      value2: '',
      // 表格多选参数
      multipleSelection: [],
      // 表头关键字搜索参数
      search: '',
      //数据加载动画
      loading: true
    }
  },
  methods: {
    //查看订单
    handleClick(row) {
      this.$store.state.order_number = row.order_number
      window.sessionStorage.setItem('order_number', row.order_number)
      // this.$router.push('orders/' + row.order_number + '/')
      this.$router.push(`orders/${row.order_number}/`)
    },
    // 控制表格多选
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 日期选择器选择日期之后的执行查询函数, 通过@change拿到日期
    dateRangeChange(value2) {
      if (!value2) {
        getOrderList().then(res => {
          this.tableData = res.data
          this.count = res.data.length
        })
      } else {
        getOrderList({
          start_date: value2[0],
          end_date: value2[1],
          argument: 'order_date'
        }).then(res => {
          this.tableData = res.data
        })
      }
    },
    // 监听page_size,每页显示多少条事件
    handleSizeChange(newSize) {
      this.pagesize = newSize
      this.handlePage(this.page, newSize)
    },
    // 监听页码值,显示第几页
    handleCurrentChange(newPage) {
      this.page = newPage
      this.handlePage(newPage, this.pagesize)
    },
    // 模糊搜索
    handlePage(page, size) {
      const search = this.search
      if (search) {
        // filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。
        // 注意： filter() 不会对空数组进行检测。
        // 注意： filter() 不会改变原始数组。
        return this.tableData
          .filter(data => {
            // some() 方法用于检测数组中的元素是否满足指定条件;
            // some() 方法会依次执行数组的每个元素：
            // 如果有一个元素满足条件，则表达式返回true , 剩余的元素不会再执行检测;
            // 如果没有满足条件的元素，则返回false。
            // 注意： some() 不会对空数组进行检测。
            // 注意： some() 不会改变原始数组。
            return Object.keys(data).some(key => {
              // indexOf() 返回某个指定的字符在某个字符串中首次出现的位置，如果没有找到就返回-1；
              // 该方法对大小写敏感！所以之前需要toLowerCase()方法将所有查询到内容变为小写。
              return (
                String(data[key])
                  .toLowerCase()
                  .indexOf(search) > -1
              )
            })
          })
          .slice((page - 1) * size, page * size * 1)
      }
      return this.tableData.slice((page - 1) * size, page * size * 1)
    },
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
    // 清除search框内容
    clearnSearchText() {
      this.search = null
    },
    //请求订单数据
    getOrderList() {
      getOrderList().then(res => {
        this.loading = false
        this.tableData = res.data
        this.count = res.data.length
      })
    }
  },
  created() {
    this.getOrderList()
  },
  beforeMount() {
    // this.getOrderList()
  },
  mounted() {
    // this.getOrderList()
  }
}
</script>

<style lang="less" scoped></style>
