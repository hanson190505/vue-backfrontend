const getters = {
    purchaseData: state => state.purchaseStore.purchaseData,
    purchaseDetail: state => state.purchaseStore.purchaseDetailData,
    shipOrderData: state => state.shipStore.shipOrderData,
    shipDetailData: state => state.shipStore.shipDetailData,
    name: state => state.userInfo.name,
    token: state => state.userInfo.token
}
export default getters