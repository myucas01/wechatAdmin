(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-1fd7"],{"2nGb":function(t,e,n){"use strict";n.d(e,"b",function(){return r}),n.d(e,"f",function(){return o}),n.d(e,"a",function(){return i}),n.d(e,"e",function(){return l}),n.d(e,"c",function(){return c}),n.d(e,"g",function(){return u}),n.d(e,"d",function(){return d}),n.d(e,"h",function(){return s});var a=n("t3Un");function r(){return Object(a.a)({url:"/config/mall",method:"get"})}function o(t){return Object(a.a)({url:"/config/mall",method:"post",data:t})}function i(){return Object(a.a)({url:"/config/express",method:"get"})}function l(t){return Object(a.a)({url:"/config/express",method:"post",data:t})}function c(){return Object(a.a)({url:"/config/order",method:"get"})}function u(t){return Object(a.a)({url:"/config/order",method:"post",data:t})}function d(){return Object(a.a)({url:"/config/wx",method:"get"})}function s(t){return Object(a.a)({url:"/config/wx",method:"post",data:t})}},"9jDc":function(t,e,n){},RpVo:function(t,e,n){"use strict";n.r(e);var a=n("2nGb"),r={name:"ConfigOrder",data:function(){return{dataForm:{}}},created:function(){this.init()},methods:{init:function(){var t=this;Object(a.c)().then(function(e){t.dataForm=e.data.data})},cancel:function(){this.init()},update:function(){var t=this;Object(a.g)(this.dataForm).then(function(e){t.$notify.success({title:"成功",message:"订单参数配置成功"})}).catch(function(e){t.$notify.error({title:"失败",message:e.data.errmsg})})}}},o=(n("VUMD"),n("ZrdR")),i=Object(o.a)(r,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"app-container"},[n("el-form",{ref:"dataForm",attrs:{rules:t.rules,model:t.dataForm,"status-icon":"","label-width":"300px"}},[n("el-form-item",{attrs:{label:"用户下单后超时",prop:"litemall_order_unpaid"}},[n("el-input",{staticClass:"input-width",model:{value:t.dataForm.litemall_order_unpaid,callback:function(e){t.$set(t.dataForm,"litemall_order_unpaid",e)},expression:"dataForm.litemall_order_unpaid"}},[n("template",{slot:"append"},[t._v("分钟")])],2),t._v(" "),n("span",{staticClass:"info"},[t._v("用户未付款，则订单自动取消")])],1),t._v(" "),n("el-form-item",{attrs:{label:"订单发货后超期",prop:"litemall_order_unconfirm"}},[n("el-input",{staticClass:"input-width",model:{value:t.dataForm.litemall_order_unconfirm,callback:function(e){t.$set(t.dataForm,"litemall_order_unconfirm",e)},expression:"dataForm.litemall_order_unconfirm"}},[n("template",{slot:"append"},[t._v(" 天")])],2),t._v(" "),n("span",{staticClass:"info"},[t._v("未确认收货，则订单自动确认收货")])],1),t._v(" "),n("el-form-item",{attrs:{label:"确认收货后超期",prop:"litemall_order_comment"}},[n("el-input",{staticClass:"input-width",model:{value:t.dataForm.litemall_order_comment,callback:function(e){t.$set(t.dataForm,"litemall_order_comment",e)},expression:"dataForm.litemall_order_comment"}},[n("template",{slot:"append"},[t._v("天")])],2),t._v(" "),n("span",{staticClass:"info"},[t._v("未评价商品，则取消评价资格")])],1),t._v(" "),n("el-form-item",[n("el-button",{on:{click:t.cancel}},[t._v("取消")]),t._v(" "),n("el-button",{attrs:{type:"primary"},on:{click:t.update}},[t._v("确定")])],1)],1)],1)},[],!1,null,"5a31cdbf",null);i.options.__file="order.vue";e.default=i.exports},VUMD:function(t,e,n){"use strict";var a=n("9jDc");n.n(a).a}}]);