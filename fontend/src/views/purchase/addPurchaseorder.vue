<template>
  <div>
    <el-dialog :visible.sync="dialogVisible" width="90%" :before-close="handleClose">
      <h3 class="purchase-title">采 购 单</h3>
      <hr />
      <el-form :model="addPurchaseData" ref="addPurchaseData" label-width="80px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="采购单号:">
              <el-input v-model="addPurchaseData.purchase_number" v-show="purchaserShow"></el-input>
              <span v-show="!purchaserShow">
                {{
                addPurchaseData.purchase_number
                }}
              </span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="供应商:">
              <el-select
                v-model="addPurchaseData.purchaser"
                filterable
                placeholder="请选择"
                @visible-change="selectTest"
                v-show="purchaserShow"
              >
                <el-option
                  v-for="item in customerData"
                  :key="item.lite_name"
                  :label="item.lite_name"
                  :value="item.lite_name"
                ></el-option>
              </el-select>
              <span v-show="!purchaserShow">{{ purchaser }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="采购日期:">
              <el-date-picker
                v-model="addPurchaseData.purchase_date"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="采购交期:">
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
            <el-form-item label="备注:">
              <el-input type="textarea" :rows="2" v-model="addPurchaseData.text" placeholder="选填"></el-input>
            </el-form-item>
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
        <el-table-column label="订单编号" width="140" fixed>
          <template slot-scope="scope">
            <span>{{ scope.row.order_number.order_number }}</span>
          </template>
        </el-table-column>
        <el-table-column label="产品名称" width="100" fixed>
          <template slot-scope="scope">
            <span>{{ scope.row.pro_name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="产品尺寸" width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.pro_size }}</span>
          </template>
        </el-table-column>
        <el-table-column label="产品颜色" width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.pro_color }}</span>
          </template>
        </el-table-column>
        <el-table-column label="产品包装" width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.pro_pack }}</span>
          </template>
        </el-table-column>
        <el-table-column label="产品描述" width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.pro_desc }}</span>
          </template>
        </el-table-column>
        <el-table-column label="订单数量" width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.pro_qt | toThousandFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column label="产品单价($)" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.pro_price }}</span>
          </template>
        </el-table-column>
        <el-table-column label="产品重量(g)" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.pro_weight }}</span>
          </template>
        </el-table-column>
        <el-table-column label="订单金额($)" width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.sub_amount | toThousandFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column label="采购数量" width="120">
          <template slot-scope="scope">
            <el-input v-model="scope.row.purchase_qt"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="采购单价(¥)" width="100">
          <template slot-scope="scope">
            <el-input v-model="scope.row.purchase_price" @blur="subAmount(scope.row)"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="采购金额(¥)" width="120" prop="purchase_amount">
          <template slot-scope="scope">
            <el-input v-model="scope.row.purchase_amount"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="采购毛利(¥)" width="100" prop="profit_rmb">
          <template slot-scope="scope">
            <span>{{ scope.row.profit_rmb | toThousandFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column label="采购毛利($)" width="100" prop="profit_usd">
          <template slot-scope="scope">
            <span>{{ scope.row.profit_usd | toThousandFilter }}</span>
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
          <el-button @click="addNewPurchaseDetail">确 定</el-button>
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
import {
  postPurchaseDetail,
  getPurchaseDetail,
  patchPurchase,
  patchPurchaseDetail
} from '@/api/purchase'
import suborderDetail from '../order/suborderdetail'
// import purchaseDetail from './purchaseDetail'
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
      subOrderData: [],
      purchaserShow: true,
      purchaser: '',
      isAdd: true
      //传递给订单明细表,控制显示参数
    }
  },
  methods: {
    //从采购明细打开
    purchaseDetaiCheck(row) {
      this.dialogVisible = true
      this.purchaserShow = false
      this.isAdd = false
      this.addPurchaseData = row.purchase_number
      this.purchaser = row.purchase_number.purchaser.lite_name
      this.getPurchaseDetaiData({
        purchase_number: row.purchase_number.purchase_number
      })
    },
    //获取查看采购时的采购单号
    getPurchaseNumber(row) {
      this.dialogVisible = true
      this.purchaserShow = false
      this.isAdd = false
      this.addPurchaseData = row
      this.purchaser = row.purchaser.lite_name
      this.getPurchaseDetaiData({ purchase_number: row.purchase_number })
    },
    //通过采购单号获取采购明细
    getPurchaseDetaiData(num) {
      getPurchaseDetail(num).then(res => {
        res.data.forEach(el => {
          this.subPurchaseOrderData.push({
            order_number: el.sub_order.order_number,
            pro_name: el.sub_order.pro_name,
            pro_size: el.sub_order.pro_size,
            pro_color: el.sub_order.pro_color,
            pro_pack: el.sub_order.pro_pack,
            pro_desc: el.sub_order.pro_desc,
            pro_qt: el.sub_order.pro_qt,
            pro_price: el.sub_order.pro_price,
            pro_weight: el.sub_order.pro_weight,
            sub_amount: el.sub_order.sub_amount,
            purchase_qt: el.purchase_qt,
            purchase_price: el.purchase_price,
            purchase_amount: el.purchase_amount,
            profit_rmb: (
              el.sub_order.sub_amount * el.sub_order.order_number.ex_rate -
              el.purchase_amount
            ).toFixed(2),
            profit_usd: (
              el.sub_order.sub_amount -
              el.purchase_amount / el.sub_order.order_number.ex_rate
            ).toFixed(2),
            text: el.text,
            id: el.id
          })
        })
      })
    },
    //新增采购按钮
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
          ;(this.addPurchaseData = {}),
            (this.subPurchaseOrderData = []),
            (this.subOrderData = []),
            done()
        })
        .catch(_ => {})
    },
    //新增采购明细按钮
    addPurchaseDetail() {
      this.subdialogVisable = true
      getSubToken()
    },
    //选择订单明细
    getSelectSuborder(selectSuborder) {
      this.subOrderData = selectSuborder
    },
    //选择订单明细后,确定新增采购明细
    addNewPurchaseDetail() {
      this.subdialogVisable = false
      this.subOrderData.forEach(el => {
        this.subPurchaseOrderData.push({
          order_number: el.order_number,
          pro_name: el.pro_name,
          pro_size: el.pro_size,
          pro_color: el.pro_color,
          pro_pack: el.pro_pack,
          pro_desc: el.pro_desc,
          pro_qt: el.pro_qt,
          pro_price: el.pro_price,
          pro_weight: el.pro_weight,
          sub_amount: el.sub_amount,
          purchase_qt: el.pro_qt,
          purchase_price: '',
          purchase_amount: '',
          profit_rmb: '',
          profit_usd: '',
          text: '选填',
          status: 1,
          id: el.id
        })
      })
    },
    //合计采购金额
    subAmount(row) {
      row.purchase_amount = row.purchase_qt * row.purchase_price * 1
      row.profit_rmb = (
        row.sub_amount * row.order_number.ex_rate -
        row.purchase_amount
      ).toFixed(2)
      row.profit_usd = (
        row.sub_amount -
        row.purchase_amount / row.order_number.ex_rate
      ).toFixed(2)
    },
    //保存
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
            if (!this.isAdd) {
              patchPurchase(
                this.addPurchaseData.purchase_number,
                this.addPurchaseData
              ).then(res => {
                for (const i of this.subPurchaseOrderData) {
                  if (!i.status) {
                    patchPurchaseDetail(i.id, i).then(res => {
                      this.$notify({
                        title: 'succsess',
                        message: `${i.order_number.order_number}-${i.pro_name}修改成功`,
                        type: 'success'
                      })
                    })
                  } else {
                    i.purchase_number = this.addPurchaseData.purchase_number
                    i.sub_order = i.id
                    postPurchaseDetail(i)
                      .then(res => {
                        patchSubOrder(i.id, '', { is_purchase: 0 }).then(
                          res => {
                            this.$notify({
                              title: 'succsess',
                              message: `${i.order_number.order_number}-${i.pro_name}提交成功`,
                              type: 'success'
                            })
                          }
                        )
                      })
                      .catch(error => {
                        this.$notify.error({
                          title: 'error',
                          message: `${i.order_number.order_number}-${i.pro_name} 提交失败,请刷新重录`,
                          duration: 0
                        })
                      })
                  }
                }
              })
            } else {
              //TODO:新增采购之后调用这个方法不能更新采购单分页的合计数量
              this.$store
                .dispatch(
                  'purchaseStore/addPurchaseOrder',
                  this.addPurchaseData
                )
                .then(res => {
                  resolve(res)
                  for (const i of this.subPurchaseOrderData) {
                    i.purchase_number = this.addPurchaseData.purchase_number
                    i.sub_order = i.id
                    postPurchaseDetail(i)
                      .then(res => {
                        patchSubOrder(i.id, '', { is_purchase: 1 }).then(
                          res => {
                            this.$notify({
                              title: 'succsess',
                              message: `${i.order_number.order_number}-${i.pro_name}提交成功`,
                              type: 'success'
                            })
                          }
                        )
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
            }
          })
          //TODO:这里不会删除subtoken???
          promise.then(res => {
            delSubtoken()
          })
        }
      }
    },
    // 删除明细
    handleDelete(index, row) {
      if (!row.hasOwnProperty('id')) {
        this.$confirm('数据未保存,确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.subPurchaseOrderData.splice(index, 1)
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
      } else {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.subPurchaseOrderData.splice(index, 1)
            patchPurchaseDetail(row.id, { is_delete: 1 }).then(res => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
            })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
      }
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
