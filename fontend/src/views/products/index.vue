<template>
  <div>
    <el-row>
      <el-col :span="4">
        <el-button type="primary" @click="addproductType">新增类别</el-button>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="addproductData">新增产品</el-button>
      </el-col>
    </el-row>
    <Product-table @checkproductData="checkproductData"></Product-table>
    <add-product
      :addProductData="productsData"
      :addProductVisble="addProductVisible"
      @closeAddProductDialog="closeAddProductDialog"
    ></add-product>
    <addProduct-type
      :visible="addproductTypeVisible"
      @closeAddproductType="closeAddproductType"
    ></addProduct-type>
  </div>
</template>

<script>
import ProductTable from './ProductTable'
import addProductType from './addProductType'
import addProduct from './addProduct'
export default {
  components: {
    ProductTable,
    addProductType,
    addProduct
  },
  data() {
    return {
      productsData: {},
      addproductTypeVisible: false,
      addProductVisible: false
    }
  },
  methods: {
    pagination() {},
    //新增分类
    addproductType() {
      this.addproductTypeVisible = true
    },
    //新增产品
    addproductData() {
      // let newData = {
      //   sub_type: '',
      //   seo_title: '',
      //   seo_desc: '',
      //   pub_date: '',
      //   pro_number: '',
      //   pro_name: '',
      //   pro_size: '',
      //   pro_model: '',
      //   pro_pack: '',
      //   pro_color: '',
      //   pro_weight: '',
      //   pro_pic: '',
      //   pro_desc: '',
      //   is_edit: 1
      // }
      // this.productsData.push(newData)
      this.addProductVisible = true
    },
    closeAddproductType() {
      this.addproductTypeVisible = false
    },
    closeAddProductDialog() {
      this.addProductVisible = false
      this.productsData = { pro_color: '', pro_pic: '' }
    },
    checkproductData(data) {
      this.addProductVisible = true
      this.productsData = data
    }
  }
}
</script>

<style scoped></style>
