<template>
  <div>
    <!-- 面包导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card>
      <!-- 搜索框 -->
      <el-row :gutter="20">
        <el-col :span="6">
          <!-- <el-input placeholder="请输入内容" v-model="input1" class="input-with-select">
            <el-select v-model="select" slot="prepend" placeholder="请选择">
              <el-option label="订单编号" value="1"></el-option>
              <el-option label="客户名称" value="2"></el-option>
              <el-option label="出货地址" value="3"></el-option>
              <el-option label="备注" value="4"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>-->
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
        stripe
        style="width=99.9%"
      >
        <el-table-column type="selection" width="40"></el-table-column>
        <!-- <el-table-column
          v-for="col in tableColData"
          :prop="col.id"
          :key="col.id"
          :label="col.label"
          :width="col.width"
          :show-overflow-tooltip="true"
        ></el-table-column>-->
        <el-table-column label="订单编号" align="center" width="120">
          <template slot-scope="scope">
            <span class="col-cont" v-html="showDate(scope.row.order_number)"></span>
          </template>
        </el-table-column>
        <el-table-column label="客户名称" width="120">
          <template slot-scope="scope">
            <span class="col-cont" v-html="showDate(scope.row.customer)"></span>
          </template>
        </el-table-column>
        <el-table-column label="下单日期" width="90">
          <template slot-scope="scope">
            <span class="col-cont" v-html="showDate(scope.row.order_date)"></span>
          </template>
        </el-table-column>
        <el-table-column label="订单交期" prop="deliver_date" width="90"></el-table-column>
        <el-table-column label="汇率" prop="ex_rate" width="60"></el-table-column>
        <el-table-column label="订单金额" prop="order_amount" width="70"></el-table-column>
        <el-table-column label="出货地址" width="150" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span class="col-cont" v-html="showDate(scope.row.ship_addr)"></span>
          </template>
        </el-table-column>
        <el-table-column label="备注" width="150" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span class="col-cont" v-html="showDate(scope.row.text)"></span>
          </template>
        </el-table-column>
        <el-table-column label="业务" prop="sales" width="80"></el-table-column>
        <el-table-column label="完成状态">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.is_done" @change="orderStatusChange(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <!-- 快捷搜索 -->
        <el-table-column label="操作" fixed="right" width="60">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
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
    </el-card>
  </div>
</template>

<script>
import { request, getRangeDateRequest } from '../../network/rquest'
import AddOrder from './addorder'
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
      tableColData: [
        {
          id: 'order_number',
          label: '订单编号',
          width: 100
        },
        {
          id: 'sales',
          label: '业务',
          width: 100
        },
        {
          id: 'order_date',
          label: '下单日期',
          width: 100
        },
        {
          id: 'deliver_date',
          label: '订单交期',
          width: 100
        },
        {
          id: 'input_date',
          label: '录入日期',
          width: 100
        },
        {
          id: 'ex_rate',
          label: '汇率',
          width: 100
        },
        {
          id: 'order_picture',
          label: '图片',
          width: 100
        },
        {
          id: 'is_done',
          label: '完成状态',
          width: 100
        },
        {
          id: 'order_amount',
          label: '订单金额',
          width: 100
        },
        {
          id: 'text',
          label: '备注',
          width: 100
        },
        {
          id: 'ship_addr',
          label: '出货地址',
          width: 100
        },
        {
          id: 'customer',
          label: '客户',
          width: 100
        }
      ],
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
      // 日期选择器变量
      value2: '',
      // 表格多选参数
      multipleSelection: [],
      // 表头关键字搜索参数
      search: ''
    }
  },
  methods: {
    //查看订单
    handleClick(row) {
      request({
        url: 'orders/' + row.order_number + '/',
        method: 'GET',
        params: {
          token: window.sessionStorage.getItem('token')
        }
      }).then(res => {
        request({
          url: 'suborders/',
          method: 'GET',
          params: {
            token: window.sessionStorage.getItem('token'),
            order_number: res.data.order_number
          }
        }).then(res => {
          this.$store.state.suborderdetail = res.data
          this.$router.push('orders/' + row.order_number + '/')
        })
        this.$store.state.orderdetail = res.data
      })
    },
    // 控制表格多选
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 日期选择器选择日期之后的执行查询函数, 通过@change拿到日期
    dateRangeChange(value2) {
      if (!value2) {
        request({
          url: 'orders/',
          method: 'GET',
          params: {
            token: window.sessionStorage.getItem('token')
          }
        }).then(res => {
          this.tableData = res.data
          this.count = res.data.length
        })
      } else {
        getRangeDateRequest({
          params: {
            token: window.sessionStorage.getItem('token'),
            start_date: value2[0],
            end_date: value2[1],
            argument: 'order_date'
          }
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
    //监听switch按钮,订单完成状态
    orderStatusChange(orderinfo) {
      console.log(orderinfo)
      if (orderinfo.is_done === true) {
        orderinfo.is_done = 0
      }
      console.log(orderinfo)
    },
    getOrderList() {
      request({
        url: 'orders/',
        method: 'GET',
        params: {
          token: window.sessionStorage.getItem('token')
        }
      }).then(res => {
        console.log(res.data)
        this.tableData = res.data
        this.count = res.data.length
      })
    }
  },
  created() {
    // request({
    //   url: 'orders/',
    //   method: 'GET',
    //   params: {
    //     token: window.sessionStorage.getItem('token')
    //   }
    // }).then(res => {
    //   this.tableData = res.data
    //   this.count = res.data.length
    //   // this.next = res.data.next
    //   // this.previous = res.data.previous
    //   console.log(res)
    // })
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
