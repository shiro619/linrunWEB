webpackJsonp([22],{"9fmK":function(n,t,e){(n.exports=e("FZ+f")(!1)).push([n.i,"\n.social-signup-container[data-v-6f8497f2] {\n  margin: 20px 0;\n}\n.social-signup-container .sign-btn[data-v-6f8497f2] {\n    display: inline-block;\n    cursor: pointer;\n}\n.social-signup-container .icon[data-v-6f8497f2] {\n    color: #fff;\n    font-size: 30px;\n    margin-top: 6px;\n}\n.social-signup-container .wx-svg-container[data-v-6f8497f2],\n  .social-signup-container .qq-svg-container[data-v-6f8497f2] {\n    display: inline-block;\n    width: 40px;\n    height: 40px;\n    line-height: 40px;\n    text-align: center;\n    padding-top: 1px;\n    border-radius: 4px;\n    margin-bottom: 20px;\n    margin-right: 5px;\n}\n.social-signup-container .wx-svg-container[data-v-6f8497f2] {\n    background-color: #8dc349;\n}\n.social-signup-container .qq-svg-container[data-v-6f8497f2] {\n    background-color: #6BA2D6;\n    margin-left: 50px;\n}\n",""])},dZXH:function(n,t,e){"use strict";function i(n,t,e,i){var o=void 0!==window.screenLeft?window.screenLeft:screen.left,c=void 0!==window.screenTop?window.screenTop:screen.top,s=(window.innerWidth?window.innerWidth:document.documentElement.clientWidth?document.documentElement.clientWidth:screen.width)/2-e/2+o,a=(window.innerHeight?window.innerHeight:document.documentElement.clientHeight?document.documentElement.clientHeight:screen.height)/2-i/2+c,r=window.open(n,t,"toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes, copyhistory=no, width="+e+", height="+i+", top="+a+", left="+s);window.focus&&r.focus()}Object.defineProperty(t,"__esModule",{value:!0});var o={name:"social-signin",methods:{wechatHandleClick:function(n){this.$store.commit("SET_AUTH_TYPE",n);i("https://open.weixin.qq.com/connect/qrconnect?appid=xxxxx&redirect_uri="+encodeURIComponent("xxx/redirect?redirect="+window.location.origin+"/authredirect")+"&response_type=code&scope=snsapi_login#wechat_redirect",n,540,540)},tencentHandleClick:function(n){this.$store.commit("SET_AUTH_TYPE",n);i("https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=xxxxx&redirect_uri="+encodeURIComponent("xxx/redirect?redirect="+window.location.origin+"/authredirect"),n,540,540)}}},c={render:function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",{staticClass:"social-signup-container"},[e("div",{staticClass:"sign-btn",on:{click:function(t){n.wechatHandleClick("wechat")}}},[e("span",{staticClass:"wx-svg-container"},[e("svg-icon",{staticClass:"icon",attrs:{"icon-class":"wechat"}})],1),n._v(" 微信\n  ")]),n._v(" "),e("div",{staticClass:"sign-btn",on:{click:function(t){n.tencentHandleClick("tencent")}}},[e("span",{staticClass:"qq-svg-container"},[e("svg-icon",{staticClass:"icon",attrs:{"icon-class":"qq"}})],1),n._v(" QQ\n  ")])])},staticRenderFns:[]},s=e("VU/8")(o,c,!1,function(n){e("jMcj")},"data-v-6f8497f2",null);t.default=s.exports},jMcj:function(n,t,e){var i=e("9fmK");"string"==typeof i&&(i=[[n.i,i,""]]),i.locals&&(n.exports=i.locals);e("rjj0")("4cd86128",i,!0)}});