webpackJsonp([8],{11:function(t,e,n){(function(e,o,s){var i=n(8),a=n(6),l=n(17);t.exports={props:["transparent"],mixins:[a],data:function(){return{showTeam:!1,applyPending:!1,applyName:"",applyDis:"",newMsg:!1,proxy:!!e.get("proxy"),bShowApply:!(document.title.indexOf("DOClever")>-1),admin:sessionStorage.getItem("admin"),adminPhoto:"/html/web/pic/admin/admin.jpeg",adminPage:location.href.indexOf("admin.html")>-1?1:0}},directives:{proxy:i},watch:{proxy:function(t){t?(e.set("proxy",1),o.tip("Proxy代理已开启",1)):(e.remove("proxy"),o.tip("Proxy代理已关闭",1))}},methods:{handleCommand:function(t){if("team"==t)location.href="/html/web/team/team.html";else if("list"==t)location.href="/html/web/project/project.html";else if("apply"==t)this.showTeam=!0,document.getElementById("navBar").style.zIndex="",this.$refs.team.$on("close",function(){document.getElementById("navBar").style.zIndex=100});else if("setting"==t)location.href="/html/web/person/person.html";else if("message"==t){var i=this;o.startHud(),s.get("/message/list",{page:0}).then(function(t){if(o.stopHud(),200==t.code){i.newMsg=!1,document.getElementById("navBar").style.zIndex="";o.showBox(i,n(13),{propArr:t.data}).$on("close",function(){document.getElementById("navBar").style.zIndex=100})}else o.notify(t.msg,0)})}else if("update"==t){var a=new XMLHttpRequest;o.startHud(),a.onreadystatechange=function(){if(4==a.readyState&&200==a.status){o.stopHud();for(var t=JSON.parse(a.responseText),e=t[0].name.split("."),n=l.version.split("."),s=!1,i=0;i<3;i++){if(e[i]>n[i]){s=!0;break}if(e[i]<n[i])break}s?o.confirm("已发现新版本"+e.join(".")+" 是否现在下载？",function(){window.open(t[0].zipball_url,"_blank")}):o.tip("已经是最新版本了",1)}},a.open("GET","https://api.github.com/repos/sx1989827/DOClever/tags?timestamp="+(new Date).getTime(),!0),a.send()}else if("quit"==t){var i=this;this.adminPage?s.post("/admin/logout",{}).then(function(t){200==t.code&&(i.$notify({title:"退出成功",type:"success"}),sessionStorage.removeItem("admin"),setTimeout(function(){location.href="/"},1e3))}):s.post("/user/logout",{}).then(function(t){200==t.code&&(i.$notify({title:"退出成功",type:"success"}),e.clear(),setTimeout(function(){location.href="/"},1e3))})}},applyTeam:function(){if(!this.applyName)return void o.tip("请输入团队ID",0);this.applyPending=!0;var t=this;s.put("/team/userapply",{id:this.applyName,dis:this.applyDis}).then(function(e){t.applyPending=!1,t.applyName="",t.applyDis="",200==e.code?(o.notify("请求已发送，等待团队管理员响应",1),t.showTeam=!1):o.notify(e.msg,0)})}},created:function(){var t;this.$nextTick(function(){t=document.getElementById("navBar"),t.style.zIndex=100});var n=this;this.transparent&&o.addEventListener(window,"scroll",function(){document.body.scrollTop>50?(t.style.position="fixed",t.style.top=0,t.style.backgroundColor="rgb(39,52,68)"):(t.style.top=0,t.style.backgroundColor="rgba(0,0,0,0.3)",t.style.position="absolute")}),e.get("id")&&s.get("/message/new").then(function(t){200==t.code?n.newMsg=t.data:o.notify(t.msg,0)})}}}).call(e,n(3),n(0),n(2))},12:function(t,e,n){(function(e,o){var s=n(16);t.exports={props:["propArr"],data:function(){return{arr:this.propArr,page:0,clearPending:!1,loading:!1,finish:!1,showDialog:!1}},directives:{scroll:s},methods:{remove:function(t,n){var s=this;e.confirm("是否删除该消息",function(){e.startHud(),o.delete("/message/item",{id:t._id}).then(function(t){e.stopHud(),200==t.code?(e.notify("删除成功",1),s.arr.splice(n,1)):e.notify(t.msg,0)})})},clear:function(){var t=this;e.confirm("是否清空所有消息",function(){t.clearPending=!0,o.delete("/message/clear").then(function(n){t.clearPending=!1,200==n.code?(e.notify("清空成功",1),t.$refs.box.close()):e.notify(n.msg,0)})})},loadMore:function(t){var n=this;this.loading=!0,o.get("/message/list",{page:++this.page}).then(function(o){200==o.code?(n.loading=!1,o.data.length>0?(n.arr=n.arr.concat(o.data),t()):(t(1),n.finish=!0)):e.notify(o.msg,0)})}}}}).call(e,n(0),n(2))},13:function(t,e,n){var o=n(1)(n(12),n(14),null,null);o.options.__file="/Users/sunxin/DOClever/Client/web/component/message.vue",o.esModule&&Object.keys(o.esModule).some(function(t){return"default"!==t&&"__esModule"!==t})&&console.error("named exports are not supported in *.vue files."),o.options.functional&&console.error("[vue-loader] message.vue: functional components are not supported with templates, they should use render functions."),t.exports=o.exports},14:function(t,e,n){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("el-dialog",{ref:"box",attrs:{title:"消息中心",size:"small"},model:{value:t.showDialog,callback:function(e){t.showDialog=e},expression:"showDialog"}},[n("el-row",{directives:[{name:"scroll",rawName:"v-scroll",value:t.loadMore,expression:"loadMore"}],staticClass:"row",staticStyle:{height:"300px","overflow-y":"auto"}},[t._l(t.arr,function(e){return[n("el-row",{staticClass:"row",staticStyle:{"font-size":"17px",height:"30px","line-height":"30px"}},[t._v("\n                "+t._s(e.name)+"\n            ")]),t._v(" "),n("el-row",{staticClass:"row",staticStyle:{"font-size":"15px"}},[t._v("\n                "+t._s(e.dis)+"\n            ")]),t._v(" "),n("el-row",{staticClass:"row",staticStyle:{color:"gray",height:"30px","line-height":"30px"}},[t._v("\n                "+t._s(e.createdAt)+"   \n                "),n("el-button",{staticStyle:{color:"#FF4949"},attrs:{type:"text",size:"small",icon:"delete2",titile:"删除"},on:{click:function(n){t.remove(e,t.index)}}})],1)]}),t._v(" "),t.finish?t._e():n("el-row",{staticClass:"row",staticStyle:{height:"30px"},attrs:{loading:t.loading}})],2),t._v(" "),n("el-row",{staticClass:"dialog-footer",slot:"footer"},[n("el-button",{attrs:{type:"danger",loading:t.clearPending},on:{click:t.clear}},[t._v("\n            清空消息\n        ")])],1)],1)},staticRenderFns:[]},t.exports.render._withStripped=!0},15:function(t,e,n){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("el-row",{staticClass:"row",staticStyle:{"box-shadow":"0 1px 3px 0 rgba(0, 0, 0, 0.15)"},style:t.transparent?{height:"50px",backgroundColor:"rgba(0,0,0,0.3)",left:0,top:0,position:"absolute"}:{height:"50px",backgroundColor:"white"},attrs:{id:"navBar"}},[t._t("other"),t._v(" "),n("el-col",{staticClass:"col",staticStyle:{"text-align":"left","line-height":"50px",color:"#50bfff","font-size":"25px","padding-left":"20px"},attrs:{span:3}},[n("a",{staticStyle:{"text-decoration":"none",cursor:"pointer",color:"inherit"},attrs:{href:"/"}},[t._v("DOClever")])]),t._v(" "),n("el-col",{staticClass:"col",staticStyle:{"text-align":"center","line-height":"50px"},attrs:{span:2}},[t._t("slot3")],2),t._v(" "),n("el-col",{staticClass:"col",staticStyle:{"text-align":"center","line-height":"50px"},attrs:{span:2}},[t._t("slot4")],2),t._v(" "),n("el-col",{staticClass:"col",staticStyle:{"text-align":"center","line-height":"50px"},attrs:{span:1}}),t._v(" "),n("el-col",{staticClass:"col",staticStyle:{"text-align":"center","line-height":"50px","font-size":"25px",color:"#50bfff","white-space":"nowrap","text-overflow":"ellipsis"},attrs:{span:8}},[t._t("title")],2),t._v(" "),n("el-col",{staticClass:"col",staticStyle:{"text-align":"center","line-height":"50px"},attrs:{span:2}},[t._t("slot1")],2),t._v(" "),n("el-col",{staticClass:"col",staticStyle:{"text-align":"center","line-height":"50px"},attrs:{span:2}},[t._t("slot2")],2),t._v(" "),t.session.id||t.adminPage?n("el-col",{staticClass:"col",staticStyle:{"white-space":"nowrap","text-align":"center","line-height":"50px"},attrs:{span:4}},[n("img",{directives:[{name:"proxy",rawName:"v-proxy",value:t.adminPage?t.adminPhoto:t.session.photo,expression:"adminPage?adminPhoto:session.photo"}],staticStyle:{width:"40px",height:"40px","border-radius":"50%","margin-top":"5px"}}),t._v(" \n        "),n("el-dropdown",{staticStyle:{top:"-15px"},on:{command:t.handleCommand}},[t.adminPage?n("span",{staticClass:"el-dropdown-link",staticStyle:{color:"#50bfff",cursor:"pointer"}},[n("span",[t._v("\n                    "+t._s(t.admin)+"\n                ")]),t._v(" "),n("i",{staticClass:"el-icon-caret-bottom el-icon--right"})]):n("span",{staticClass:"el-dropdown-link",staticStyle:{color:"#50bfff",cursor:"pointer"}},[t.newMsg?n("el-badge",{staticClass:"msgBadge",attrs:{"is-dot":""}},[t._v("\n                    "+t._s(t.session.name)+"\n                ")]):n("span",[t._v("\n                    "+t._s(t.session.name)+"\n                ")]),t._v(" "),n("i",{staticClass:"el-icon-caret-bottom el-icon--right"})],1),t._v(" "),t.adminPage?n("el-dropdown-menu",{slot:"dropdown"},[n("el-dropdown-item",{attrs:{command:"quit"}},[t._v("退出")])],1):n("el-dropdown-menu",{slot:"dropdown"},[t.session.team?n("el-dropdown-item",{attrs:{command:"team"}},[t._v("团队首页")]):t._e(),t._v(" "),n("el-dropdown-item",{attrs:{command:"list"}},[t._v("返回列表")]),t._v(" "),t.bShowApply?n("el-dropdown-item",{attrs:{command:"apply"}},[t._v("团队申请")]):t._e(),t._v(" "),n("el-dropdown-item",{attrs:{command:"setting"}},[t._v("个人设置")]),t._v(" "),n("el-dropdown-item",{attrs:{command:"message"}},[t.newMsg?n("el-badge",{staticClass:"msgBadge",attrs:{"is-dot":""}},[t._v("\n                        消息中心\n                    ")]):n("span",[t._v("\n                        消息中心\n                    ")])],1),t._v(" "),n("el-dropdown-item",[t._v("\n                    Proxy:"),n("br"),t._v(" "),n("el-switch",{attrs:{"on-color":"#13ce66","off-color":"#ff4949"},nativeOn:{click:function(t){t.stopPropagation()}},model:{value:t.proxy,callback:function(e){t.proxy=e},expression:"proxy"}})],1),t._v(" "),n("el-dropdown-item",{attrs:{command:"update"}},[t._v("检查更新")]),t._v(" "),n("el-dropdown-item",{attrs:{command:"quit"}},[t._v("退出")])],1)],1)],1):t._e(),t._v(" "),t.session.id||t.adminPage?t._e():n("el-col",{staticClass:"col",staticStyle:{"text-align":"center","line-height":"50px"},attrs:{span:2}},[n("el-button",{attrs:{type:"info",onclick:"location='/html/web/login/login.html'"}},[t._v("登录")])],1),t._v(" "),t.session.id||t.adminPage?t._e():n("el-col",{staticClass:"col",staticStyle:{"text-align":"center","line-height":"50px"},attrs:{span:2}},[n("el-button",{attrs:{type:"success",onclick:"location='/html/web/register/register.html'"}},[t._v("注册")])],1),t._v(" "),n("el-dialog",{ref:"team",attrs:{title:"团队申请",size:"small"},model:{value:t.showTeam,callback:function(e){t.showTeam=e},expression:"showTeam"}},[n("el-form",{ref:"form",attrs:{"label-width":"100px"}},[n("el-form-item",{attrs:{label:"团队ID"}},[n("el-input",{staticStyle:{width:"80%"},attrs:{placeholder:"请输入你要申请的团队ID"},model:{value:t.applyName,callback:function(e){t.applyName=e},expression:"applyName"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"备注"}},[n("el-input",{staticStyle:{width:"80%"},attrs:{type:"textarea",rows:2,placeholder:"请输入你要申请的备注"},model:{value:t.applyDis,callback:function(e){t.applyDis=e},expression:"applyDis"}})],1)],1),t._v(" "),n("span",{staticClass:"dialog-footer",slot:"footer"},[n("el-button",{on:{click:function(e){t.showTeam=!1}}},[t._v("取 消")]),t._v(" "),n("el-button",{attrs:{type:"primary",loading:t.applyPending},on:{click:t.applyTeam}},[t._v("确 定")])],1)],1)],2)},staticRenderFns:[]},t.exports.render._withStripped=!0},16:function(t,e){var n={bind:function(t,e,n){function o(e){t.removeAttribute("scrolling"),1==e&&t.removeEventListener("scroll",s)}function s(n){t.scrollTop+t.clientHeight>=t.scrollHeight-50&&!t.hasAttribute("scrolling")&&e.value&&(t.setAttribute("scrolling","1"),e.value(o))}t.addEventListener("scroll",s)},unbind:function(t){},update:function(t,e){}};t.exports=n},17:function(t,e){t.exports={version:"4.2.1"}},350:function(t,e,n){(function(t,e){var o=n(9);new t({el:"#app",data:{isLogin:!!e.get("id")},components:{mainnav:o},methods:{}})}).call(e,n(5),n(3))},6:function(t,e,n){(function(e,n){t.exports={data:function(){return{session:e.clone(n.raw())}},created:function(){var t=this;document.addEventListener("cookieChange",function(e){t.session[e.key]=e.value})}}}).call(e,n(0),n(3))},8:function(t,e,n){var o=n(10),s={bind:function(t,e){if(t.src="/html/web/pic/logo.png",e.value){var n=new Image;n.src=o.host+e.value,n.onload=function(){t.src=n.src}}},unbind:function(t){},update:function(t,e){if(e.oldValue!=e.value&&e.value){var n=new Image;n.src=o.host+e.value,t.src="/html/web/pic/logo.png",n.onload=function(){t.src=n.src}}}};t.exports=s},9:function(t,e,n){var o=n(1)(n(11),n(15),null,null);o.options.__file="/Users/sunxin/DOClever/Client/web/component/mainNav.vue",o.esModule&&Object.keys(o.esModule).some(function(t){return"default"!==t&&"__esModule"!==t})&&console.error("named exports are not supported in *.vue files."),o.options.functional&&console.error("[vue-loader] mainNav.vue: functional components are not supported with templates, they should use render functions."),t.exports=o.exports}},[350]);