<template>
  <div>
    <date-search @dateSearchDate="dateSearchDate"></date-search>
    <pagi-nation @pagination="pagination" :getDataTotal="dataTotal"></pagi-nation>
  </div>
</template>

<script>
import pagiNation from '@/components/common/pagiNation'
import backendSearchVue from '@/components/common/backendSearch.vue'
import { getProducts } from '@/api/products'
export default {
  name: 'Products',
  components: {
    pagiNation,
    backendSearchVue
  },
  data() {
    return {
      productsData: []
    }
  },
  methods: {
    //日期搜索
    dateSearchDate(value) {
      if (!value) {
        this.pagination()
      } else {
        this.pagination({
          start_date: value[0],
          end_date: value[1],
          argument: 'date_search'
        })
      }
    },
    pagination(params) {
      //子组件backendSearch清空搜索条件时调用,设定page默认值为1
      if (!params) {
        params = { page: 1, page_size: 10 }
      }
      getProducts(params).then(res => {})
    }
  },
  created() {
    this.pagination()
  }
}
</script>

<style scoped></style>
