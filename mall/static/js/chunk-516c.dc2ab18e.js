(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-516c"],{"/kY0":function(t,e,n){"use strict";n.r(e);var o=n("D6yg"),i=n("xA6U"),r=n("rs3x"),a=n("BiX5"),s=n("gg9s"),l=n("Mz3J"),c=n("X4fA"),u={name:"TopicEdit",components:{BackToTop:a.a,Editor:s.a,Pagination:l.a},data:function(){return{uploadPath:r.e,id:0,topic:{},goodsList:[],addVisiable:!1,list:[],total:0,listLoading:!1,listQuery:{page:1,limit:5,id:void 0,name:void 0,sort:"add_time",order:"desc"},selectedlist:[],rules:{title:[{required:!0,message:"专题标题不能为空",trigger:"blur"}],subtitle:[{required:!0,message:"专题子标题不能为空",trigger:"blur"}],content:[{required:!0,message:"专题内容不能为空",trigger:"blur"}],price:[{required:!0,message:"专题低价不能为空",trigger:"blur"}]},editorInit:{language:"zh_CN",convert_urls:!1,height:500,plugins:["advlist anchor autolink autosave code codesample colorpicker colorpicker contextmenu directionality emoticons fullscreen hr image imagetools importcss insertdatetime link lists media nonbreaking noneditable pagebreak paste preview print save searchreplace spellchecker tabfocus table template textcolor textpattern visualblocks visualchars wordcount"],toolbar:["searchreplace bold italic underline strikethrough alignleft aligncenter alignright outdent indent  blockquote undo redo removeformat subscript superscript code codesample","hr bullist numlist link image charmap preview anchor pagebreak insertdatetime media table emoticons forecolor backcolor fullscreen"],images_upload_handler:function(t,e,n){var o=new FormData;o.append("file",t.blob()),Object(r.a)(o).then(function(t){e(t.data.data.url)}).catch(function(){n("上传失败，请重新上传")})}}}},computed:{headers:function(){return{"X-Litemall-Admin-Token":Object(c.a)()}}},created:function(){null!=this.$route.query.id&&(this.id=this.$route.query.id,this.getTopic())},methods:{getTopic:function(){var t=this;this.listLoading=!0,Object(o.d)({id:this.id}).then(function(e){t.topic=e.data.data.topic,t.goodsList=e.data.data.goodsList,t.listLoading=!1}).catch(function(){t.topic={},t.goodsList=[],t.listLoading=!1})},getList:function(){var t=this;this.listLoading=!0,Object(i.e)(this.listQuery).then(function(e){t.list=e.data.data.list,t.total=e.data.data.total,t.listLoading=!1}).catch(function(){t.list=[],t.total=0,t.listLoading=!1})},handleFilter:function(){this.listQuery.page=1,this.getList()},handleSelectionChange:function(t){this.selectedlist=t},uploadPicUrl:function(t){this.topic.picUrl=t.data.url},handleCreate:function(){this.listQuery={page:1,limit:5,id:void 0,name:void 0,sort:"add_time",order:"desc"},this.list=[],this.total=0,this.selectedlist=[],this.addVisiable=!0},confirmAdd:function(){var t=this,e=[],n=[];this.selectedlist.forEach(function(o){var i=o.id,r=!1;t.topic.goods.forEach(function(t){i===t&&(r=!0)}),r||(e.push(i),n.push(o))}),e.length>0&&(this.topic.goods=this.topic.goods.concat(e),this.goodsList=this.goodsList.concat(n)),this.addVisiable=!1},handleDelete:function(t){for(var e=0;e<this.topic.goods.length;e++)t.id===this.topic.goods[e]&&this.topic.goods.splice(e,1);for(var n=0;n<this.goodsList.length;n++)t.id===this.goodsList[n].id&&this.goodsList.splice(n,1)},handleCancel:function(){this.$router.push({path:"/promotion/topic"})},handleConfirm:function(){var t=this;this.$refs.topic.validate(function(e){e&&Object(o.e)(t.topic).then(function(e){t.$router.push({path:"/promotion/topic"})}).catch(function(e){t.$notify.error({title:"失败",message:e.data.errmsg})})})}}},d=(n("0xot"),n("ZrdR")),p=Object(d.a)(u,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"app-container"},[n("el-form",{ref:"topic",staticStyle:{width:"800px","margin-left":"50px"},attrs:{rules:t.rules,model:t.topic,"status-icon":"","label-position":"left","label-width":"100px"}},[n("el-form-item",{attrs:{label:"专题标题",prop:"title"}},[n("el-input",{model:{value:t.topic.title,callback:function(e){t.$set(t.topic,"title",e)},expression:"topic.title"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"专题子标题",prop:"subtitle"}},[n("el-input",{model:{value:t.topic.subtitle,callback:function(e){t.$set(t.topic,"subtitle",e)},expression:"topic.subtitle"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"专题图片",prop:"picUrl"}},[n("el-upload",{staticClass:"avatar-uploader",attrs:{headers:t.headers,action:t.uploadPath,"show-file-list":!1,"on-success":t.uploadPicUrl,accept:".jpg,.jpeg,.png,.gif"}},[t.topic.picUrl?n("img",{staticClass:"avatar",attrs:{src:t.topic.picUrl}}):n("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1),t._v(" "),n("el-form-item",{attrs:{label:"专题内容",prop:"content"}},[n("editor",{attrs:{init:t.editorInit},model:{value:t.topic.content,callback:function(e){t.$set(t.topic,"content",e)},expression:"topic.content"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"商品低价",prop:"price"}},[n("el-input",{model:{value:t.topic.price,callback:function(e){t.$set(t.topic,"price",e)},expression:"topic.price"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"阅读量",prop:"readCount"}},[n("el-input",{model:{value:t.topic.readCount,callback:function(e){t.$set(t.topic,"readCount",e)},expression:"topic.readCount"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"专题商品",prop:"goods"}},[n("el-button",{staticStyle:{float:"right"},attrs:{size:"mini",type:"primary"},on:{click:function(e){t.handleCreate()}}},[t._v("创建商品")]),t._v(" "),n("el-table",{attrs:{data:t.goodsList,border:"",fit:"","highlight-current-row":""}},[n("el-table-column",{attrs:{align:"center",label:"商品ID",prop:"id"}}),t._v(" "),n("el-table-column",{attrs:{align:"center",property:"picUrl",label:"图片"},scopedSlots:t._u([{key:"default",fn:function(t){return[n("img",{attrs:{src:t.row.picUrl,width:"60"}})]}}])}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"商品名称",prop:"name"}}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"商品介绍",prop:"brief"}}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"操作","class-name":"small-padding fixed-width"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(n){t.handleDelete(e.row)}}},[t._v("删除")])]}}])})],1)],1)],1),t._v(" "),n("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:t.handleCancel}},[t._v("取消")]),t._v(" "),n("el-button",{attrs:{type:"primary"},on:{click:t.handleConfirm}},[t._v("确定")])],1),t._v(" "),n("el-dialog",{attrs:{visible:t.addVisiable,title:"添加商品"},on:{"update:visible":function(e){t.addVisiable=e}}},[n("div",{staticClass:"search"},[n("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{clearable:"",placeholder:"请输入商品编号"},model:{value:t.listQuery.goodsSn,callback:function(e){t.$set(t.listQuery,"goodsSn",e)},expression:"listQuery.goodsSn"}}),t._v(" "),n("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{clearable:"",placeholder:"请输入商品名称"},model:{value:t.listQuery.name,callback:function(e){t.$set(t.listQuery,"name",e)},expression:"listQuery.name"}}),t._v(" "),n("el-button",{staticClass:"filter-item",attrs:{type:"primary",icon:"el-icon-search"},on:{click:t.handleFilter}},[t._v("查找")]),t._v(" "),n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],attrs:{data:t.list,"element-loading-text":"正在查询中。。。",border:"",fit:"","highlight-current-row":""},on:{"selection-change":t.handleSelectionChange}},[n("el-table-column",{attrs:{type:"selection",width:"55"}}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"商品ID",prop:"id"}}),t._v(" "),n("el-table-column",{attrs:{align:"center",property:"picUrl",label:"图片"},scopedSlots:t._u([{key:"default",fn:function(t){return[n("img",{attrs:{src:t.row.picUrl,width:"40"}})]}}])}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"商品名称",prop:"name"}})],1),t._v(" "),n("pagination",{directives:[{name:"show",rawName:"v-show",value:t.total>0,expression:"total>0"}],attrs:{total:t.total,page:t.listQuery.page,limit:t.listQuery.limit},on:{"update:page":function(e){t.$set(t.listQuery,"page",e)},"update:limit":function(e){t.$set(t.listQuery,"limit",e)},pagination:t.getList}})],1),t._v(" "),n("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:function(e){t.addVisiable=!1}}},[t._v("取消")]),t._v(" "),n("el-button",{attrs:{type:"primary"},on:{click:t.confirmAdd}},[t._v("确定")])],1)])],1)},[],!1,null,null,null);p.options.__file="topicEdit.vue";e.default=p.exports},"0xot":function(t,e,n){"use strict";var o=n("el9q");n.n(o).a},D6yg:function(t,e,n){"use strict";n.d(e,"c",function(){return i}),n.d(e,"a",function(){return r}),n.d(e,"d",function(){return a}),n.d(e,"e",function(){return s}),n.d(e,"b",function(){return l});var o=n("t3Un");function i(t){return Object(o.a)({url:"/topic/list",method:"get",params:t})}function r(t){return Object(o.a)({url:"/topic/create",method:"post",data:t})}function a(t){return Object(o.a)({url:"/topic/read",method:"get",params:t})}function s(t){return Object(o.a)({url:"/topic/update",method:"post",data:t})}function l(t){return Object(o.a)({url:"/topic/delete",method:"post",data:t})}},Gmm9:function(t,e,n){"use strict";(function(t){n.d(e,"a",function(){return i});var o=function(){return"undefined"!=typeof window?window:t},i=function(){var t=o();return t&&t.tinymce?t.tinymce:null}}).call(this,n("nagk"))},Y5bG:function(t,e,n){"use strict";n.d(e,"a",function(){return i}),Math.easeInOutQuad=function(t,e,n,o){return(t/=o/2)<1?n/2*t*t+e:-n/2*(--t*(t-2)-1)+e};var o=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(t){window.setTimeout(t,1e3/60)};function i(t,e,n){var i=document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop,r=t-i,a=0;e=void 0===e?500:e;!function t(){a+=20,function(t){document.documentElement.scrollTop=t,document.body.parentNode.scrollTop=t,document.body.scrollTop=t}(Math.easeInOutQuad(a,i,r,e)),a<e?o(t):n&&"function"==typeof n&&n()}()}},el9q:function(t,e,n){},gg9s:function(t,e,n){"use strict";var o=["onActivate","onAddUndo","onBeforeAddUndo","onBeforeExecCommand","onBeforeGetContent","onBeforeRenderUI","onBeforeSetContent","onBeforePaste","onBlur","onChange","onClearUndos","onClick","onContextMenu","onCopy","onCut","onDblclick","onDeactivate","onDirty","onDrag","onDragDrop","onDragEnd","onDragGesture","onDragOver","onDrop","onExecCommand","onFocus","onFocusIn","onFocusOut","onGetContent","onHide","onInit","onKeyDown","onKeyPress","onKeyUp","onLoadContent","onMouseDown","onMouseEnter","onMouseLeave","onMouseMove","onMouseOut","onMouseOver","onMouseUp","onNodeChange","onObjectResizeStart","onObjectResized","onObjectSelected","onPaste","onPostProcess","onPostRender","onPreProcess","onProgressState","onRedo","onRemove","onReset","onSaveContent","onSelectionChange","onSetAttrib","onSetContent","onShow","onSubmit","onUndo","onVisualAid"],i=function(t){return-1!==o.indexOf(t)},r=function(t,e,n){var o=e.$props.value?e.$props.value:"",r=e.$props.initialValue?e.$props.initialValue:"";n.setContent(o||r),e.$listeners.input&&function(t,e){var n,o=t.$props.modelEvents?t.$props.modelEvents:null,i=Array.isArray(o)?o.join(" "):o;t.$watch("value",function(t,o){e&&"string"==typeof t&&t!==n&&t!==o&&(e.setContent(t),n=t)}),e.on(i||"change keyup undo redo",function(){n=e.getContent(),t.$emit("input",n)})}(e,n),function(t,e,n){Object.keys(e).filter(i).forEach(function(o){var i=e[o];"function"==typeof i&&("onInit"===o?i(t,n):n.on(o.substring(2),function(t){return i(t,n)}))})}(t,e.$listeners,n)},a=0,s=function(t){var e=(new Date).getTime();return t+"_"+Math.floor(1e9*Math.random())+ ++a+String(e)},l=function(t){return void 0===t||""===t?[]:Array.isArray(t)?t:t.split(" ")},c=n("Gmm9"),u={apiKey:String,cloudChannel:String,id:String,init:Object,initialValue:String,inline:Boolean,modelEvents:[String,Array],plugins:[String,Array],tagName:String,toolbar:[String,Array],value:String,disabled:Boolean},d=Object.assign||function(t){for(var e,n=1,o=arguments.length;n<o;n++)for(var i in e=arguments[n])Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i]);return t},p={listeners:[],scriptId:s("tiny-script"),scriptLoaded:!1},f=function(t){return function(){var e=d({},t.$props.init,{readonly:t.$props.disabled,selector:"#"+t.elementId,plugins:function(t,e){return l(t).concat(l(e))}(t.$props.init&&t.$props.init.plugins,t.$props.plugins),toolbar:t.$props.toolbar||t.$props.init&&t.$props.init.toolbar,inline:t.inlineEditor,setup:function(e){t.editor=e,e.on("init",function(n){return r(n,t,e)}),t.$props.init&&"function"==typeof t.$props.init.setup&&t.$props.init.setup(e)}});(function(t){return null!==t&&"textarea"===t.tagName.toLowerCase()})(t.element)&&(t.element.style.visibility=""),Object(c.a)().init(e)}},m={props:u,created:function(){this.elementId=this.$props.id||s("tiny-vue"),this.inlineEditor=this.$props.init&&this.$props.init.inline||this.$props.inline},watch:{disabled:function(){this.editor.setMode(this.disabled?"readonly":"design")}},mounted:function(){if(this.element=this.$el,null!==Object(c.a)())f(this)();else if(this.element){var t=this.element.ownerDocument,e=this.$props.cloudChannel?this.$props.cloudChannel:"stable",n=this.$props.apiKey?this.$props.apiKey:"";!function(t,e,n,o){t.scriptLoaded?o():(t.listeners.push(o),e.getElementById(t.scriptId)||function(t,e,n,o){var i=e.createElement("script");i.type="application/javascript",i.id=t,i.addEventListener("load",o),i.src=n,e.head.appendChild(i)}(t.scriptId,e,n,function(){t.listeners.forEach(function(t){return t()}),t.scriptLoaded=!0}))}(p,t,"https://cloud.tinymce.com/"+e+"/tinymce.min.js?apiKey="+n,f(this))}},beforeDestroy:function(){null!==Object(c.a)()&&Object(c.a)().remove(this.editor)},render:function(t){return this.inlineEditor?function(t,e,n){return t(n||"div",{attrs:{id:e}})}(t,this.elementId,this.$props.tagName):function(t,e){return t("textarea",{attrs:{id:e},style:{visibility:"hidden"}})}(t,this.elementId)}};e.a=m},rs3x:function(t,e,n){"use strict";n.d(e,"c",function(){return i}),n.d(e,"a",function(){return r}),n.d(e,"d",function(){return a}),n.d(e,"b",function(){return s}),n.d(e,"e",function(){return l});var o=n("t3Un");function i(t){return Object(o.a)({url:"/storage/list",method:"get",params:t})}function r(t){return Object(o.a)({url:"/storage/create",method:"post",data:t})}function a(t){return Object(o.a)({url:"/storage/update",method:"post",data:t})}function s(t){return Object(o.a)({url:"/storage/delete",method:"post",data:t})}var l="https://192.168.2.89/admin/storage/create"},xA6U:function(t,e,n){"use strict";n.d(e,"e",function(){return i}),n.d(e,"a",function(){return r}),n.d(e,"f",function(){return a}),n.d(e,"b",function(){return s}),n.d(e,"c",function(){return l}),n.d(e,"d",function(){return c});var o=n("t3Un");function i(t){return Object(o.a)({url:"/goods/list",method:"get",params:t})}function r(t){return Object(o.a)({url:"/goods/delete",method:"post",data:t})}function a(t){return Object(o.a)({url:"/goods/create",method:"post",data:t})}function s(t){return Object(o.a)({url:"/goods/detail",method:"get",params:{id:t}})}function l(t){return Object(o.a)({url:"/goods/update",method:"post",data:t})}function c(){return Object(o.a)({url:"/goods/catAndBrand",method:"get"})}}}]);