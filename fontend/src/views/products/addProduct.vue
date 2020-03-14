<template>
  <el-dialog
    title
    :visible.sync="addProductVisble"
    width="90%"
    :before-close="close"
  >
    <el-form :model="addProductData" ref="addProductData" label-width="80px">
      <el-row>
        <el-col :span="6">
          <el-form-item label="类别">
            <el-select
              v-model="addProductData.sub_type"
              filterable
              placeholder="请选择"
              @visible-change="handleProductTypeSelect"
            >
              <el-option
                v-for="item in productTypeData"
                :key="item.sub_type"
                :label="item.sub_type"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="编号">
            <el-input v-model="addProductData.pro_number"></el-input>
            <!-- <span>{{ addProductData.pro_number }}</span> -->
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="名称">
            <el-input v-model="addProductData.pro_name"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="尺寸">
            <el-input v-model="addProductData.pro_size"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="重量(g)">
            <el-input v-model="addProductData.pro_weight"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="规格">
            <el-input v-model="addProductData.pro_model"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="包装">
            <el-input v-model="addProductData.pro_pack"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="seo标题">
            <el-input v-model="addProductData.seo_title"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="seo描述">
            <el-input v-model="addProductData.seo_desc"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="颜色">
            <add-product-color
              :ProductColor="addProductData"
              @getProColor="handleSelect"
              @delProColor="delProColor"
              :addColorBtn="(childAddColorBtn = false)"
            ></add-product-color>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="18">
          <upload-pic
            :number="addProductData.pro_number"
            :owner="'product'"
            @sendPicUrl="getPicUrl"
          ></upload-pic>
          <span>{{ addProductData.pro_pic }}</span>
        </el-col>
        <el-col :span="6">
          <pic-carousel
            :proPicUrl="addProductData.pro_pic"
            ref="picCar"
          ></pic-carousel>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <!-- <el-form-item> -->
          <ckeditor
            v-model="addProductData.pro_desc"
            :config="editorConfig"
          ></ckeditor>
          <!-- </el-form-item> -->
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
import { getProductType } from '@/api/products'
import picCarousel from '@/components/common/picCarousel'
import uploadPic from '@/components/common/uploadPic'
import richText from '@/components/ckeditor/richText'
import addProductColor from '@/components/common/addProductColor'
import { postProducts } from '@/api/products'
export default {
  name: 'addProduct',
  components: {
    picCarousel,
    uploadPic,
    richText,
    addProductColor
  },
  props: {
    addProductVisble: {
      type: Boolean,
      default: false
    },
    addProductData: {
      type: Object,
      default: function() {
        return {
          pro_color: '',
          pro_pic: ''
        }
      }
    }
  },
  data() {
    return {
      productTypeData: [],
      // addProductData: {
      //   pro_color: '',
      //   pro_pic: ''
      // },
      childAddColorBtn: true,
      editorConfig: {
        toolbar: [
          ['Source'],
          ['Styles', 'Format', 'Font', 'FontSize'],
          ['Bold', 'Italic'],
          ['Undo', 'Redo'],
          ['Image'],
          ['About']
        ]
      }
    }
  },
  methods: {
    //获取产品类别
    handleProductTypeSelect(v) {
      if (v === true) {
        getProductType().then(res => {
          this.productTypeData = res.data.results
          // this.addProductData.pro_number =
          //   this.addProductData.sub_type +
          //   '-' +
          //   Math.random()
          //     .toString(36)
          //     .substr(2, 4)
        })
      }
    },
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
    handleSelect(item) {
      if (this.addProductData.pro_color === '') {
        this.addProductData.pro_color = JSON.stringify(item) + '|'
      } else {
        this.addProductData.pro_color += JSON.stringify(item) + '|'
      }
    },
    //获取图片地址
    getPicUrl(picurl, index) {
      if (this.addProductData.pro_pic.length === 0) {
        this.addProductData.pro_pic = JSON.stringify(picurl) + '|'
        this.$refs.picCar.addPicUrl(picurl)
      } else {
        this.addProductData.pro_pic += JSON.stringify(picurl) + '|'
        this.$refs.picCar.addPicUrl(picurl)
      }
    },
    //提交
    onSubmit() {
      postProducts(this.addProductData)
        .then(res => {})
        .catch(error => {})
    },
    close() {
      this.$confirm('数据未保存,确认关闭?')
        .then(_ => {
          let promis = new Promise((resolve, reject) => {
            this.$emit('closeAddProductDialog')
            resolve()
          }).then(_ => {
            // this.addProductData = {}
          })
        })
        .catch(_ => {})
    }
  }
}
</script>

<style></style>
