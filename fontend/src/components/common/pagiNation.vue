<template>
  <div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      @prev-click="handleprevious"
      @next-click="handlenext"
      :current-page="currentPage"
      :page-sizes="[10, 50, 100, 200]"
      :page-size="page_size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="getDataTotal"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: 'pagiNation',
  data() {
    return {
      page_size: 10,
      currentPage: 1
    }
  },
  props: {
    getDataTotal: {
      type: Number,
      default: 0
    }
  },
  methods: {
    handleSizeChange(page_size) {
      this.$emit('pagination', { page: 1, page_size: page_size })
    },
    //选择页码
    handleCurrentChange(page) {
      this.$emit('pagination', { page: page, page_size: this.page_size })
    },
    //上一页
    handleprevious(page) {
      this.$emit('pagination', { page: page, page_size: this.page_size })
    },
    //下一页
    handlenext(page) {
      this.$emit('pagination', { page: page, page_size: this.page_size })
    }
  }
}
</script>

<style scoped>
</style>