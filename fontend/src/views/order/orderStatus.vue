<template>
  <div>
    <el-select
      v-model="value"
      clearable
      placeholder="请选择"
      @change="handleFilter"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'orderStatus',
  data() {
    return {
      value: '',
      options: [
        { value: 'purchase', label: '待采购' },
        { value: 'ship', label: '待出货' },
        { value: 'acount', label: '待结算' },
        { value: 'done', label: '已完成' }
      ]
    }
  },
  methods: {
    handleFilter(val) {
      if (val === '') {
        this.$emit('handleFilter')
      } else {
        this.$emit('handleFilter', { val })
      }
    }
  }
}
</script>

<style scoped></style>
