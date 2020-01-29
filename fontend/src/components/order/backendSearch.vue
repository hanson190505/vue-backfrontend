<template>
  <div>
    <el-autocomplete
      v-model="state"
      :fetch-suggestions="querySearchAsync"
      placeholder="请输入内容"
      @select="handleSelect"
      clearable
      @clear="handleSearchClear"
    ></el-autocomplete>
  </div>
</template>

<script>
import { getSubOrderList } from '@/api/order'
export default {
  name: 'backendSearch',
  data() {
    return {
      searchData: [],
      state: ''
    }
  },
  methods: {
    //queryString 为在框中输入的值
    //callback 回调函数,将处理好的数据推回
    querySearchAsync(queryString = '', callback) {
      var list = [{}]
      console.log(queryString)
      getSubOrderList({ param: queryString })
        .then(res => {
          //在这里为这个数组中每一个对象加一个value字段, 因为autocomplete只识别value字段并在下拉列中显示
          let data = res.data.results
          for (let i of data) {
            i.value = i.order_number.order_number //将想要展示的数据作为value
          }
          list = data
          callback(list)
        })
        .catch(error => {
          console.log(error)
        })
    },
    //选择搜索下拉框内容后的事件
    handleSelect(item) {
      this.$emit('getSearchSuborder', [item])
    },
    //清空搜索框后的事件
    handleSearchClear() {
      this.$emit('parentMethod')
    }
  }
}
</script>

<style scoped></style>
