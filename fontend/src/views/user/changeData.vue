<template>
  <div>
    <el-dialog
      :visible.sync="displayed"
      width="40%"
      :before-close="handleClose"
    >
      <el-form :model="userData" ref="form" label-width="80px">
        <el-form-item label="用户名">
          <span>{{ userData.u_name }}</span>
        </el-form-item>
        <!-- <el-form-item label="密 码">
          <el-input v-model="userData.u_password"></el-input>
          <el-button type="primary" @click="randomPassword">生成密码</el-button>
        </el-form-item> -->
        <el-form-item label="角 色">
          <el-select v-model="userData.permissions" placeholder>
            <el-option
              v-for="item in permissionsOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状 态">
          <el-select v-model="userData.is_use" placeholder>
            <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提 交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { patchUser } from '@/api/user'
export default {
  name: 'changeData',
  data() {
    return {
      displayed: false,
      userData: {},
      permissionsOptions: [
        { value: 1, label: '超级管理员' },
        { value: 2, label: '总经理' },
        { value: 3, label: '业务经理' },
        { value: 4, label: '业务' },
        { value: 5, label: '采购经理' },
        { value: 6, label: '采购' },
        { value: 7, label: '货运经理' },
        { value: 8, label: '货运' },
        { value: 9, label: '财务经理' },
        { value: 10, label: '财务' },
        { value: 0, label: '未分配' }
      ],
      statusOptions: [
        { value: 0, label: '禁用' },
        { value: 1, label: '可用' }
      ]
    }
  },
  methods: {
    // randomPassword() {
    //   this.userData.u_password
    // },
    handleChange(row) {
      this.displayed = true
      this.userData = row
    },
    onSubmit() {
      patchUser(this.userData.id, this.userData)
        .then(res => {
          this.$message.success('修改成功')
        })
        .catch(error => {
          this.$message.warning('修改失败')
        })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    }
  }
}
</script>

<style lang="scss" scoped></style>
