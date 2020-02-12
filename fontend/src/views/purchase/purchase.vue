<template>
  <div>
    <purchase-header></purchase-header>
    <!-- <add-purchaseorder></add-purchaseorder> -->
    <purchase-order></purchase-order>
    <!-- <purchase-detail></purchase-detail> -->
  </div>
</template>

<script>
// import { getPurchaseOrder } from '../../api/purchase'
import purchaseHeader from './purchaseHeader'
// import addPurchaseorder from './addPurchaseorder'
import purchaseOrder from './purchaseOrder'
// import purchaseDetail from './purchaseDetail'
export default {
  data() {
    return {
      // purchaseOrderData: this.$store.getters.purchaseData
      // loading: true
    }
  },
  components: {
    purchaseHeader,
    // addPurchaseorder,
    purchaseOrder
    // purchaseDetail
  },
  methods: {},
  computed: {},
  created() {
    this.$store.dispatch('purchaseStore/setPurchaseDetailData').then(res => {
      // this.subPurchaseOrderData = this.$store.getters.purchaseDetail
    })
  }
}
</script>

<style scoped></style>
