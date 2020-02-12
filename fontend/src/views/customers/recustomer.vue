<template>
  <div>
    <el-button type="text" @click="handleReCustomer" size="mini">查看</el-button>
    <el-dialog
      :visible.sync="reCustomerDia"
      width="40%"
      :append-to-body="true"
      :before-close="beforeClose"
    >
      <el-form
        :model="customerData"
        ref="customerData"
        label-width="120px"
        size="mini"
        :rules="reCustomerRules"
        inline-message
      >
        <el-form-item label="客户类型">
          <el-select size="mini" v-model="customerData.type" clearable :disabled="formDisabled">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="合作状态">
          <el-select size="mini" v-model="customerData.status" clearable :disabled="formDisabled">
            <el-option
              v-for="item in csStatusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客户简称">
          <el-input v-model="customerData.lite_name" disabled></el-input>
        </el-form-item>
        <el-form-item label="客户全称">
          <el-input v-model="customerData.name" :disabled="formDisabled"></el-input>
        </el-form-item>
        <el-form-item label="详细地址">
          <el-input v-model="customerData.address" :disabled="formDisabled"></el-input>
        </el-form-item>
        <el-form-item label="公司电话">
          <el-input v-model="customerData.phone" :disabled="formDisabled"></el-input>
        </el-form-item>
        <el-form-item label="公司网站" prop="website">
          <el-input v-model="customerData.website" :disabled="formDisabled"></el-input>
        </el-form-item>
        <el-form-item label="主营业务">
          <el-input v-model="customerData.business" :disabled="formDisabled"></el-input>
        </el-form-item>
        <el-form-item label="CEO">
          <el-input v-model="customerData.ceo" :disabled="formDisabled"></el-input>
        </el-form-item>
        <el-form-item label="CEO邮箱" prop="email">
          <el-input v-model="customerData.email" :disabled="formDisabled"></el-input>
        </el-form-item>
        <el-form-item label="CEO电话">
          <el-input v-model="customerData.ceo_phone" :disabled="formDisabled"></el-input>
        </el-form-item>
        <el-form-item label="联系人">
          <el-input v-model="customerData.contact_name" :disabled="formDisabled"></el-input>
        </el-form-item>
        <el-form-item label="联系人电话">
          <el-input v-model="customerData.contact_phone" :disabled="formDisabled"></el-input>
        </el-form-item>
        <el-form-item label="联系人邮箱" prop="contact_email">
          <el-input v-model="customerData.contact_email" :disabled="formDisabled"></el-input>
        </el-form-item>
        <el-form-item label="信用额度" prop="line_credits">
          <el-input v-model="customerData.line_credits" :disabled="formDisabled"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="customerData.text" :disabled="formDisabled"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="changebtnstatus">修 改</el-button>
          <el-button type="primary" @click="handleSubmit('customerData')">提 交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { request } from '../../network/rquest'
import qs from 'qs'
export default {
  name: 'ReCustomer',
  props: {
    customer: String
  },
  data() {
    return {
      //表单可编辑状态控制
      formDisabled: true,
      //弹出显示状态
      reCustomerDia: false,
      customerData: {
        lite_name: '',
        sales: '',
        type: 1,
        name: '',
        address: '',
        phone: '',
        website: '',
        business: '',
        ceo: '',
        email: '',
        ceo_phone: '',
        contact_name: '',
        contact_email: '',
        contact_phone: '',
        status: 1,
        line_credits: 0,
        input_time: '',
        text: ''
      },
      reCustomerRules: {
        website: [{ type: 'url', message: '不是有效的网址', trigger: 'blur' }],
        email: [{ type: 'email', message: '不是有效的邮箱', trigger: 'blur' }],
        contact_email: [
          { type: 'email', message: '不是有效的邮箱', trigger: 'blur' }
        ]
      },
      options: [
        { value: 1, label: '采购商' },
        {
          value: 2,
          label: '供应商'
        },
        {
          value: 3,
          label: '采购&供应商'
        }
      ],
      csStatusOptions: [
        { value: 1, label: '合作' },
        {
          value: 2,
          label: '终止'
        },
        {
          value: 3,
          label: '开发'
        }
      ]
    }
  },
  methods: {
    //改变编辑状态
    changebtnstatus() {
      this.formDisabled = false
    },
    //获取客户信息
    handleReCustomer() {
      this.reCustomerDia = true
      request({
        url: 'customers/' + this.customer + '/'
      })
        .then(res => {
          this.customerData = res.data
        })
        .catch(res => {
          this.$message({
            message: '网络错误,请稍后重试',
            type: 'warning'
          })
        })
    },
    beforeClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.formDisabled = false
          done()
        })
        .catch(_ => {})
    },
    //提交修改后的信息
    handleSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          request({
            url: 'customers/' + this.customer + '/',
            method: 'patch',
            data: qs.stringify(this.customerData)
          })
            .then(res => {
              this.formDisabled = true
              this.$message({
                message: '修改成功',
                type: 'success'
              })
            })
            .catch(res => {
              this.$message({
                message: '网络错误,请稍后重试',
                type: 'warning'
              })
            })
        } else {
          // console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped>
</style>