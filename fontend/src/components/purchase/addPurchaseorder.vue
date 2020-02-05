<template>
  <div>
    <el-button type="text" @click="addNewPurchase">新增采购</el-button>
    <el-dialog :visible.sync="dialogVisible" width="90%" :before-close="handleClose">
      <h3 class="purchase-title">采 购 单</h3>
      <hr />
      <el-form :model="addPurchaseData" ref="addPurchaseData" label-width="80px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="采购单号">
              <el-input v-model="addPurchaseData.purchase_number" placeholder></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="供应商">
              <el-select
                v-model="addPurchaseData.purchaser"
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
          <el-col :span="6">
            <el-form-item label="采购日期">
              <el-date-picker
                v-model="addPurchaseData.purchase_date"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="采购交期">
              <el-date-picker
                v-model="addPurchaseData.deliver_date"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注">
              <el-input type="textarea" :rows="2" v-model="addPurchaseData.text" placeholder="选填"></el-input>
            </el-form-item>
            <!-- <el-form-item>
              <el-button type="primary" @click="onSubmit">立即创建</el-button>
              <el-button>取消</el-button>
            </el-form-item>-->
          </el-col>
        </el-row>
      </el-form>
      <el-button type="primary" @click="addPurchaseDetail">新增明细</el-button>
      <el-table
        :data="subPurchaseOrderData"
        style="width: 99.9%"
        show-summary
        highlight-current-row
      >
        <el-table-column label="订单编号" width="140">
          <template slot-scope="scope">
            <span>{{ scope.row.order_number.order_number }}</span>
          </template>
        </el-table-column>
        <el-table-column label="产品名称" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.pro_name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="产品描述" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.pro_desc }}</span>
          </template>
        </el-table-column>
        <el-table-column label="订单数量" width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.pro_qt }}</span>
          </template>
        </el-table-column>
        <el-table-column label="产品单价($)" width="100">
          <template slot-scope="scope">
            <span>{{scope.row.pro_price}}</span>
          </template>
        </el-table-column>
        <el-table-column label="订单金额($)" width="120">
          <template slot-scope="scope">
            <span>{{scope.row.sub_amount}}</span>
          </template>
        </el-table-column>
        <el-table-column label="采购数量" width="120">
          <template slot-scope="scope">
            <el-input v-model="scope.row.purchase_qt"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="采购单价($)" width="100">
          <template slot-scope="scope">
            <el-input v-model="scope.row.purchase_price" @blur="subAmount(scope.row)"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="采购金额($)" width="120">
          <template slot-scope="scope">
            <el-input v-model="scope.row.purchase_amount"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="备注" width="140">
          <template slot-scope="scope">
            <el-input v-model="scope.row.text"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="60" align="center">
          <template slot-scope="scope">
            <el-button @click="handleDelete(scope.$index, scope.row)" type="text" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button type="primary" @click="submitPurchaseDetail">保 存</el-button>

      <el-dialog :visible.sync="subdialogVisable" width="99%" :append-to-body="true">
        <suborder-detail @getSelectSuborder="getSelectSuborder"></suborder-detail>
        <!-- <suborder-detail></suborder-detail> -->
        <span slot="footer">
          <el-button @click="subdialogVisable = false">确 定</el-button>
        </span>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
import { patchSubOrder } from '@/api/order'
import { getCustomer } from '@/api/customer'
import { postPurchase } from '@/api/purchase'
import { getSubToken, delSubtoken } from '@/api/token'
import { makeOrderNumber } from '../../utils/makeOrderNumber'
import { postPurchaseDetail, getPurchaseDetail } from '@/api/purchase'
import suborderDetail from '../order/suborderdetail'
import purchaseDetail from './purchaseDetail'
export default {
  name: 'addPurchaseorder',
  components: {
    suborderDetail
  },
  data() {
    return {
      customerData: [],
      customerList: [],
      dialogVisible: false,
      addPurchaseData: {},
      subdialogVisable: false,
      subPurchaseOrderData: [],
      subOrderData: []
      //传递给订单明细表,控制显示参数
    }
  },
  methods: {
    addNewPurchase() {
      this.dialogVisible = true
      getSubToken()
      this.addPurchaseData.purchase_number = makeOrderNumber('PC')
    },
    //供应商名称选择时,调用后台客户数据
    selectTest(v) {
      if (v === true) {
        getCustomer().then(res => {
          this.customerData = res.data
        })
      }
    },
    //关闭弹出前的回调
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    getSelectSuborder(selectSuborder) {
      console.log(selectSuborder)
      this.subPurchaseOrderData = selectSuborder
      // console.log(this.subPurchaseOrderData)
    },
    addPurchaseDetail() {
      this.subdialogVisable = true
      getSubToken()
    },
    addRow() {},
    //合计采购金额
    subAmount(row) {
      console.log(row)
      row.purchase_amount = row.purchase_qt * row.purchase_price
    },
    submitPurchaseDetail() {
      if (
        !this.addPurchaseData.purchaser ||
        !this.addPurchaseData.purchase_date ||
        !this.addPurchaseData.deliver_date
      ) {
        this.$message.error('请完整填写采购信息!')
      } else {
        if (!window.sessionStorage.getItem('subtoken')) {
          this.$message.error('请勿重复提交,或刷新重试')
        } else {
          let promise = new Promise((resolve, reject) => {
            this.$store
              .dispatch('purchaseStore/addPurchaseOrder', this.addPurchaseData)
              .then(res => {
                resolve(res)
                for (const i of this.subPurchaseOrderData) {
                  i.purchase_number = this.addPurchaseData.purchase_number
                  i.sub_order = i.id
                  postPurchaseDetail(i)
                    .then(res => {
                      patchSubOrder(i.id, '', { is_purchase: 0 }).then(res => {
                        this.$notify({
                          title: 'succsess',
                          message: `${i.order_number.order_number}-${i.pro_name}提交成功`,
                          type: 'success'
                        })
                      })
                    })
                    .catch(error => {
                      this.$notify.error({
                        title: 'error',
                        message: `${i.order_number.order_number}-${i.pro_name} 提交失败,请刷新重录`,
                        duration: 0
                      })
                    })
                }
              })
              .catch(error => {
                this.$notify.error({
                  title: 'error',
                  message: '提交失败!请刷新重试'
                })
              })
          })
          //TODO:这里不会删除subtoken???
          promise.then(res => {
            console.log('123456')
            delSubtoken()
          })
        }
      }
    },
    // 删除明细
    handleDelete(index, row) {
      this.subPurchaseOrderData.splice(index, 1)
    }
  },
  watch: {},
  computed: {}
}
</script>

<style scoped>
.purchase-title {
  margin-bottom: 10px;
  text-align: center;
}
</style>
