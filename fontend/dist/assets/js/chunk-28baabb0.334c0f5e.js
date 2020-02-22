(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-28baabb0"],{"129f":function(e,t){e.exports=Object.is||function(e,t){return e===t?0!==e||1/e===1/t:e!=e&&t!=t}},4672:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/home"}}},[e._v("首页")]),a("el-breadcrumb-item",{attrs:{to:{path:"/ships"}}},[e._v("出货管理")]),a("el-breadcrumb-item",[e._v("出货列表")])],1),a("el-row",[a("el-col",{attrs:{span:4}},[a("backend-searchVue",{on:{parentMethod:e.pagination}})],1),a("el-col",{attrs:{span:6}},[a("date-search",{on:{dateSearchDate:e.dateSearchDate}})],1)],1),a("el-table",{staticStyle:{width:"99.9%"},attrs:{data:this.$store.getters.shipDetailData.results,"show-summary":"",border:"","highlight-current-row":""}},[a("el-table-column",{attrs:{label:"出货单号",width:"140",fixed:""},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.ship_number.ship_number))])]}}])}),a("el-table-column",{attrs:{label:"出货日期",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.ship_number.ship_date))])]}}])}),a("el-table-column",{attrs:{label:"订单编号",width:"140"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.sub_order.order_number.order_number))])]}}])}),a("el-table-column",{attrs:{label:"产品名称",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.sub_order.pro_name))])]}}])}),a("el-table-column",{attrs:{label:"产品尺寸",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.sub_order.pro_size))])]}}])}),a("el-table-column",{attrs:{label:"产品颜色",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.sub_order.pro_color))])]}}])}),a("el-table-column",{attrs:{label:"产品包装",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.sub_order.pro_pack))])]}}])}),a("el-table-column",{attrs:{label:"产品描述",width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.sub_order.pro_desc))])]}}])}),a("el-table-column",{attrs:{label:"订单数量",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.sub_order.pro_qt))])]}}])}),a("el-table-column",{attrs:{label:"产品重量(kg)",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(1*t.row.sub_order.pro_weight*t.row.sub_order.pro_qt/1e3))])]}}])}),a("el-table-column",{attrs:{label:"出货重量(kg)",width:"120",prop:"ship_weight"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.ship_weight))])]}}])}),a("el-table-column",{attrs:{label:"出货费用(¥)",width:"100",prop:"ship_cost"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.ship_cost))])]}}])})],1),a("pagi-nation",{attrs:{getDataTotal:e.dataTotal},on:{pagination:e.pagination}})],1)},r=[],i=a("d2c0"),o=a("6681"),s=a("b59b"),l={name:"shipDetail",data:function(){return{loading:!0,dataTotal:0}},components:{pagiNation:i["a"],backendSearchVue:s["a"],dateSearch:o["a"]},methods:{dateSearchDate:function(e){e?this.pagination({start_date:e[0],end_date:e[1],argument:"date_search"}):this.pagination()},pagination:function(e){var t=this;e||(e={page:1,page_size:10}),this.$store.dispatch("shipStore/setShipDetailData",e).then((function(e){t.loading=!1,t.dataTotal=e.data.count}))},handleCurrentChange:function(){}},created:function(){this.pagination()}},c=l,u=a("2877"),d=Object(u["a"])(c,n,r,!1,null,"199373ec",null);t["default"]=d.exports},6681:function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-date-picker",{attrs:{type:"daterange",align:"right","unlink-panels":"","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","picker-options":e.pickerOptions,"value-format":"yyyy-MM-dd"},on:{change:function(t){return e.dateRangeChange(e.value)}},model:{value:e.value,callback:function(t){e.value=t},expression:"value"}})],1)},r=[],i={name:"dateSearch",data:function(){return{value:"",pickerOptions:{shortcuts:[{text:"最近一周",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-6048e5),e.$emit("pick",[a,t])}},{text:"最近一个月",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-2592e6),e.$emit("pick",[a,t])}},{text:"最近三个月",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-7776e6),e.$emit("pick",[a,t])}}]}}},methods:{dateRangeChange:function(e){this.$emit("dateSearchDate",e)}}},o=i,s=a("2877"),l=Object(s["a"])(o,n,r,!1,null,"57cc3ee9",null);t["a"]=l.exports},"841c":function(e,t,a){"use strict";var n=a("d784"),r=a("825a"),i=a("1d80"),o=a("129f"),s=a("14c3");n("search",1,(function(e,t,a){return[function(t){var a=i(this),n=void 0==t?void 0:t[e];return void 0!==n?n.call(t,a):new RegExp(t)[e](String(a))},function(e){var n=a(t,e,this);if(n.done)return n.value;var i=r(e),l=String(this),c=i.lastIndex;o(c,0)||(i.lastIndex=0);var u=s(i,l);return o(i.lastIndex,c)||(i.lastIndex=c),null===u?-1:u.index}]}))},b59b:function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-input",{attrs:{size:"mini",clearable:"",placeholder:"请输入关键字..."},on:{clear:e.handleSearchClear,input:e.handleInput},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.sendSearch(t)}},model:{value:e.search,callback:function(t){e.search=t},expression:"search"}},[a("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:e.sendSearch},slot:"append"})],1)],1)},r=[],i=(a("ac1f"),a("841c"),{name:"backendSearch",data:function(){return{search:""}},methods:{handleInput:function(){""===this.search&&this.$emit("parentMethod")},sendSearch:function(){var e=this.search;if(e){var t={param:e};this.$emit("parentMethod",t)}},handleSearchClear:function(){this.$emit("parentMethod")}}}),o=i,s=a("2877"),l=Object(s["a"])(o,n,r,!1,null,"01077c5a",null);t["a"]=l.exports},d2c0:function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-pagination",{attrs:{"current-page":e.currentPage,"page-sizes":[10,50,100,200],"page-size":e.page_size,layout:"total, sizes, prev, pager, next, jumper",total:e.getDataTotal},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"prev-click":e.handleprevious,"next-click":e.handlenext}})],1)},r=[],i=(a("a9e3"),{name:"pagiNation",data:function(){return{page_size:10,currentPage:1}},props:{getDataTotal:{type:Number,default:0}},methods:{handleSizeChange:function(e){this.$emit("pagination",{page:1,page_size:e})},handleCurrentChange:function(e){this.$emit("pagination",{page:e,page_size:this.page_size})},handleprevious:function(e){this.$emit("pagination",{page:e,page_size:this.page_size})},handlenext:function(e){this.$emit("pagination",{page:e,page_size:this.page_size})}}}),o=i,s=a("2877"),l=Object(s["a"])(o,n,r,!1,null,"212aea47",null);t["a"]=l.exports}}]);