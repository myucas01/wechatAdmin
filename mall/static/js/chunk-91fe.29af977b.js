(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-91fe"],{"312x":function(t,n,e){"use strict";var s=e("vtkW");e.n(s).a},c11S:function(t,n,e){"use strict";var s=e("fN6i");e.n(s).a},fN6i:function(t,n,e){},ntYl:function(t,n,e){"use strict";e.r(n);var s={name:"Login",data:function(){return{loginForm:{username:"admin123",password:"admin123"},loginRules:{username:[{required:!0,message:"管理员账户不允许为空",trigger:"blur"}],password:[{required:!0,message:"管理员密码不允许为空",trigger:"blur"},{validator:function(t,n,e){n.length<6?e(new Error("管理员密码长度应大于6")):e()},trigger:"blur"}]},passwordType:"password",loading:!1}},watch:{$route:{handler:function(t){this.redirect=t.query&&t.query.redirect},immediate:!0}},created:function(){},destroyed:function(){},methods:{showPwd:function(){"password"===this.passwordType?this.passwordType="":this.passwordType="password"},handleLogin:function(){var t=this;this.$refs.loginForm.validate(function(n){if(!n||t.loading)return!1;t.loading=!0,t.$store.dispatch("LoginByUsername",t.loginForm).then(function(){t.loading=!1,t.$router.push({path:t.redirect||"/"})}).catch(function(n){t.$notify.error({title:"失败",message:n.data.errmsg}),t.loading=!1})})}}},o=(e("c11S"),e("312x"),e("ZrdR")),a=Object(o.a)(s,function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"login-container"},[e("el-form",{ref:"loginForm",staticClass:"login-form",attrs:{model:t.loginForm,rules:t.loginRules,"auto-complete":"on","label-position":"left"}},[e("div",{staticClass:"title-container"},[e("h3",{staticClass:"title"},[t._v("管理员登录")])]),t._v(" "),e("el-form-item",{attrs:{prop:"username"}},[e("span",{staticClass:"svg-container svg-container_login"},[e("svg-icon",{attrs:{"icon-class":"user"}})],1),t._v(" "),e("el-input",{attrs:{name:"username",type:"text","auto-complete":"on",placeholder:"username"},model:{value:t.loginForm.username,callback:function(n){t.$set(t.loginForm,"username",n)},expression:"loginForm.username"}})],1),t._v(" "),e("el-form-item",{attrs:{prop:"password"}},[e("span",{staticClass:"svg-container"},[e("svg-icon",{attrs:{"icon-class":"password"}})],1),t._v(" "),e("el-input",{attrs:{type:t.passwordType,name:"password","auto-complete":"on",placeholder:"password"},nativeOn:{keyup:function(n){return"button"in n||!t._k(n.keyCode,"enter",13,n.key,"Enter")?t.handleLogin(n):null}},model:{value:t.loginForm.password,callback:function(n){t.$set(t.loginForm,"password",n)},expression:"loginForm.password"}}),t._v(" "),e("span",{staticClass:"show-pwd",on:{click:t.showPwd}},[e("svg-icon",{attrs:{"icon-class":"eye"}})],1)],1),t._v(" "),e("el-button",{staticStyle:{width:"100%","margin-bottom":"30px"},attrs:{loading:t.loading,type:"primary"},nativeOn:{click:function(n){return n.preventDefault(),t.handleLogin(n)}}},[t._v("登录")]),t._v(" "),e("div",{staticStyle:{position:"relative"}},[e("div",{staticClass:"tips"},[e("span",[t._v(" 超级管理员用户名: admin123")]),t._v(" "),e("span",[t._v(" 超级管理员用户名：admin123")])]),t._v(" "),e("div",{staticClass:"tips"},[e("span",[t._v(" 商城管理员用户名: mall123")]),t._v(" "),e("span",[t._v(" 商城管理员用户名：mall123")])]),t._v(" "),e("div",{staticClass:"tips"},[e("span",[t._v(" 推广管理员用户名: promotion123")]),t._v(" "),e("span",[t._v(" 推广管理员用户名：promotion123")])])])],1)],1)},[],!1,null,"5c31e626",null);a.options.__file="index.vue";n.default=a.exports},vtkW:function(t,n,e){}}]);