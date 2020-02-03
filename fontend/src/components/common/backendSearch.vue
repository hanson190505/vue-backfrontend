<template>
  <div>
    <el-autocomplete
      v-model="state"
      :fetch-suggestions="queryAsync"
      placeholder="请输入关键字..."
      clearable
      @clear="handleSearchClear"
    ></el-autocomplete>
  </div>
</template>

<script>
export default {
  name: 'backendSearch',
  data() {
    return {
      state: '',
      timeout: null
    }
  },
  methods: {
    queryAsync(queryString, callback) {
      //方法接收两个参数，
      //一个是queryString接收用户输入的值，也就是用户输入的内容，callback是回调函数，处理请求回来的参数
      let params = {
        param: queryString
      }
      // let params 定义向后台传的参数，text是和后台商量好的字段，/接口地址/？text=queryString
      if (queryString === '') {
        this.$emit('parentMethod')
      } else {
        // setTimeout(() => {
        //   }, 500)
        this.$emit('parentMethod', params)
      }
    },
    //清空搜索框后的事件
    handleSearchClear() {
      this.$emit('parentMethod')
    }
  }
}
</script>

<style scoped></style>
