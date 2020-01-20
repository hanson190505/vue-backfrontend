<template>
  <div class="orderdetail">
    <el-card>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/orders' }">订单管理</el-breadcrumb-item>
        <el-breadcrumb-item>订单明细</el-breadcrumb-item>
      </el-breadcrumb>
      <el-form
        ref="form"
        :model="orderdetail"
        label-width="80px"
        size="mini"
        inline-message
        :disabled="formdisabl"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="订单编号" prop="order_number">
              <el-input v-model="orderdetail.order_number"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="客户名称" :disabled="(formdisabl = true)">
              <el-select
                v-model="orderdetail.customer"
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
              <!-- <el-input v-model="orderdetail.order_date"></el-input> -->
              <el-date-picker
                v-model="orderdetail.order_date"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="订单交期">
              <!-- <el-input v-model="orderdetail.deliver_date"></el-input> -->
              <el-date-picker
                v-model="orderdetail.deliver_date"
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
              <el-input v-model="orderdetail.ex_rate"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="金额">
              <el-input v-model="orderdetail.order_amount"></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="8">
            <el-form-item label="完成状态">
              <el-switch
                v-model="orderdetail.is_done"
                active-color="#13ce66"
                inactive-color="#ff4949"
              ></el-switch>
            </el-form-item>
          </el-col>-->
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="出货地址">
              <el-input v-model="orderdetail.ship_addr"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注">
              <el-input v-model="orderdetail.text"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-button size="mini" type="primary" @click="addSubOrder()"
        >订单明细</el-button
        >-->
        <el-table :data="suborderdetail" style="width: 99.9%">
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
    </el-card>
  </div>
</template>

<script>
import { request } from '../../network/rquest'
export default {
  name: 'OrderDetail',
  data() {
    return {
      formdisabl: true,
      orderdetail: this.$store.state.orderdetail,
      suborderdetail: this.$store.state.suborderdetail,
      customerData: [],
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
      ]
    }
  },
  methods: {
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
    },
    //订单明细合计
    subAmount(row) {
      row.sub_amount = row.pro_price * row.pro_qt * 1
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
        order_number: this.orderdetail.order_number,
        sub_ex_rate: this.orderdetail.ex_rate,
        sub_amount: 0,
        status: 1
      }
      this.subOrderData.push(newValue)
    },
    //编辑订单明细
    editSubOrderRow(row) {
      row.status = 1
    },
    //删除订单明细
    delSubOrderRow(index, row) {
      //TODO:delete suborderrow
    }
  },
  created() {
    //在页面加载时读取sessionStorage里的状态信息
  }
}
</script>

<style lang="less" scoped></style>
