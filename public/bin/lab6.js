!function(e){function t(r){if(n[r])return n[r].exports;var l=n[r]={i:r,l:!1,exports:{}};return e[r].call(l.exports,l,l.exports,t),l.l=!0,l.exports}var n={};return t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=6)}([function(e,t,n){"use strict";e.exports=function(e,t,n){var r=[];if(0===n)throw Error("Can not iterate with step = 0");if(t>e&&n<0)for(var l=e;l<=t;l-=n)r.push(l);else if(t<e&&n<0)for(var o=e;o>=t;o+=n)r.push(o);else if(t<e&&n>0)for(var a=e;a>=t;a-=n)r.push(a);else for(var u=e;u<=t;u+=n)r.push(u);return r}},function(e,t,n){"use strict";function r(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}function l(e){return Array.from(new Set(e))}function o(e,t){return e.reduce(function(e,n,r){return n===t?e.concat(r):e},[])}function a(e,t){for(var n=[],r=e.length,l=0;l<t;l++)n.push(e[l%r]);return n}function u(e,t){for(var n=0;n<t.length;n++)e.insertCell(n).rowSpan=t[n]}function i(e,t){for(var n=Math.floor(t/e.length),r=t%e.length,a=new Array(e.length).fill(n),u=0;u<r;u++)a[u]+=1;for(var i=l(e).sort(),c=new Array(i.length).fill(0),f=0;f<i.length;f++){var s=i[f],d=o(e,s),m=!0,v=!1,y=void 0;try{for(var p,g=d[Symbol.iterator]();!(m=(p=g.next()).done);m=!0){var h=p.value;c[f]+=a[h]}}catch(e){v=!0,y=e}finally{try{!m&&g.return&&g.return()}finally{if(v)throw y}}}return c}function c(e,t,n){var r=0,o=l(e),a=!0,u=!1,i=void 0;try{for(var c,f=o[Symbol.iterator]();!(a=(c=f.next()).done);a=!0){var s=c.value;r+=Math.ceil((t-s)/n)}}catch(e){u=!0,i=e}finally{try{!a&&f.return&&f.return()}finally{if(u)throw i}}return r}function f(e,t,n){var r=0,o=[],a=l(e),u=!0,i=!1,c=void 0;try{for(var f,s=a[Symbol.iterator]();!(u=(f=s.next()).done);u=!0){var d=f.value;r+=Math.ceil((n-d)/t);var m=(n-d)%t;0!==m&&o.push(m)}}catch(e){i=!0,c=e}finally{try{!u&&s.return&&s.return()}finally{if(i)throw c}}for(var v=Math.min.apply(Math,o),y=new Array(r).fill(t),p=0;p<o.length;p++)y[y.length-p-1]=p+v;return y}function s(e,t,n,r){for(var l=[],o=new Set(e),a=0;a<t;a++)o.has(a+1)||l.push(a);for(var u=Math.floor(n.length/e.length),i=0,c=0;c<u;c++){for(var f=0;f<l.length;f++)n.splice(c+l[f]+i,0,0),r.splice(c+l[f]+i,0,0);i+=t-1}}function d(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:5,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:5,r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:3,l=arguments.length>4&&void 0!==arguments[4]?arguments[4]:[3,1,2];return("undefined"==typeof t?"undefined":m(t))===Object?v[e](t.rows,t.cols,t.blockHeight,t.template):v[e](t,n,r,l)}Object.defineProperty(t,"__esModule",{value:!0});var m="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};t.default=d;var v={};v[1]=function(e){var t=document.createElement("table");t.className="table-1",t.insertRow(0).insertCell(0).colSpan=e;for(var n=1;n<e;n++){var r=t.insertRow(n);r.insertCell(0).rowSpan=e-n,r.insertCell(1).colSpan=e-n}return t},v[2]=function(e){var t=document.createElement("table");t.className="table-2";for(var n=0;n<e-1;n++){var r=t.insertRow(n);r.insertCell(0).rowSpan=e-n,r.insertCell(1).colSpan=e-n}return t.insertRow(e-1).insertCell(0),t},v[3]=function(e){var t=document.createElement("table");t.className="table-3";for(var n=0;n<e;n++){var r=t.insertRow(n);n%2===0?(r.insertCell(0).colSpan=2,r.insertCell(1).colSpan=2,r.insertCell(2).colSpan=2,r.insertCell(3)):(r.insertCell(0),r.insertCell(1).colSpan=2,r.insertCell(2).colSpan=2,r.insertCell(3).colSpan=2)}return t},v[4]=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:3,l=arguments.length>3&&void 0!==arguments[3]?arguments[3]:[3,1,2];if(n<Math.max.apply(Math,r(l)))throw Error("Block height must be less than max template value");var o=document.createElement("table");o.className="table-4",u(o.insertRow(0),a(l,t));var d=a(i(l,t),c(l,e,n)),m=f(l,n,e);s(l,n,d,m);for(var v=0;v<m.length;v++)u(o.insertRow(v+1),new Array(d[v]).fill(m[v]));return o}},,,,,function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function l(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}function o(e,t){t.parentNode.insertBefore(e,t.nextSibling)}function a(e){e.parentNode.removeChild(e)}function u(e){if("SPAN"!==e.nextSibling.nodeName){e.style.backgroundColor="rgb(217, 184, 178)";var t=document.createElement("span");t.innerHTML="некорректное значение",t.style["margin-left"]="5px",t.style["font-size"]="1em",o(t,e)}}function i(e){e.nextSibling&&"SPAN"===e.nextSibling.nodeName&&(e.style.backgroundColor="white",a(e.nextSibling))}function c(){return[document.getElementById("start-input"),document.getElementById("end-input"),document.getElementById("step-input")]}function f(){var e=c(),t=e.filter(function(e){return!e.value});0===Number(e[2].value)&&t.push(e[2]);var n=e.filter(function(e){return!t.includes(e)});return t.forEach(function(e){return u(e)}),n.forEach(function(e){return i(e)}),!t.length&&e.map(function(e){return Number(e.value)})}function s(){var e=f();if(e){var t=document.createElement("pre");t.innerHTML=b.default.apply(void 0,l(e)).join(" "),o(t,document.getElementById("generate-loop"))}}function d(){return[document.getElementById("rows"),document.getElementById("cols"),document.getElementById("template")]}function m(){var e=d(),t=e.filter(function(e){return!e.value}),n=[0,1];n.forEach(function(n){Number(e[n].value)<=0&&t.push(e[n])});var r=e.filter(function(e){return!t.includes(e)});return t.forEach(function(e){return u(e)}),r.forEach(function(e){return i(e)}),!t.length&&(e[2]=e[2].options[e[2].selectedIndex].value.split(",").map(function(e){return Number(e)}),n.forEach(function(t){e[t]=Number(e[t].value)}),e)}function v(){var e=d()[0];return!e||Number(e.value)<=0?(u(e),!1):(i(e),Number(e.value))}function y(){var e=document.getElementById("table-number").selectedIndex+1;if(4===e){var t=m();t&&o((0,S.default)(e,t[0],t[1],3,t[2]),document.getElementById("generate-table"))}else{var n=v();n&&o((0,S.default)(e,n),document.getElementById("generate-table"))}}function p(){var e=document.getElementById("table-number").selectedIndex+1,t=document.getElementById("for-table-4");4===e?t.style.display="block":t.style.display="none"}function g(e,t){for(var n=document.getElementsByClassName("tabcontent"),r=0;r<n.length;r++)n[r].style.display="none";for(var l=document.getElementsByClassName("tablinks"),o=0;o<l.length;o++)l[o].className=l[o].className.replace(" active","");document.getElementById(t).style.display="block",document.getElementById(e).className+=" active"}var h=n(0),b=r(h),E=n(1),S=r(E);document.getElementById("generate-loop").addEventListener("click",s),document.getElementById("generate-table").addEventListener("click",y),document.getElementById("table-number").addEventListener("change",p),document.getElementById("tab-loop").addEventListener("click",g.bind(null,"tab-loop","div-loop")),document.getElementById("tab-table").addEventListener("click",g.bind(null,"tab-table","div-table")),document.getElementsByClassName("defaultOpen")[0].click()}]);