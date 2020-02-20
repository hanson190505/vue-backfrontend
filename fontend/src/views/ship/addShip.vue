<template>
  <div>
    <el-dialog
      :visible.sync="addshipDisplay"
      width="90%"
      :before-close="handleClose"
    >
      <h3 class="purchase-title">出 货 单</h3>
      <hr />
      <el-form :model="addShipData" ref="addShipData" label-width="80px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="出货单号">
              <el-input
                v-model="addShipData.ship_number"
                placeholder="请输入单号"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="出货方式">
              <el-select
                v-model="addShipData.ship_plan"
                filterable
                placeholder="请选择"
              >
                <el-option
                  v-for="item in shipType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="货运公司">
              <el-select
                v-model="addShipData.ship_customer"
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
            <el-form-item label="出货日期">
              <el-date-picker
                v-model="addShipData.ship_date"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="重量(kg)">
              <el-input v-model="addShipData.ship_weight"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="费用(¥)">
              <el-input v-model="addShipData.ship_cost"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="目的地"></el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="备注">
              <el-input
                v-model="addShipData.text"
                placeholder="选填"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-button type="primary" @click="addShipDetail">新增明细</el-button>
      <el-table
        :data="shipDetailData"
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
        <el-table-column label="产品尺寸" width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.pro_size }}</span>
          </template>
        </el-table-column>
        <el-table-column label="产品颜色" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.pro_color }}</span>
          </template>
        </el-table-column>
        <el-table-column label="产品包装" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.pro_pack }}</span>
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
        <el-table-column label="产品重量(kg)" width="100">
          <template slot-scope="scope">
            <span>
              {{ (scope.row.pro_weight * 1 * scope.row.pro_qt) / 1000 }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="出货重量(kg)" width="120">
          <template slot-scope="scope">
            <el-input v-model="scope.row.ship_weight"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="出货费用(¥)" width="100" prop="ship_cost">
          <template slot-scope="scope">
            <span>{{ scope.row.ship_cost }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="60" align="center">
          <template slot-scope="scope">
            <el-button
              @click="handleDelete(scope.$index, scope.row)"
              type="text"
              size="mini"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-button type="primary" @click="submitShipData">保 存</el-button>

      <el-dialog
        :visible.sync="subdialogVisable"
        width="99%"
        :append-to-body="true"
      >
        <suborder-detail
          @getSelectSuborder="getSelectSuborder"
        ></suborder-detail>
        <!-- <suborder-detail></suborder-detail> -->
        <span slot="footer">
          <el-button @click="subdialogVisable = false">确 定</el-button>
        </span>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
import suborderDetail from '@/views/order/suborderdetail'
import { getSubToken, delSubtoken } from '@/api/token'
import { getCustomer } from '@/api/customer'
import { postShipOrder, postShipDetail } from '@/api/ship'
import { patchSubOrder, patchOrder } from '@/api/order'
export default {
  name: 'addShip',
  components: {
    suborderDetail
  },
  data() {
    return {
      //出货单显示控制
      addshipDisplay: false,
      customerData: [],
      addShipData: {},
      //订单明细显示控制
      subdialogVisable: false,
      shipDetailData: [],
      subOrderData: [],
      //出货费用指数
      pre_ship: 0.0,
      shipType: [
        { value: 1, label: 'UPS' },
        { value: 2, label: 'FedEx' },
        { value: 3, label: 'DHL' },
        { value: 4, label: '国内快递' },
        { value: 5, label: '船运' },
        { value: 6, label: '自提' },
        { value: 7, label: '第三方' },
        { value: 8, label: '其他' }
      ]
    }
  },
  methods: {
    addNewship() {
      this.addshipDisplay = true
      getSubToken()
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
      this.shipDetailData = selectSuborder
      // console.log(this.shipDetailData)
    },
    //新增出货明细
    addShipDetail() {
      if (!this.addShipData.ship_weight || !this.addShipData.ship_cost) {
        this.$message.error('请完整填写出货信息')
      } else {
        this.pre_ship =
          (this.addShipData.ship_cost * 1) / this.addShipData.ship_weight
        this.subdialogVisable = true
      }
    },
    //合计采购金额
    subAmount(row) {
      console.log(row)
      row.purchase_amount = row.purchase_qt * row.purchase_price
    },
    submitShipData() {
      if (!window.sessionStorage.getItem('subtoken')) {
        this.$message.error('请勿重复提交,或刷新重试')
      } else {
        let promise = new Promise((resolve, reject) => {
          postShipOrder(this.addShipData)
            .then(res => {
              let shipOrderId = res.data.id
              for (const i of this.shipDetailData) {
                i.ship_number = shipOrderId
                i.ship_cost = (i.ship_weight * this.pre_ship).toFixed(2) * 1
                i.sub_order = i.id
                postShipDetail(i).then(res => {
                  patchSubOrder(i.id, '', { is_ship: 1 })
                    .then(res => {
                      // patchOrder(i.order_number, '', { is_done: 1 })
                      this.$notify({
                        title: 'succsess',
                        message: `${i.order_number.order_number} 提交成功`,
                        type: 'success'
                      })
                    })
                    .catch(error => {
                      this.$notify.error({
                        title: 'error',
                        message: `${i.order_number.order_number} 提交失败,请刷新重录`,
                        duration: 0
                      })
                    })
                })
              }
              resolve(res)
            })
            .catch(error => {
              this.$notify.error({
                title: 'error',
                message: '提交失败!请刷新重试'
              })
            })
        })
        promise.then(res => {
          delSubtoken()
        })
      }
    },
    // 删除明细
    handleDelete(index, row) {
      this.shipDetailData.splice(index, 1)
    }
  },
  watch: {},
  computed: {}
}
</script>

<style scoped></style>
