<template>
  <el-dialog :visible.sync="visible" width="30%" :before-close="handleClose">
    <el-form :model="productTypeData" ref="productTypeData" label-width="80px">
      <el-form-item label="产品大类" prop="type">
        <el-select v-model="productTypeData.type" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="产品子类" prop="sub_type">
        <el-input v-model="productTypeData.sub_type" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { postProductType } from '@/api/products'
export default {
  data() {
    return {
      rueles: {
        type: [{ required: true, message: '请选择产品大类', trigger: 'blur' }],
        sub_type: [
          { required: true, message: '请输入产品子类', trigger: 'blur' }
        ]
      },
      productTypeData: {
        type: '',
        sub_type: ''
      },
      options: [
        { value: 1, label: '硅胶产品' },
        { value: 2, label: '五金产品' },
        { value: 3, label: '电子产品' },
        { value: 4, label: '塑胶产品' },
        { value: 5, label: '木制产品' },
        { value: 6, label: '其他产品' }
      ]
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onSubmit() {
      // this.$refs.postProductType.validate(valid => {
      //   if (valid) {
      postProductType(this.productTypeData)
        .then(res => {
          this.$message({
            message: '创建成功',
            type: 'seccuss'
          })
          this.$emit('closeAddproductType', 'close')
        })
        .catch(error => {
          this.$message({
            message: '网络错误,请稍后重试',
            type: 'warning'
          })
        })
      //     }
      //   })
    },
    //关闭窗口处理
    handleClose(done) {
      let promise = new Promise((resolve, reject) => {
        this.$emit('closeAddproductType')
        resolve()
      }).then(res => {
        done()
      })
    }
  }
}
</script>

<style>
</style>