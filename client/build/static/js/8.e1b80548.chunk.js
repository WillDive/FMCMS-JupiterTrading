(this["webpackJsonpjupiter-trading-fmcms"]=this["webpackJsonpjupiter-trading-fmcms"]||[]).push([[8],{718:function(e,c,t){"use strict";t.r(c);var n=t(15),a=t.n(n),s=t(23),i=t(165),r=t(40),l=t(12),d=t(1),j=t(22),b=t.n(j),u=t(89),p=t(681),h=t(682),m=(t(163),t(18));c.default=function(){Object(d.useContext)(u.b);var e=Object(d.useState)({machineId:"",businessId:"",acceptanceFile:""}),c=Object(l.a)(e,2),t=c[0],n=c[1],j=function(e){try{var c=e.target,a=c.name,s=c.value;n(Object(r.a)(Object(r.a)({},t),{},Object(i.a)({},a,s)))}catch(l){}},x=function(){var e=Object(s.a)(a.a.mark((function e(c){var n,s;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(c.preventDefault(),(n=new FormData).append("machineId",t.machineId),n.append("businessId",t.businessId),n.append("acceptanceFile",t.acceptanceFile),e.prev=5,"11111"===t.machineId){e.next=13;break}return e.next=9,b.a.post("/business/upload",n);case 9:s=e.sent,alert(s.data.msg),e.next=14;break;case 13:alert("Wrong value!");case 14:e.next=19;break;case 16:e.prev=16,e.t0=e.catch(5),alert(e.t0);case 19:case"end":return e.stop()}}),e,null,[[5,16]])})));return function(c){return e.apply(this,arguments)}}();return Object(m.jsx)(p.h,{children:Object(m.jsx)(p.i,{children:Object(m.jsxs)(p.v,{onSubmit:x,children:[Object(m.jsxs)(p.T,{children:[Object(m.jsx)(p.l,{xs:"12",children:Object(m.jsxs)(p.w,{children:["machineId",Object(m.jsx)(p.D,{id:"machineId",name:"machineId",placeholder:"Enter machineId.",value:t.machineId,onChange:j,required:!0})]})}),Object(m.jsx)(p.l,{xs:"12",children:Object(m.jsxs)(p.w,{children:["Name",Object(m.jsx)(p.D,{id:"businessId",name:"businessId",placeholder:"Enter sub machineId.",value:t.businessId,onChange:j,required:!0})]})}),Object(m.jsx)(p.l,{xs:"12",children:Object(m.jsxs)(p.w,{children:["File",Object(m.jsx)(p.D,{id:"acceptanceFile",type:"file",accept:".png, .jpg, .jpeg",name:"acceptanceFile",onChange:function(e){n(Object(r.a)(Object(r.a)({},t),{},{acceptanceFile:e.target.files[0]}))},required:!0})]})})]}),Object(m.jsx)(p.T,{className:"d-flex justify-content-center",children:Object(m.jsx)(p.l,{xs:"12",sm:"6",className:"d-flex justify-content-between",children:Object(m.jsxs)(p.e,{type:"submit",size:"sm",className:"px-4",color:"dark",children:[Object(m.jsx)(h.a,{name:"cil-save"})," Save Detail"]})})})]})})})}}}]);
//# sourceMappingURL=8.e1b80548.chunk.js.map