webpackJsonp([8],{552:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function l(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i,p,u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),s=n(1),c=r(s),f=n(273),d=n(272),m=n(163),y=(i=(0,m.connect)(function(e){return{Tips:e.Tips}},{loginUser:f.loginUser,openTips:d.openTips}),i(p=function(e){function t(){var e,n,r,l;o(this,t);for(var i=arguments.length,p=Array(i),u=0;u<i;u++)p[u]=arguments[u];return n=r=a(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(p))),r.handleClick=function(){var e=r.refs.operid,t=r.refs.password,n={operid:e.value.trim(),password:t.value.trim()};return n.operid?n.password?void r.props.loginUser(n):void r.props.openTips("未填写密码"):void r.props.openTips("未填写用户")},l=n,a(r,l)}return l(t,e),u(t,[{key:"render",value:function(){return c.default.createElement("div",{style:{background:"white"}},c.default.createElement("div",{style:{width:"300px",textAlign:"center",margin:"10px auto",padding:"30px 0"}},c.default.createElement("h3",{style:{textAlign:"center"}},"登录"),c.default.createElement("div",{className:"input-group",style:{marginRight:"10px"}},c.default.createElement("span",{className:"input-group-addon"},"账户:"),c.default.createElement("input",{name:"operid",type:"text",className:"form-control",ref:"operid",placeholder:"不能包含特殊字符"})),c.default.createElement("br",null),c.default.createElement("div",{className:"input-group",style:{marginRight:"10px"}},c.default.createElement("span",{className:"input-group-addon"},"密码:"),c.default.createElement("input",{name:"password",type:"password",className:"form-control",ref:"password",placeholder:"六位数字密码"})),c.default.createElement("br",null),c.default.createElement("button",{onClick:this.handleClick,className:"btn btn-primary",style:{width:"100%"}},"登录")))}}]),t}(s.Component))||p);t.default=y}});