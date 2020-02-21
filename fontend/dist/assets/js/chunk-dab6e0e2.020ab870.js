(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-dab6e0e2"],{"129f":function(e,t){e.exports=Object.is||function(e,t){return e===t?0!==e||1/e===1/t:e!=e&&t!=t}},"2afb":function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/home"}}},[e._v("首页")]),a("el-breadcrumb-item",[e._v("客户管理")]),a("el-breadcrumb-item",[e._v("客户列表")])],1),a("el-row",[a("el-col",{attrs:{span:6}},[a("el-input",{attrs:{size:"mini",placeholder:"关键字搜索:/客户/联系人/主营业务"},model:{value:e.search,callback:function(t){e.search=t},expression:"search"}})],1),a("el-col",{attrs:{span:2}},[a("el-button",{attrs:{type:"primary"},on:{click:e.clearnSearchText}},[e._v("清除")])],1),a("el-col",{attrs:{span:2}},[a("add-customer",{on:{addNewCustomer:e.addNewCustomer}})],1)],1),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{data:e.handlePage(e.page,e.pagesize),border:"","highlight-current-row":"","element-loading-text":"拼命加载中","element-loading-spinner":"el-icon-loading","element-loading-background":"rgba(0, 0, 0, 0.8)"}},[a("el-table-column",{attrs:{label:"客户",align:"center",width:"120",fixed:""},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{staticClass:"col-cont",domProps:{innerHTML:e._s(e.showDate(t.row.lite_name))}})]}}])}),a("el-table-column",{attrs:{label:"类别",width:"80",fixed:""},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(e.csType[t.row.type-1]))]}}])}),a("el-table-column",{attrs:{label:"主营业务",align:"center",width:"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{staticClass:"col-cont",domProps:{innerHTML:e._s(e.showDate(t.row.business))}})]}}])}),a("el-table-column",{attrs:{label:"联系人",align:"center",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{staticClass:"col-cont",domProps:{innerHTML:e._s(e.showDate(t.row.contact_name))}})]}}])}),a("el-table-column",{attrs:{label:"联系人电话",align:"center",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{staticClass:"col-cont",domProps:{innerHTML:e._s(e.showDate(t.row.contact_phone))}})]}}])}),a("el-table-column",{attrs:{label:"联系人邮箱",align:"center",width:"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{staticClass:"col-cont",domProps:{innerHTML:e._s(e.showDate(t.row.contact_email))}})]}}])}),a("el-table-column",{attrs:{label:"合作状态",prop:"status",width:"70"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(e.status[t.row.status-1]))])]}}])}),a("el-table-column",{attrs:{label:"操作",fixed:"right",width:"60"},scopedSlots:e._u([{key:"default",fn:function(e){return[a("re-customer",{attrs:{customer:e.row.lite_name}})]}}])})],1),a("el-pagination",{attrs:{"current-page":e.page,"page-sizes":[1,2,5,10],"page-size":e.pagesize,layout:"total, sizes, prev, pager, next, jumper",total:e.count},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)},l=[],o=(a("4de4"),a("c975"),a("fb6a"),a("45fc"),a("b64b"),a("ac1f"),a("5319"),a("841c"),a("6128")),r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-button",{attrs:{type:"primary"},on:{click:e.dialogStatus}},[e._v("新增客户")]),a("el-dialog",{attrs:{title:"新增客户",visible:e.dialogVisible,width:"50%","before-close":e.handleClose},on:{"update:visible":function(t){e.dialogVisible=t}}},[a("el-form",{ref:"customerData",attrs:{model:e.customerData,"label-width":"120px",size:"mini",rules:e.rueles,"inline-message":""}},[a("el-form-item",{attrs:{label:"客户类型"}},[a("el-select",{attrs:{size:"mini",clearable:"",placeholder:"请选择"},model:{value:e.customerData.type,callback:function(t){e.$set(e.customerData,"type",t)},expression:"customerData.type"}},e._l(e.options,(function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1),a("el-form-item",{attrs:{label:"客户简称",prop:"lite_name"}},[a("el-input",{model:{value:e.customerData.lite_name,callback:function(t){e.$set(e.customerData,"lite_name",t)},expression:"customerData.lite_name"}})],1),a("el-form-item",{attrs:{label:"客户全称"}},[a("el-input",{attrs:{placeholder:"选填"},model:{value:e.customerData.name,callback:function(t){e.$set(e.customerData,"name",t)},expression:"customerData.name"}})],1),a("el-form-item",{attrs:{label:"详细地址"}},[a("el-input",{attrs:{placeholder:"选填"},model:{value:e.customerData.address,callback:function(t){e.$set(e.customerData,"address",t)},expression:"customerData.address"}})],1),a("el-form-item",{attrs:{label:"公司电话"}},[a("el-input",{attrs:{placeholder:"选填"},model:{value:e.customerData.phone,callback:function(t){e.$set(e.customerData,"phone",t)},expression:"customerData.phone"}})],1),a("el-form-item",{attrs:{label:"公司网站"}},[a("el-input",{attrs:{placeholder:"https://example.com"},model:{value:e.customerData.website,callback:function(t){e.$set(e.customerData,"website",t)},expression:"customerData.website"}})],1),a("el-form-item",{attrs:{label:"主营业务",prop:"business"}},[a("el-input",{attrs:{placeholder:"请输入内容"},model:{value:e.customerData.business,callback:function(t){e.$set(e.customerData,"business",t)},expression:"customerData.business"}})],1),a("el-form-item",{attrs:{label:"CEO"}},[a("el-input",{attrs:{placeholder:"选填"},model:{value:e.customerData.ceo,callback:function(t){e.$set(e.customerData,"ceo",t)},expression:"customerData.ceo"}})],1),a("el-form-item",{attrs:{label:"CEO邮箱"}},[a("el-input",{attrs:{placeholder:"选填"},model:{value:e.customerData.email,callback:function(t){e.$set(e.customerData,"email",t)},expression:"customerData.email"}})],1),a("el-form-item",{attrs:{label:"CEO电话"}},[a("el-input",{attrs:{placeholder:"选填"},model:{value:e.customerData.ceo_phone,callback:function(t){e.$set(e.customerData,"ceo_phone",t)},expression:"customerData.ceo_phone"}})],1),a("el-form-item",{attrs:{label:"联系人",prop:"contact_name"}},[a("el-input",{attrs:{placeholder:"请输入内容"},model:{value:e.customerData.contact_name,callback:function(t){e.$set(e.customerData,"contact_name",t)},expression:"customerData.contact_name"}})],1),a("el-form-item",{attrs:{label:"联系人电话",prop:"contact_phone"}},[a("el-input",{attrs:{placeholder:"请输入内容"},model:{value:e.customerData.contact_phone,callback:function(t){e.$set(e.customerData,"contact_phone",t)},expression:"customerData.contact_phone"}})],1),a("el-form-item",{attrs:{label:"联系人邮箱",prop:"contact_email"}},[a("el-input",{attrs:{placeholder:"请输入内容"},model:{value:e.customerData.contact_email,callback:function(t){e.$set(e.customerData,"contact_email",t)},expression:"customerData.contact_email"}})],1),a("el-form-item",{attrs:{label:"合作状态"}},[a("el-select",{attrs:{size:"mini",clearable:"",placeholder:"请选择"},model:{value:e.customerData.status,callback:function(t){e.$set(e.customerData,"status",t)},expression:"customerData.status"}},e._l(e.csStatusOptions,(function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1),a("el-form-item",{attrs:{label:"信用额度"}},[a("el-input",{attrs:{placeholder:"选填,默认:0"},model:{value:e.customerData.line_credits,callback:function(t){e.$set(e.customerData,"line_credits",t)},expression:"customerData.line_credits"}})],1),a("el-form-item",{attrs:{label:"备注"}},[a("el-input",{attrs:{placeholder:"选填"},model:{value:e.customerData.text,callback:function(t){e.$set(e.customerData,"text",t)},expression:"customerData.text"}})],1),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.onSubmit("customerData")}}},[e._v("立即创建")])],1)],1)],1)],1)},n=[],i=a("ade3"),c=a("4328"),u=a.n(c),m=a("f6b0"),d={name:"addCustomer",data:function(){var e;return{rueles:(e={lite_name:[{required:!0,message:"请输入客户简称",trigger:"blur"},{min:2,max:30,message:"长度在 2 到 30 个字符",trigger:"blur"}],contact_email:[{type:"email",required:!0,message:"不是有效的邮箱",trigger:"blur"}],contact_name:[{required:!0,message:"请输入联系人",trigger:"blur"}],contact_phone:[{required:!0,message:"请输入联系人电话",trigger:"blur"}]},Object(i["a"])(e,"contact_email",[{required:!0,message:"请输入联系人邮箱",trigger:"blur"}]),Object(i["a"])(e,"business",[{required:!0,message:"请输入主营业务",trigger:"blur"}]),e),customerData:{type:"",name:"",lite_name:"",address:"",phone:"",website:"",business:"",ceo:"",email:"",ceo_phone:"",contact_name:"",contact_email:"",contact_phone:"",status:1,line_credits:0,text:""},options:[{value:1,label:"采购商"},{value:2,label:"供应商"},{value:3,label:"采购&供应商"}],csStatusOptions:[{value:1,label:"合作"},{value:2,label:"终止"},{value:3,label:"开发"}],dialogVisible:!1}},methods:{dialogStatus:function(){var e=this;this.dialogVisible=!0,Object(o["a"])({url:"customers/",params:{st:"addcustomer"}}).then((function(e){window.sessionStorage.setItem("subtoken",e.data.subtoken)})).catch((function(t){e.$message({message:"网络错误,请稍后重试",type:"warning"})}))},onSubmit:function(e){var t=this;this.$refs[e].validate((function(e){e&&(window.sessionStorage.getItem("subtoken")?Object(m["b"])(t.customerData).then((function(e){var a=e.data;t.$emit("addNewCustomer",a),window.sessionStorage.removeItem("subtoken"),t.dialogVisible=!1,t.customerData={}})).catch((function(e){var a=u.a.parse(e.response.request.response,{delimiter:","});t.responseMessage(a)})):t.$message.error("请勿重复提交,或刷新重试"))}))},handleClose:function(e){var t=this;this.$confirm("请确认数据已保存!").then((function(a){t.customerData={},e()})).catch((function(e){}))},responseMessage:function(e){this.$notify({title:"警告",message:e,position:"top-left"})}}},b=d,p=a("2877"),f=Object(p["a"])(b,r,n,!1,null,"52068530",null),h=f.exports,D=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-button",{attrs:{type:"text",size:"mini"},on:{click:e.handleReCustomer}},[e._v("查看")]),a("el-dialog",{attrs:{visible:e.reCustomerDia,width:"40%","append-to-body":!0,"before-close":e.beforeClose},on:{"update:visible":function(t){e.reCustomerDia=t}}},[a("el-form",{ref:"customerData",attrs:{model:e.customerData,"label-width":"120px",size:"mini",rules:e.reCustomerRules,"inline-message":""}},[a("el-form-item",{attrs:{label:"客户类型"}},[a("el-select",{attrs:{size:"mini",clearable:"",disabled:e.formDisabled},model:{value:e.customerData.type,callback:function(t){e.$set(e.customerData,"type",t)},expression:"customerData.type"}},e._l(e.options,(function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1),a("el-form-item",{attrs:{label:"合作状态"}},[a("el-select",{attrs:{size:"mini",clearable:"",disabled:e.formDisabled},model:{value:e.customerData.status,callback:function(t){e.$set(e.customerData,"status",t)},expression:"customerData.status"}},e._l(e.csStatusOptions,(function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1),a("el-form-item",{attrs:{label:"客户简称"}},[a("el-input",{attrs:{disabled:""},model:{value:e.customerData.lite_name,callback:function(t){e.$set(e.customerData,"lite_name",t)},expression:"customerData.lite_name"}})],1),a("el-form-item",{attrs:{label:"客户全称"}},[a("el-input",{attrs:{disabled:e.formDisabled},model:{value:e.customerData.name,callback:function(t){e.$set(e.customerData,"name",t)},expression:"customerData.name"}})],1),a("el-form-item",{attrs:{label:"详细地址"}},[a("el-input",{attrs:{disabled:e.formDisabled},model:{value:e.customerData.address,callback:function(t){e.$set(e.customerData,"address",t)},expression:"customerData.address"}})],1),a("el-form-item",{attrs:{label:"公司电话"}},[a("el-input",{attrs:{disabled:e.formDisabled},model:{value:e.customerData.phone,callback:function(t){e.$set(e.customerData,"phone",t)},expression:"customerData.phone"}})],1),a("el-form-item",{attrs:{label:"公司网站",prop:"website"}},[a("el-input",{attrs:{disabled:e.formDisabled},model:{value:e.customerData.website,callback:function(t){e.$set(e.customerData,"website",t)},expression:"customerData.website"}})],1),a("el-form-item",{attrs:{label:"主营业务"}},[a("el-input",{attrs:{disabled:e.formDisabled},model:{value:e.customerData.business,callback:function(t){e.$set(e.customerData,"business",t)},expression:"customerData.business"}})],1),a("el-form-item",{attrs:{label:"CEO"}},[a("el-input",{attrs:{disabled:e.formDisabled},model:{value:e.customerData.ceo,callback:function(t){e.$set(e.customerData,"ceo",t)},expression:"customerData.ceo"}})],1),a("el-form-item",{attrs:{label:"CEO邮箱",prop:"email"}},[a("el-input",{attrs:{disabled:e.formDisabled},model:{value:e.customerData.email,callback:function(t){e.$set(e.customerData,"email",t)},expression:"customerData.email"}})],1),a("el-form-item",{attrs:{label:"CEO电话"}},[a("el-input",{attrs:{disabled:e.formDisabled},model:{value:e.customerData.ceo_phone,callback:function(t){e.$set(e.customerData,"ceo_phone",t)},expression:"customerData.ceo_phone"}})],1),a("el-form-item",{attrs:{label:"联系人"}},[a("el-input",{attrs:{disabled:e.formDisabled},model:{value:e.customerData.contact_name,callback:function(t){e.$set(e.customerData,"contact_name",t)},expression:"customerData.contact_name"}})],1),a("el-form-item",{attrs:{label:"联系人电话"}},[a("el-input",{attrs:{disabled:e.formDisabled},model:{value:e.customerData.contact_phone,callback:function(t){e.$set(e.customerData,"contact_phone",t)},expression:"customerData.contact_phone"}})],1),a("el-form-item",{attrs:{label:"联系人邮箱",prop:"contact_email"}},[a("el-input",{attrs:{disabled:e.formDisabled},model:{value:e.customerData.contact_email,callback:function(t){e.$set(e.customerData,"contact_email",t)},expression:"customerData.contact_email"}})],1),a("el-form-item",{attrs:{label:"信用额度",prop:"line_credits"}},[a("el-input",{attrs:{disabled:e.formDisabled},model:{value:e.customerData.line_credits,callback:function(t){e.$set(e.customerData,"line_credits",t)},expression:"customerData.line_credits"}})],1),a("el-form-item",{attrs:{label:"备注"}},[a("el-input",{attrs:{disabled:e.formDisabled},model:{value:e.customerData.text,callback:function(t){e.$set(e.customerData,"text",t)},expression:"customerData.text"}})],1),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:e.changebtnstatus}},[e._v("修 改")]),a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.handleSubmit("customerData")}}},[e._v("提 交")])],1)],1)],1)],1)},g=[],v={name:"ReCustomer",props:{customer:String},data:function(){return{formDisabled:!0,reCustomerDia:!1,customerData:{lite_name:"",sales:"",type:1,name:"",address:"",phone:"",website:"",business:"",ceo:"",email:"",ceo_phone:"",contact_name:"",contact_email:"",contact_phone:"",status:1,line_credits:0,input_time:"",text:""},reCustomerRules:{website:[{type:"url",message:"不是有效的网址",trigger:"blur"}],email:[{type:"email",message:"不是有效的邮箱",trigger:"blur"}],contact_email:[{type:"email",message:"不是有效的邮箱",trigger:"blur"}]},options:[{value:1,label:"采购商"},{value:2,label:"供应商"},{value:3,label:"采购&供应商"}],csStatusOptions:[{value:1,label:"合作"},{value:2,label:"终止"},{value:3,label:"开发"}]}},methods:{changebtnstatus:function(){this.formDisabled=!1},handleReCustomer:function(){var e=this;this.reCustomerDia=!0,Object(o["a"])({url:"customers/"+this.customer+"/"}).then((function(t){e.customerData=t.data})).catch((function(t){e.$message({message:"网络错误,请稍后重试",type:"warning"})}))},beforeClose:function(e){var t=this;this.$confirm("确认关闭？").then((function(a){t.formDisabled=!1,e()})).catch((function(e){}))},handleSubmit:function(e){var t=this;this.$refs[e].validate((function(e){if(!e)return!1;Object(o["a"])({url:"customers/"+t.customer+"/",method:"patch",data:u.a.stringify(t.customerData)}).then((function(e){t.formDisabled=!0,t.$message({message:"修改成功",type:"success"})})).catch((function(e){t.$message({message:"网络错误,请稍后重试",type:"warning"})}))}))},resetForm:function(e){this.$refs[e].resetFields()}}},_=v,w=Object(p["a"])(_,D,g,!1,null,"4742cdc6",null),x=w.exports,k={data:function(){return{customerRow:{},dialogVisable:!1,pagesize:10,page:1,count:0,customerData:[],sliceTableData:[],search:"",loading:!0,csType:["采购商","供应商","采购&供应商"],status:["合作","终止","开发"]}},components:{addCustomer:h,ReCustomer:x},methods:{handleClose:function(){},clearnSearchText:function(){this.search=null},handlePage:function(e,t){var a=this.search;return a?this.customerData.filter((function(e){return Object.keys(e).some((function(t){return String(e[t]).toLowerCase().indexOf(a)>-1}))})).slice((e-1)*t,e*t*1):this.customerData.slice((e-1)*t,e*t*1)},showDate:function(e){return e+="",-1!==e.indexOf(this.search)&&""!==this.search?e.replace(this.search,'<font color="#ff4400">'+this.search+"</font>"):e},handleSizeChange:function(e){this.pagesize=e,this.handlePage(this.page,e)},handleCurrentChange:function(e){this.page=e,this.handlePage(e,this.pagesize)},addNewCustomer:function(e){this.customerData.push(e),this.count+=1}},created:function(){var e=this;Object(o["a"])({url:"customers/"}).then((function(t){e.customerData=t.data,e.loading=!1,e.count=t.data.length})).catch((function(t){e.$message({message:"网络错误,请稍后重试",type:"warning"})}))}},y=k,$=Object(p["a"])(y,s,l,!1,null,"d990a92c",null);t["default"]=$.exports},"45fc":function(e,t,a){"use strict";var s=a("23e7"),l=a("b727").some,o=a("a640"),r=a("ae40"),n=o("some"),i=r("some");s({target:"Array",proto:!0,forced:!n||!i},{some:function(e){return l(this,e,arguments.length>1?arguments[1]:void 0)}})},"841c":function(e,t,a){"use strict";var s=a("d784"),l=a("825a"),o=a("1d80"),r=a("129f"),n=a("14c3");s("search",1,(function(e,t,a){return[function(t){var a=o(this),s=void 0==t?void 0:t[e];return void 0!==s?s.call(t,a):new RegExp(t)[e](String(a))},function(e){var s=a(t,e,this);if(s.done)return s.value;var o=l(e),i=String(this),c=o.lastIndex;r(c,0)||(o.lastIndex=0);var u=n(o,i);return r(o.lastIndex,c)||(o.lastIndex=c),null===u?-1:u.index}]}))},ade3:function(e,t,a){"use strict";function s(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}a.d(t,"a",(function(){return s}))},f6b0:function(e,t,a){"use strict";a.d(t,"b",(function(){return r})),a.d(t,"a",(function(){return n}));var s=a("6128"),l=a("4328"),o=a.n(l);function r(e){return Object(s["a"])({url:"customers/",method:"post",params:{subtoken:window.sessionStorage.getItem("subtoken")},data:o.a.stringify(e)})}function n(e){return Object(s["a"])({url:"customers/",params:e})}}}]);