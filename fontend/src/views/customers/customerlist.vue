<template>
  <div>
    <!-- 面包导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>客户管理</el-breadcrumb-item>
      <el-breadcrumb-item>客户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row>
      <el-col :span="6">
        <el-input v-model="search" size="mini" placeholder="关键字搜索:/客户/联系人/主营业务" />
      </el-col>
      <el-col :span="2">
        <el-button type="primary" @click="clearnSearchText">清除</el-button>
      </el-col>
      <el-col :span="2">
        <add-customer v-on:addNewCustomer="addNewCustomer"></add-customer>
      </el-col>
    </el-row>
    <el-table
      :data="handlePage(page, pagesize)"
      border
      highlight-current-row
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <el-table-column label="客户" align="center" width="120" fixed>
        <template slot-scope="scope">
          <span class="col-cont" v-html="showDate(scope.row.lite_name)"></span>
        </template>
      </el-table-column>
      <el-table-column label="类别" width="80" fixed>
        <template slot-scope="scope">{{ csType[scope.row.type - 1] }}</template>
      </el-table-column>
      <el-table-column label="主营业务" align="center" width="200">
        <template slot-scope="scope">
          <span class="col-cont" v-html="showDate(scope.row.business)"></span>
        </template>
      </el-table-column>
      <el-table-column label="联系人" align="center" width="120">
        <template slot-scope="scope">
          <span class="col-cont" v-html="showDate(scope.row.contact_name)"></span>
        </template>
      </el-table-column>
      <el-table-column label="联系人电话" align="center" width="120">
        <template slot-scope="scope">
          <span class="col-cont" v-html="showDate(scope.row.contact_phone)"></span>
        </template>
      </el-table-column>
      <el-table-column label="联系人邮箱" align="center" width="200">
        <template slot-scope="scope">
          <span class="col-cont" v-html="showDate(scope.row.contact_email)"></span>
        </template>
      </el-table-column>
      <el-table-column label="合作状态" prop="status" width="70">
        <template slot-scope="scope">
          <span>{{ status[scope.row.status - 1] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="60">
        <template slot-scope="scope">
          <!-- <el-button @click="handleClick(scope.row)" type="text" size="mini">查看</el-button> -->
          <re-customer :customer="scope.row.lite_name"></re-customer>
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
    <rich-text></rich-text>
  </div>
</template>

<script>
import { request } from '@/network/rquest'
import addCustomer from '../customers/addcustomer'
import ReCustomer from './recustomer'
import richText from '../../components/ckeditor/richText'
export default {
  data() {
    return {
      customerRow: {},
      dialogVisable: false,
      pagesize: 10,
      page: 1,
      count: 0,
      customerData: [],
      sliceTableData: [],
      search: '',
      //数据加载动画
      loading: true,
      csType: ['采购商', '供应商', '采购&供应商'],
      status: ['合作', '终止', '开发']
    }
  },
  //注册组件
  components: {
    addCustomer,
    ReCustomer,
    richText
  },
  methods: {
    handleClose() {},
    //清除快捷搜索
    clearnSearchText() {
      this.search = null
    },
    handlePage(page, size) {
      const search = this.search
      if (search) {
        // filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。
        // 注意： filter() 不会对空数组进行检测。
        // 注意： filter() 不会改变原始数组。
        return this.customerData
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
      return this.customerData.slice((page - 1) * size, page * size * 1)
    },
    //关键词高亮
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
    //查看客户详情
    // handleClick(row) {
    //   this.dialogVisable = true
    //   this.customerRow = row
    // },
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
    //接收子组件新增订单传递过来的新增之后的订单数据
    addNewCustomer(newCustomerdata) {
      this.customerData.push(newCustomerdata)
      this.count += 1
    }
  },
  created() {
    request({
      url: 'customers/'
    })
      .then(res => {
        // console.log(res)
        this.customerData = res.data
        this.loading = false
        this.count = res.data.length
      })
      .catch(res => {
        this.$message({
          message: '网络错误,请稍后重试',
          type: 'warning'
        })
      })
  }
}
</script>

<style scoped></style>
