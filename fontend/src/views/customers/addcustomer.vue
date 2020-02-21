<template>
  <div>
    <el-button type="primary" @click="dialogStatus">新增客户</el-button>
    <el-dialog
      title="新增客户"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <el-form
        :model="customerData"
        ref="customerData"
        label-width="120px"
        size="mini"
        :rules="rueles"
        inline-message
      >
        <el-form-item label="客户类型">
          <el-select
            size="mini"
            v-model="customerData.type"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客户简称" prop="lite_name">
          <el-input v-model="customerData.lite_name"></el-input>
        </el-form-item>
        <el-form-item label="客户全称">
          <el-input v-model="customerData.name" placeholder="选填"></el-input>
        </el-form-item>
        <el-form-item label="详细地址">
          <el-input
            v-model="customerData.address"
            placeholder="选填"
          ></el-input>
        </el-form-item>
        <el-form-item label="公司电话">
          <el-input v-model="customerData.phone" placeholder="选填"></el-input>
        </el-form-item>
        <el-form-item label="公司网站">
          <el-input
            v-model="customerData.website"
            placeholder="https://example.com"
          ></el-input>
        </el-form-item>
        <el-form-item label="主营业务" prop="business">
          <el-input
            v-model="customerData.business"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="CEO">
          <el-input v-model="customerData.ceo" placeholder="选填"></el-input>
        </el-form-item>
        <el-form-item label="CEO邮箱">
          <el-input v-model="customerData.email" placeholder="选填"></el-input>
        </el-form-item>
        <el-form-item label="CEO电话">
          <el-input
            v-model="customerData.ceo_phone"
            placeholder="选填"
          ></el-input>
        </el-form-item>
        <el-form-item label="联系人" prop="contact_name">
          <el-input
            v-model="customerData.contact_name"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="联系人电话" prop="contact_phone">
          <el-input
            v-model="customerData.contact_phone"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="联系人邮箱" prop="contact_email">
          <el-input
            v-model="customerData.contact_email"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="合作状态">
          <el-select
            size="mini"
            v-model="customerData.status"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in csStatusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="信用额度">
          <el-input
            v-model="customerData.line_credits"
            placeholder="选填,默认:0"
          ></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="customerData.text" placeholder="选填"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('customerData')"
            >立即创建</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { request } from '../../network/rquest'
import qs from 'qs'
import { postCustomer } from '../../api/customer'
export default {
  name: 'addCustomer',
  data() {
    return {
      rueles: {
        lite_name: [
          { required: true, message: '请输入客户简称', trigger: 'blur' },
          { min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur' }
        ],
        contact_email: [
          {
            type: 'email',
            required: true,
            message: '不是有效的邮箱',
            trigger: 'blur'
          }
        ],
        contact_name: [
          { required: true, message: '请输入联系人', trigger: 'blur' }
        ],
        contact_phone: [
          { required: true, message: '请输入联系人电话', trigger: 'blur' }
        ],
        contact_email: [
          { required: true, message: '请输入联系人邮箱', trigger: 'blur' }
        ],
        business: [
          { required: true, message: '请输入主营业务', trigger: 'blur' }
        ]
      },
      customerData: {
        type: '',
        name: '',
        lite_name: '',
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
        text: ''
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
      ],
      dialogVisible: false
    }
  },
  methods: {
    dialogStatus() {
      this.dialogVisible = true
      request({
        url: 'customers/',
        params: {
          st: 'addcustomer'
        }
      })
        .then(res => {
          window.sessionStorage.setItem('subtoken', res.data.subtoken)
        })
        .catch(res => {
          this.$message({
            message: '网络错误,请稍后重试',
            type: 'warning'
          })
        })
    },
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (!window.sessionStorage.getItem('subtoken')) {
            this.$message.error('请勿重复提交,或刷新重试')
          } else {
            postCustomer(this.customerData)
              .then(res => {
                let newCustomerdata = res.data
                this.$emit('addNewCustomer', newCustomerdata)
                window.sessionStorage.removeItem('subtoken')
                this.dialogVisible = false
                this.customerData = {}
              })
              .catch(err => {
                // 请求失败的返回信息不能直接在err中拿,要像下面这样拿到xsz
                // console.log(err.response.request)
                // console.log(typeof err.response.request.response)
                let errmsg = qs.parse(err.response.request.response, {
                  delimiter: ','
                })
                this.responseMessage(errmsg)
              })
          }
        }
      })
    },
    handleClose(done) {
      this.$confirm('请确认数据已保存!')
        .then(_ => {
          this.customerData = {}
          done()
        })
        .catch(_ => {})
    },
    responseMessage(msg) {
      this.$notify({
        title: '警告',
        message: msg,
        position: 'top-left'
      })
    }
  }
}
</script>

<style scoped></style>
