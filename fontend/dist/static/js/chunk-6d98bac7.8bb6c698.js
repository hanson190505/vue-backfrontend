(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6d98bac7"],{"4ffb":function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[r("el-breadcrumb-item",{attrs:{to:{path:"/home"}}},[e._v("首页")]),r("el-breadcrumb-item",{attrs:{to:{path:"/purchases"}}},[e._v("采购列表")]),r("el-breadcrumb-item",[e._v("采购明细")]),r("backend-searchVue",{on:{parentMethod:e.pagination}})],1),r("el-table",{staticStyle:{width:"99.9%"},attrs:{data:e.subPurchaseOrderData,"show-summary":"","highlight-current-row":"","span-method":e.objectSpanMethod}},[r("el-table-column",{attrs:{label:"采购单号",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("span",[e._v(e._s(t.row.purchase_number.purchase_number))])]}}])}),r("el-table-column",{attrs:{label:"供应商",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("span",[e._v(e._s(t.row.purchase_number.purchaser.lite_name))])]}}])}),r("el-table-column",{attrs:{label:"采购日期",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("span",[e._v(e._s(t.row.purchase_number.purchase_date))])]}}])}),r("el-table-column",{attrs:{label:"采购交期",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("span",[e._v(e._s(t.row.purchase_number.deliver_date))])]}}])}),r("el-table-column",{attrs:{label:"订单编号",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("span",[e._v(e._s(t.row.sub_order.order_number.order_number))])]}}])}),r("el-table-column",{attrs:{label:"产品名称",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("span",[e._v(e._s(t.row.sub_order.pro_name))])]}}])}),r("el-table-column",{attrs:{label:"产品描述",width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("span",[e._v(e._s(t.row.sub_order.pro_desc))])]}}])}),r("el-table-column",{attrs:{label:"订单数量",width:"90"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("span",[e._v(e._s(t.row.sub_order.pro_qt))])]}}])}),r("el-table-column",{attrs:{label:"产品单价($)",width:"90"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("span",[e._v(e._s(t.row.sub_order.pro_price))])]}}])}),r("el-table-column",{attrs:{label:"订单金额($)",width:"90",prop:"sub_amount"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("span",[e._v(e._s(t.row.sub_order.sub_amount))])]}}])}),r("el-table-column",{attrs:{label:"采购数量",width:"90"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("span",{style:e.markData(t.row)},[e._v(e._s(t.row.purchase_qt))])]}}])}),r("el-table-column",{attrs:{label:"采购单价($)",width:"90"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("span",[e._v(e._s(t.row.purchase_price))])]}}])}),r("el-table-column",{attrs:{label:"采购金额($)",width:"100",prop:"purchase_amount"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("span",[e._v(e._s(t.row.purchase_amount))])]}}])}),r("el-table-column",{attrs:{label:"备注",width:"140"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("span",[e._v(e._s(t.row.text))])]}}])}),r("el-table-column",{attrs:{label:"操作",fixed:"right",width:"60",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("el-button",{attrs:{type:"text",size:"mini"},on:{click:function(r){return e.checkPurchaseDetail(t.row)}}},[e._v("查看")])]}}])})],1),r("add-purchase",{ref:"addpurchase"}),r("pagi-nation",{attrs:{getDataTotal:e.purchaseDetail.count},on:{pagination:e.pagination}})],1)},n=[],o=(r("a4d3"),r("4de4"),r("4160"),r("e439"),r("dbb4"),r("b64b"),r("159b"),r("ade3")),u=r("2f62"),s=r("d2c0"),c=r("b59b"),l=r("8175");function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function p(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){Object(o["a"])(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var d={name:"purchaseDetail",components:{pagiNation:s["a"],backendSearchVue:c["a"],"add-purchase":l["a"]},data:function(){return{subPurchaseOrderData:[],subOrderData:[],dataTotal:0}},computed:p({},Object(u["b"])(["purchaseDetail"])),methods:{pagination:function(e){var t=this;e||(e={page:1,page_size:10}),this.$store.dispatch("purchaseStore/setPurchaseDetailData",e).then((function(e){t.subPurchaseOrderData=t.$store.getters.purchaseDetail.results}))},addRow:function(){},checkPurchaseDetail:function(e){this.$refs.addpurchase.purchaseDetaiCheck(e)},markData:function(e){if(e.purchase_qt>e.sub_order.pro_qt)return{color:"#c21010"}},objectSpanMethod:function(e){e.row,e.column;var t=e.rowIndex,r=e.columnIndex;if(0===r)return t%2===0?{rowspan:2,colspan:1}:{rowspan:0,colspan:0}}},created:function(){this.pagination({page:1,page_size:10})}},b=d,f=r("2877"),h=Object(f["a"])(b,a,n,!1,null,"f30d0cb0",null);t["default"]=h.exports},ade3:function(e,t,r){"use strict";function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}r.d(t,"a",(function(){return a}))},dbb4:function(e,t,r){var a=r("23e7"),n=r("83ab"),o=r("56ef"),u=r("fc6a"),s=r("06cf"),c=r("8418");a({target:"Object",stat:!0,sham:!n},{getOwnPropertyDescriptors:function(e){var t,r,a=u(e),n=s.f,l=o(a),i={},p=0;while(l.length>p)r=n(a,t=l[p++]),void 0!==r&&c(i,t,r);return i}})},e439:function(e,t,r){var a=r("23e7"),n=r("d039"),o=r("fc6a"),u=r("06cf").f,s=r("83ab"),c=n((function(){u(1)})),l=!s||c;a({target:"Object",stat:!0,forced:l,sham:!s},{getOwnPropertyDescriptor:function(e,t){return u(o(e),t)}})}}]);
//# sourceMappingURL=chunk-6d98bac7.8bb6c698.js.map