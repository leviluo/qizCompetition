webpackJsonp([4],{285:function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var u,c,i=function(){function e(e,t){for(var a=0;a<t.length;a++){var l=t[a];l.enumerable=l.enumerable||!1,l.configurable=!0,"value"in l&&(l.writable=!0),Object.defineProperty(e,l.key,l)}}return function(t,a,l){return a&&e(t.prototype,a),l&&e(t,l),t}}(),f=a(1),d=l(f),p=a(272),s=a(163),m=a(214),D=(u=(0,s.connect)(function(e){return{Tips:e.Tips,articleDetailData:e.articleDetailDataQuotes.articleDetailData}},{articleDetailDataQuote:p.articleDetailDataQuote}),u(c=function(e){function t(){var e,a,l,o;n(this,t);for(var u=arguments.length,c=Array(u),i=0;i<u;i++)c[i]=arguments[i];return a=l=r(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(c))),l.componentWillMount=function(){var e=l.props.params.id;l.props.articleDetailDataQuote("/public/articleDetailData",{id:e}),!l.props.articleDetailData.updatedAt},l.componentDidUpdate=function(){l.props.articleDetailData.content&&(document.getElementById("content").innerHTML=l.props.articleDetailData.content)},o=a,r(l,o)}return o(t,e),i(t,[{key:"render",value:function(){if(!this.props.articleDetailData)return d.default.createElement("div",null);if(0==this.props.articleDetailData.type)var e="公告";else var e="规则";return d.default.createElement("div",{style:{background:"#fff"}},d.default.createElement("ol",{className:"breadcrumb"},d.default.createElement("li",null,d.default.createElement(m.IndexLink,{to:"/"},"主页")),d.default.createElement("li",null,d.default.createElement(m.Link,{to:"/articleLists"},"历史公告信息")),d.default.createElement("li",null,d.default.createElement("a",{className:"active"},"公告详情"))),d.default.createElement("table",{className:"table"},d.default.createElement("tbody",null,d.default.createElement("tr",null,d.default.createElement("td",null,"类型:"),d.default.createElement("td",null,e)),d.default.createElement("tr",null,d.default.createElement("td",null,"标题:"),d.default.createElement("td",null,d.default.createElement("strong",null,this.props.articleDetailData.title))),d.default.createElement("tr",null,d.default.createElement("td",null,"最后修改时间:"),d.default.createElement("td",null,this.props.articleDetailData.updatedAt.substr(0,10))),d.default.createElement("tr",null,d.default.createElement("td",{id:"content",colSpan:"2",style:{wordWrap:"break-word",wordBreak:"break-all"}})))))}}]),t}(f.Component))||c);t.default=D}});