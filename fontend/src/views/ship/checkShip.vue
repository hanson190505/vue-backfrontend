<template>
  <div>
    <el-dialog
      :visible.sync="checkshipDisplay"
      width="90%"
      :before-close="handleClose"
    >
      <h3 class="purchase-title">出 货 单</h3>
      <hr />
      <el-form :model="shipOrderData" ref="shipOrderData" label-width="80px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="出货单号">
              <el-input
                v-model="shipOrderData.ship_number"
                placeholder="请输入单号"
                :disabled="shipOrderChange"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="出货方式">
              <el-select
                v-model="shipOrderData.ship_plan"
                filterable
                placeholder="请选择"
                :disabled="shipOrderChange"
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
                v-model="shipOrderData.ship_customer"
                filterable
                placeholder="请选择"
                @visible-change="selectTest"
                :disabled="shipOrderChange"
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
                v-model="shipOrderData.ship_date"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
                :disabled="shipOrderChange"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="重量(kg)">
              <el-input
                v-model="shipOrderData.ship_weight"
                :disabled="shipOrderChange"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="费用(¥)">
              <el-input
                v-model="shipOrderData.ship_cost"
                :disabled="shipOrderChange"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="备注">
              <el-input
                type="textarea"
                v-model="shipOrderData.text"
                placeholder="选填"
                :disabled="shipOrderChange"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-button type="primary" @click="changeShipOrder">修改出货</el-button>
      <el-button type="primary" @click="addShipDetail">新增明细</el-button>
      <el-table
        :data="shipDetailData"
        style="width: 99.9%"
        show-summary
        highlight-current-row
      >
        <el-table-column label="订单编号" width="140" fixed>
          <template slot-scope="scope">
            <span>{{ scope.row.sub_order.order_number.order_number }}</span>
          </template>
        </el-table-column>
        <el-table-column label="产品名称" width="120" fixed>
          <template slot-scope="scope">
            <span>{{ scope.row.sub_order.pro_name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="产品尺寸" width="120" fixed>
          <template slot-scope="scope">
            <span>{{ scope.row.sub_order.pro_size }}</span>
          </template>
        </el-table-column>
        <el-table-column label="产品颜色" width="120" fixed>
          <template slot-scope="scope">
            <span>{{ scope.row.sub_order.pro_color }}</span>
          </template>
        </el-table-column>
        <el-table-column label="产品包装" width="100" fixed>
          <template slot-scope="scope">
            <span>{{ scope.row.sub_order.pro_pack }}</span>
          </template>
        </el-table-column>
        <el-table-column label="产品描述" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.sub_order.pro_desc }}</span>
          </template>
        </el-table-column>
        <el-table-column label="订单数量" width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.sub_order.pro_qt }}</span>
          </template>
        </el-table-column>
        <el-table-column label="产品重量(kg)" width="100">
          <template slot-scope="scope">
            <span>{{
              (scope.row.sub_order.pro_weight *
                1 *
                scope.row.sub_order.pro_qt) /
                1000
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="出货重量(kg)" width="120" prop="ship_weight">
          <template slot-scope="scope">
            <el-input v-model="scope.row.ship_weight"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="出货费用(¥)" width="100" prop="ship_cost">
          <template slot-scope="scope">
            <span>{{ (scope.row.ship_weight * pre_ship).toFixed(2) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120" align="center">
          <template slot-scope="scope">
            <!-- <el-button @click="changeShipDetail(scope.row)" type="text" size="mini">修改</el-button> -->
            <el-button
              @click="handleDelete(scope.$index, scope.row)"
              type="text"
              size="mini"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-button type="primary" @click="submitShipData">提 交</el-button>
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
          <el-button @click="handleSelectSuborder">确 定</el-button>
        </span>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
import suborderDetail from '@/views/order/suborderdetail'
import { getSubToken, delSubtoken } from '@/api/token'
import { getCustomer } from '@/api/customer'
import {
  postShipOrder,
  postShipDetail,
  patchShipDetail,
  patchShipOrder,
  getShipOrderPK,
  getShipDetail
} from '@/api/ship'
import { patchSubOrder } from '@/api/order'
export default {
  name: 'addShip',
  components: {
    suborderDetail
  },
  data() {
    return {
      //出货单显示控制
      shipOrderChange: true,
      checkshipDisplay: false,
      customerData: [],
      shipOrderData: {},
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
    //修改出货
    changeShipOrder() {
      this.shipOrderChange = false
      getSubToken()
    },
    //修改出货明细
    // rowChange(row) {
    //   //通过动态添加属性来返回布尔值,确定是否能修改
    //   if (row.change) {
    //     return false
    //   } else {
    //     return true
    //   }
    // },
    // changeShipDetail(row) {
    //   //通过动态增加属性
    //   row.change = 1
    // },
    checkShip(pk) {
      this.checkshipDisplay = true
      getShipOrderPK(pk).then(res => {
        this.shipOrderData = res.data
        this.pre_ship = res.data.ship_cost / res.data.ship_weight
        getShipDetail({ ship_number: pk }).then(res => {
          this.shipDetailData = res.data
        })
      })
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
    //选择订单明细
    getSelectSuborder(row) {
      // row.forEach(el => {
      //   this.shipDetailData.push({ sub_order: el })
      // })
      this.subOrderData = row
      // console.log(this.shipDetailData)
    },
    //处理选中的订单明细
    handleSelectSuborder() {
      this.subdialogVisable = false
      this.subOrderData.forEach(el => {
        this.shipDetailData.push({ sub_order: el })
      })
    },
    //新增出货明细
    addShipDetail() {
      if (!this.shipOrderData.ship_weight || !this.shipOrderData.ship_cost) {
        this.$message.error('请完整填写出货信息')
      } else {
        this.pre_ship =
          (this.shipOrderData.ship_cost * 1) / this.shipOrderData.ship_weight
        this.subdialogVisable = true
      }
    },
    submitShipData() {
      this.pre_ship =
        this.shipOrderData.ship_cost / this.shipOrderData.ship_weight
      if (!window.sessionStorage.getItem('subtoken')) {
        this.$message.error('请勿重复提交,或刷新重试')
      } else {
        let promise = new Promise((resolve, reject) => {
          patchShipOrder(this.shipOrderData.id, this.shipOrderData)
            .then(res => {
              let shipOrderId = res.data.id
              for (const i of this.shipDetailData) {
                i.ship_cost = (i.ship_weight * this.pre_ship).toFixed(2) * 1
                if (!i.id) {
                  i.ship_number = shipOrderId
                  i.sub_order = i.id
                  postShipDetail(i).then(res => {
                    patchSubOrder(i.id, '', { is_ship: 0 })
                      .then(res => {
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
                } else {
                  patchShipDetail(i.id, i)
                    .then(res => {
                      this.$notify({
                        title: 'succsess',
                        message: `${i.sub_order.order_number} 修改成功`,
                        type: 'success'
                      })
                    })
                    .catch(error => {
                      this.$notify.error({
                        title: 'error',
                        message: `${i.sub_order.order_number} 修改失败,请刷新重录`,
                        duration: 0
                      })
                    })
                }
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
          console.log('123456')
          delSubtoken()
        })
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
            this.shipDetailData.splice(index, 1)
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
            this.shipDetailData.splice(index, 1)
            patchShipDetail(row.id, { is_delete: 1 }).then(res => {
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
  computed: {},
  created() {}
}
</script>

<style scoped></style>
