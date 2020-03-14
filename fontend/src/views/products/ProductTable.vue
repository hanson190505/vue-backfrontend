<template>
  <div>
    <el-table
      :data="productsData"
      border
      show-summary
      highlight-current-row
      style="width=99.9%"
      v-loading="loading"
      :row-class-name="tableRowClassName"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <el-table-column label="产品类别" align="center" width="80" fiexd>
        <template slot-scope="scope">
          <span>{{ scope.row.sub_type }}</span>
        </template>
      </el-table-column>
      <el-table-column label="seo标题" align="center" width="120">
        <template slot-scope="scope">
          <el-input v-model="scope.row.seo_title"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="seo描述" align="center" width="200">
        <template slot-scope="scope">
          <el-input v-model="scope.row.seo_desc"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="添加日期" align="center" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.pub_date }}</span>
        </template>
      </el-table-column>
      <el-table-column label="编号" align="center" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.pro_number }}</span>
        </template>
      </el-table-column>
      <el-table-column label="名称" align="center" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.pro_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="尺寸" align="center" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.pro_size }}</span>
        </template>
      </el-table-column>
      <el-table-column label="重量(g)" align="center" width="80">
        <template slot-scope="scope">
          <span>{{ scope.pro_weight }}</span>
        </template>
      </el-table-column>
      <el-table-column label="型号" align="center" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.pro_model }}</span>
        </template>
      </el-table-column>
      <el-table-column label="包装" align="center" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.pro_pack }}</span>
        </template>
      </el-table-column>
      <el-table-column width="150" label="颜色">
        <template slot-scope="scope">
          <add-product-color
            :parentProColor="scope"
            @getProColor="handleSelect"
            @delProColor="delProColor"
            :addColorBtn="(childAddColorBtn = false)"
          ></add-product-color>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="60" align="center">
        <template slot-scope="scope">
          <el-button @click="handleCheck(scope.row)" type="text" size="mini"
            >查看</el-button
          >
          <el-button @click="handleSave(scope.row)" type="text" size="mini"
            >保存</el-button
          >
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
import { getProductType, getProducts } from '@/api/products'
import addProductColor from '@/components/common/addProductColor'
import pagiNation from '@/components/common/pagiNation'
import dateSearch from '@/components/common/dateSearch'
import backendSearchVue from '@/components/common/backendSearch.vue'
export default {
  name: 'ProductTable',
  components: {
    addProductColor,
    pagiNation,
    backendSearchVue,
    dateSearch
  },
  data() {
    return {
      productsData: [],
      productTypeData: [],
      childAddColorBtn: true,
      loading: false,
      dataTotal: 0
    }
  },
  methods: {
    //删除颜色
    delProColor(value, index) {
      let newValue = ''
      this.productsData[index].pro_color.split('|').forEach((el, i) => {
        if (!(el.indexOf(value) !== -1)) {
          if (el !== '') {
            newValue += el + '|'
          }
        }
      })
      this.productsData[index].pro_color = newValue
    },
    //获取子组件选择搜索后的颜色
    handleSelect(item, index) {
      if (this.productsData[index].pro_color === '') {
        this.productsData[index].pro_color = JSON.stringify(item) + '|'
      } else {
        this.productsData[index].pro_color += JSON.stringify(item) + '|'
      }
    },
    //动态更新表格行类名
    tableRowClassName() {
      return ''
    },
    pagination(params) {
      //子组件backendSearch清空搜索条件时调用,设定page默认值为1
      if (!params) {
        params = { page: 1, page_size: 10 }
      }
      getProducts(params).then(res => {
        this.productsData = res.data.results
        this.loading = false
        this.dataTotal = res.data.count
      })
    },
    //查看详情
    handleCheck(row) {
      this.$emit('checkproductData', row)
    },
    //保存修改
    handleSave(row) {}
  },
  created() {
    this.pagination()
  }
}
</script>

<style scoped></style>
