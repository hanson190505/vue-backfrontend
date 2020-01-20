<template>
  <div class="add-order">
    <el-button type="primary" @click="dialogStatus">新增订单</el-button>
    <el-dialog title="新增订单" :visible.sync="dialogVisible" width="96%" :before-close="handleClose">
      <el-form
        ref="form"
        :model="orderData"
        label-width="80px"
        size="mini"
        :rules="addOrderFormRoles"
        inline-message
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="订单编号" prop="order_number">
              <el-input v-model="orderData.order_number"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="客户名称">
              <el-select
                v-model="orderData.customer"
                filterable
                placeholder="请选择"
                @visible-change="selectTest"
              >
                <el-option
                  v-for="item in customerData"
                  :key="item.lite_name"
                  :label="item.lite_name"
                  :value="item.lite_name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="下单日期">
              <!-- <el-input v-model="orderData.order_date"></el-input> -->
              <el-date-picker
                v-model="orderData.order_date"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="订单交期">
              <!-- <el-input v-model="orderData.deliver_date"></el-input> -->
              <el-date-picker
                v-model="orderData.deliver_date"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="汇率" prop="ex_rate">
              <el-input v-model="orderData.ex_rate"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="金额">
              <el-input v-model="orderData.order_amount"></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="8">
            <el-form-item label="完成状态">
              <el-switch
                v-model="orderData.is_done"
                active-color="#13ce66"
                inactive-color="#ff4949"
              ></el-switch>
            </el-form-item>
          </el-col>-->
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="出货地址">
              <el-input v-model="orderData.ship_addr"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注">
              <el-input v-model="orderData.text"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-button size="mini" type="primary" @click="addSubOrder()">订单明细</el-button>
        <el-table :data="subOrderData" style="width: 99.9%">
          <!-- <el-table-column type="selection" width="40"></el-table-column> -->
          <el-table-column label="产品名称" width="150">
            <template slot-scope="scope">
              <el-input v-if="scope.row.status" size="mini" v-model="scope.row.pro_name"></el-input>
              <span v-else>{{ scope.row.pro_name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="类型" width="80">
            <template slot-scope="scope">
              <!-- <el-input v-if="scope.row.status" size="mini" v-model="scope.row.pro_item"></el-input> -->
              <el-select
                v-if="scope.row.status"
                size="mini"
                v-model="scope.row.pro_item"
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
              <span v-else>{{ options[scope.row.pro_item - 1].label }}</span>
            </template>
          </el-table-column>
          <el-table-column label="描述" width="400">
            <template slot-scope="scope">
              <el-input
                v-if="scope.row.status"
                size="mini"
                v-model="scope.row.pro_desc"
                type="textarea"
                autosize
              ></el-input>
              <span v-else>{{ scope.row.pro_desc }}</span>
            </template>
          </el-table-column>
          <el-table-column label="数量" prop="pro_qt" width="100">
            <template slot-scope="scope">
              <el-input v-if="scope.row.status" size="mini" v-model="scope.row.pro_qt"></el-input>
              <span v-else>{{ scope.row.pro_qt }}</span>
            </template>
          </el-table-column>
          <el-table-column label="单价($)" width="80">
            <template slot-scope="scope">
              <el-input
                v-if="scope.row.status"
                size="mini"
                v-model="scope.row.pro_price"
                @blur="subAmount(scope.row)"
              ></el-input>
              <span v-else>{{ scope.row.pro_price }}</span>
            </template>
          </el-table-column>
          <el-table-column label="重量(g)" width="80">
            <template slot-scope="scope">
              <el-input v-if="scope.row.status" size="mini" v-model="scope.row.pro_weight"></el-input>
              <span v-else>{{ scope.row.pro_weight }}</span>
            </template>
          </el-table-column>
          <el-table-column label="汇率" width="80">
            <template slot-scope="scope">
              <el-input v-if="scope.row.status" size="mini" v-model="scope.row.sub_ex_rate"></el-input>
              <span v-else>{{ scope.row.sub_ex_rate }}</span>
            </template>
          </el-table-column>
          <el-table-column label="金额($)" prop="sub_amount" width="100">
            <template slot-scope="scope">
              <el-input v-if="scope.row.status" size="mini" v-model="scope.row.sub_amount"></el-input>
              <span v-else>{{ scope.row.sub_amount }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150" fixed="right">
            <template slot-scope="scope">
              <el-button type="text" @click="addSubOrderRow(scope.row)">新增</el-button>
              <el-button type="text" @click="editSubOrderRow(scope.row)">修改</el-button>
              <el-button size="mini" type="text" @click="delSubOrderRow(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
      <el-button type="primary" @click="onSubmit">保存</el-button>
    </el-dialog>
  </div>
</template>

<script>
import { request } from '../../network/rquest'
import qs from 'qs'
export default {
  name: 'AddOrder',
  components: {},
  data() {
    return {
      //客户表数据
      customerData: [],
      orderData: {
        order_number: '',
        customer: '',
        order_date: '',
        deliver_date: '',
        ex_rate: 0,
        order_amount: 0,
        ship_addr: '',
        text: ''
      },
      subOrderData: [
        // {
        //   //   pro_name: '',
        //   //   pro_item: '',
        //   //   pro_desc: '',
        //   //   pro_qt: '',
        //   //   pro_price: '',
        //   //   pro_weight: '',
        //   //   order_number: '',
        //   //   sub_ex_rate: '',
        //   //   sub_amount: ''
        // }
      ],
      addOrderFormRoles: {
        order_number: [
          { required: true, message: '请输入订单编号', trigger: 'blur' }
        ]
      },
      options: [
        { value: 1, label: '硅胶' },
        {
          value: 2,
          label: '五金'
        },
        {
          value: 3,
          label: 'USB'
        },
        {
          value: 4,
          label: '移动电源'
        },
        {
          value: 5,
          label: '其他'
        }
      ],
      dialogVisible: false,
      //保存按钮显示状态
      onSubmitStatus: false
    }
  },
  methods: {
    //打开新增订单表单
    dialogStatus() {
      this.dialogVisible = true
      request({
        url: 'orders/',
        params: {
          token: window.sessionStorage.getItem('token'),
          st: 'addorder'
        }
      }).then(res => {
        window.sessionStorage.setItem('subtoken', res.data.subtoken)
      })
    },
    //提交订单明细
    onSubmit() {
      for (const i of this.subOrderData) {
        i.status = 0
      }
      if (!this.orderData.order_number) {
        this.$message.error('请完整填写订单信息!')
      } else {
        if (!window.sessionStorage.getItem('subtoken')) {
          this.$message.error('请勿重复提交,或刷新重试')
        } else {
          let promise = new Promise((resolve, reject) => {
            request({
              url: 'orders/',
              method: 'POST',
              params: {
                token: window.sessionStorage.getItem('token'),
                subtoken: window.sessionStorage.getItem('subtoken')
              },
              headers: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              data: qs.stringify(this.orderData)
            })
              .then(res => {
                resolve(res)
                console.log(res)
                //把返回的订单信息存储到vuex中
                this.$store.state.orderdetail = res.data
                //循环提交订单明细
                for (const val of this.subOrderData) {
                  request({
                    url: 'suborders/',
                    method: 'POST',
                    params: {
                      token: window.sessionStorage.getItem('token'),
                      subtoken: window.sessionStorage.getItem('subtoken')
                    },
                    headers: {
                      'content-type': 'application/x-www-form-urlencoded'
                    },
                    data: qs.stringify(val)
                  })
                    .then(res => {
                      console.log(res.data)
                      //把返回的订单明细保存在vuex中
                      this.$store.state.suborderdetail.push(res.data)
                    })
                    .catch(err => {
                      console.log(err)
                    })
                }
              })
              .catch(err => {
                // 请求失败的返回信息不能直接在err中拿,要像下面这样拿到
                console.log(err.response.request)
                console.log(typeof err.response.request.response)
                let errmsg = qs.parse(err.response.request.response, {
                  delimiter: ','
                })
                this.responseMessage(errmsg)
              })
          })
          promise.then(res => {
            // //请求刚提交的订单
            console.log(res)
            window.sessionStorage.removeItem('subtoken')
            this.$router.replace('orders/' + res.order_number + '/')
          })
        }
      }
    },
    responseMessage(msg) {
      this.$notify({
        title: '警告',
        message: msg,
        position: 'top-left'
      })
    },
    handleClose(done) {
      this.$confirm('请确认数据已保存!')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    delSubOrderRow(index, row) {
      this.subOrderData.splice(index, 1)
      console.log(this.subOrderData)
    },
    //开始新增订单明细
    addSubOrder() {
      if (!this.orderData.order_number) {
        this.$message.error('请完整填写订单信息!')
      } else {
        let newValue = {
          pro_name: '',
          pro_item: 1,
          pro_desc: '',
          pro_qt: 0,
          pro_price: 0,
          pro_weight: 0,
          order_number: this.orderData.order_number,
          sub_ex_rate: this.orderData.ex_rate,
          sub_amount: 0,
          status: 1
        }
        this.subOrderData.push(newValue)
      }
    },
    //新增订单明细
    addSubOrderRow(row) {
      // row.status = 0
      let newValue = {
        pro_name: '',
        pro_item: 1,
        pro_desc: '',
        pro_qt: 0,
        pro_price: 0,
        pro_weight: 0,
        order_number: this.orderData.order_number,
        sub_ex_rate: this.orderData.ex_rate,
        sub_amount: 0,
        status: 1
      }
      this.subOrderData.push(newValue)
    },
    editSubOrderRow(row) {
      row.status = 1
    },
    //订单明细合计
    subAmount(row) {
      row.sub_amount = row.pro_price * row.pro_qt * 1
    },
    //客户名称选择时,调用后台客户数据
    selectTest(v) {
      if (v === true) {
        request({
          url: 'customers/',
          method: 'GET',
          params: {
            token: window.sessionStorage.getItem('token')
          }
        }).then(res => {
          this.customerData = res.data
        })
      }
    }
  }
}
</script>

<style lang="less" scoped></style>
