(this["webpackJsonpblog-frontend"]=this["webpackJsonpblog-frontend"]||[]).push([[0],{114:function(e,t,n){},115:function(e,t,n){"use strict";n.r(t);var s,c,a,r=n(1),i=n.n(r),l=n(45),o=n.n(l),j=n(7),d=n.n(j),u=n(3),b=n.n(u),x=n(8),m=n(2),p=n(9),h=n(5),O=n(13),f=n(14),g=n.n(f),v=n(52),y=n(0),N=g.a.span(s||(s=Object(O.a)(["\n  bg-gray-900\n  text-white\n  px-3\n  py-2\n  rounded-md\n  text-sm\n  font-medium\n  ","\n"])),(function(e){return Object(p.h)().pathname===e.to?"bg-green-300":"bg-transparent hover:bg-gray-700 hover:text-white"})),w=function(e){var t=e.to,n=e.linkDesc,s=e.onClick,c=void 0===s?function(){}:s;return Object(y.jsx)(h.b,{to:t,onClick:c,children:Object(y.jsx)(N,{to:t,children:n})})},C=g.a.div(c||(c=Object(O.a)(["\n  sm:hidden\n  inline-flex\n  items-center\n  justify-center\n  m-2 \n  rounded-md\n  text-gray-400\n  hover:text-white\n  hover:bg-gray-700\n  focus:outline-none\n  focus:ring-2\n  focus:ring-inset\n  focus:ring-white\n"]))),k=function(e){var t=e.siteName,n=e.navItems;return Object(y.jsx)("nav",{className:"bg-gray-900 px-2 sm:px-6 lg:px-8",children:Object(y.jsxs)("div",{className:"relative max-w-7xl ml-auto mr-auto flex items-center justify-between h-16",children:[Object(y.jsx)(C,{"aria-controls":"mobile-menu","aria-expanded":"false",children:Object(y.jsx)(v.a,{direction:"right",size:20})}),Object(y.jsxs)("div",{className:"flex-1 flex items-center justify-center sm:items-stretch sm:justify-start",children:[Object(y.jsx)("div",{className:"flex-shrink-0 flex items-center",children:Object(y.jsx)("h1",{className:"text-white font-bold text-lg",children:Object(y.jsx)(h.b,{to:"/",children:t})})}),Object(y.jsx)("div",{className:"hidden sm:block sm:ml-auto",children:Object(y.jsx)("ul",{className:"flex space-x-4",children:n.map((function(e){return Object(y.jsx)(w,{to:e.to,linkDesc:e.linkDesc,onClick:e.onClick?e.onClick:function(){}},e.linkDesc)}))})})]})]})})},I=function(e){var t=e.children,n=e.signedInId,s=e.setUser,c=Object(p.g)(),a=function(){var e=Object(x.a)(b.a.mark((function e(){return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:d.a.post("/sign-out",{},{withCredentials:!0}).then((function(){s(null),c.push("/")}));case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),r=n?[{to:"/",linkDesc:"Home"},{to:"/posts",linkDesc:"Feed"},{to:"/users/".concat(n),linkDesc:"Profile"},{to:"/sign-out",linkDesc:"Sign Out",onClick:a}]:[{to:"/",linkDesc:"Home"},{to:"/sign-in",linkDesc:"Sign In"},{to:"/sign-up",linkDesc:"Sign Up"}];return Object(y.jsxs)("div",{className:"min-h-screen flex flex-col items-stretch bg-gray-900",children:[Object(y.jsx)(k,{siteName:"Console Log",navItems:r}),Object(y.jsx)("div",{className:"text-gray-100 container mx-auto mt-6 px-3 flex-1 flex flex-col",children:t})]})},S=n(11),E=n.n(S),P=n(47),D=function(){return Object(y.jsx)("div",{className:"flex-1 flex justify-center items-center",children:Object(y.jsx)(P.a,{color:"#6EE7B7",size:"64"})})},U=n(116),L=function(e){var t=e.post;return Object(y.jsx)(h.b,{to:"posts/".concat(t._id),children:Object(y.jsxs)("div",{className:"bg-gray-700 rounded my-5 pt-3 pb-5 px-4",children:[Object(y.jsxs)("div",{className:"mb-2",children:[Object(y.jsx)("p",{className:"font-bold",children:t.author.name}),Object(y.jsx)("p",{className:"text-sm text-gray-300",children:Object(U.a)(new Date(t.datePosted)," LLLL d, y 'at' h:mm a")})]}),Object(y.jsx)("h2",{className:"font-bold text-lg underline",children:t.title}),Object(y.jsx)("p",{className:"max-h-16 text-sm overflow-hidden overflow-ellipsis",children:t.body})]})})},_=function(e){var t=e.statusCode;return Object(y.jsxs)("div",{className:"container mx-auto w-full text-gray-200",children:[Object(y.jsx)("h1",{className:"pt-10 text-4xl mb-3",children:" Error ".concat(t)}),Object(y.jsx)("p",{className:"text-gray-300",children:"Whatever you are looking for could not be found"})]})},A=Object(r.createContext)(void 0),q=function(){return Object(r.useContext)(A)},B=function(e){var t=e.children,n=Object(p.g)(),s=Object(r.useState)(""),c=Object(m.a)(s,2),a=c[0],i=c[1];Object(r.useEffect)((function(){return n.listen((function(){return i("")}))}),[]);var l=Object(r.useMemo)((function(){return{setErrorStatusCode:i}}),[i]);return Object(y.jsx)(A.Provider,{value:l,children:a?Object(y.jsx)(_,{statusCode:a}):t})},M=n(12),H=n(20),R=["children"],F=g.a.button(a||(a=Object(O.a)(["\n  px-4\n  py-1.5\n  text-white\n  ","\n  ","\n  rounded-sm\n"])),(function(e){return("primary"===e.color?"bg-green-400 hover:bg-green-600":"secondary"===e.color&&"bg-blue-300 hover:bg-blue-500")||""}),(function(e){return e.className}));function T(e){var t=e.children,n=Object(H.a)(e,R);return Object(y.jsx)(F,Object(M.a)(Object(M.a)({},n),{},{children:t}))}var z,J,W,Y=function(e){var t=e.isAdmin,n=q().setErrorStatusCode,s=Object(r.useState)(),c=Object(m.a)(s,2),a=c[0],i=c[1];return Object(r.useEffect)((function(){Object(x.a)(b.a.mark((function e(){var t;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,d.a.get("/posts",{withCredentials:!0});case 3:t=e.sent,i(t.data.posts),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),n(e.t0.response.status);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})))()}),[]),a?Object(y.jsxs)("div",{className:"w-full",children:[Object(y.jsxs)("div",{className:"flex justify-between",children:[Object(y.jsx)("h1",{className:"text-3xl font-bold",children:"Feed"}),Object(y.jsx)("span",{children:t?Object(y.jsx)(h.b,{to:"/posts/new",children:Object(y.jsx)(T,{color:"primary",children:"Create Post"})}):null})]}),a.map((function(e){return Object(y.jsx)(L,{post:e},E()())}))]}):Object(y.jsx)(D,{})},G=["label"],K=g.a.input(z||(z=Object(O.a)(["\n  shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline\n"]))),Q=g.a.label(J||(J=Object(O.a)(["\n  block text-sm font-bold text-md mb-2\n"]))),V=function(e){var t=e.label,n=void 0===t?"":t,s=Object(H.a)(e,G);return Object(y.jsxs)("div",{className:"py-2",children:[n?Object(y.jsx)(Q,{children:n}):null,Object(y.jsx)(K,Object(M.a)({},s))]})},X=function(e){var t=e.setUser,n=Object(r.useState)(""),s=Object(m.a)(n,2),c=s[0],a=s[1],i=Object(r.useState)(""),l=Object(m.a)(i,2),o=l[0],j=l[1],u=Object(r.useState)([]),h=Object(m.a)(u,2),O=h[0],f=h[1],g=Object(p.g)();function v(){a(""),j(""),f([])}function N(){return(N=Object(x.a)(b.a.mark((function e(n){var s;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n.preventDefault(),e.prev=1,e.next=4,d.a.post("/sign-in",{email:c,password:o},{withCredentials:!0});case 4:s=e.sent,v(),t(s.data.user),g.push("/"),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(1),e.t0.response.data.msg?f([e.t0.response.data.msg]):e.t0.response.data.validationErrs?f(e.t0.response.data.validationErrs.errors.map((function(e){return e.msg}))):f(["An error occured"]);case 13:case"end":return e.stop()}}),e,null,[[1,10]])})))).apply(this,arguments)}return Object(y.jsx)("div",{className:"w-full flex-1 flex justify-center items-center",children:Object(y.jsx)("div",{className:"mx-3 w-2/3 md:w-1/2 lg:w-1/3 bg-gray-700 rounded",children:Object(y.jsxs)("form",{onSubmit:function(e){return N.apply(this,arguments)},className:"text-white w-full pt-6 px-9 pb-8",children:[Object(y.jsx)("h1",{className:"text-2xl text-center font-bold mb-5",children:"Sign In"}),Object(y.jsx)("ul",{className:"mb-3",children:O.map((function(e){return Object(y.jsx)("li",{className:"text-red-200",children:e},E()())}))}),Object(y.jsx)(V,{type:"text",name:"email",value:c,label:"Email",onChange:function(e){a(e.target.value)},className:"text-gray-700",required:!0}),Object(y.jsx)(V,{type:"password",name:"password",value:o,label:"Password",onChange:function(e){j(e.target.value)},className:"text-gray-700",required:!0}),Object(y.jsx)(T,{color:"primary",type:"submit",className:"rounded w-full my-3",children:"Sign In"})]})})})},Z=n(50),$=n.n(Z),ee=function(e){var t=e.signedInId,n=Object(r.useState)(),s=Object(m.a)(n,2),c=s[0],a=s[1],i=Object(p.i)().id,l=q().setErrorStatusCode;return Object(r.useEffect)((function(){Object(x.a)(b.a.mark((function e(){var t;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,d.a.get("/users/".concat(i),{withCredentials:!0});case 3:t=e.sent,a(t.data.user),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),l(e.t0.response.status);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})))()}),[]),c?Object(y.jsxs)("div",{children:[Object(y.jsxs)("section",{className:"py-3",children:[Object(y.jsx)("h2",{className:"text-3xl inline mr-3",children:c.name}),Object(y.jsx)("span",{className:"text-green-300",children:"@".concat(c.username)}),Object(y.jsx)("p",{className:"text-gray-300 mb-3",children:c.email}),Object(y.jsx)("p",{className:"text-gray-300 mb-3",children:$()(c.role)}),t===c._id?Object(y.jsx)(h.b,{to:"/users/".concat(c._id,"/edit"),children:Object(y.jsx)(T,{color:"primary",children:"Edit Profile"})}):null]}),"admin"===c.role?Object(y.jsxs)("div",{children:[Object(y.jsx)("h2",{className:"text-xl mb-3",children:"Posts"}),Object(y.jsx)("ul",{className:"sm:w-2/3 lg:w-1/2",children:c.posts.map((function(e){return Object(y.jsx)(h.b,{to:"/posts/".concat(e._id),children:Object(y.jsx)("li",{className:"text-gray-900 my-3 rounded px-3 py-2 ".concat(e.published?"bg-gray-300":"bg-yellow-300"),children:e.title},E()())})}))})]}):null,Object(y.jsxs)("section",{className:"py-3",children:[Object(y.jsx)("h2",{className:"text-xl",children:"Comments"}),Object(y.jsx)("ul",{className:"sm:w-2/3 lg:w-1/2",children:c.comments.map((function(e){return Object(y.jsx)("li",{className:"bg-gray-300 text-gray-900 my-3 rounded px-3 py-2",children:e.message},E()())}))})]})]}):Object(y.jsx)(D,{})},te=n(24),ne=n(25),se=n.p+"static/media/preview.cf7d4c78.png",ce=g.a.li(W||(W=Object(O.a)(["\n  mx-4\n"])));function ae(e){var t=e.signedInId;return Object(y.jsx)("div",{className:"flex-auto bg-gray-900 text-white p-3",children:Object(y.jsxs)("div",{className:"container mx-auto mt-6",children:[Object(y.jsxs)("div",{className:"flex flex-col md:flex-row items-center content-center justify-center",children:[Object(y.jsxs)("div",{className:"flex flex-col text-md items-center content-center justify-center p-3 md:mr-7 mb-4 text-center md:text-left",children:[Object(y.jsx)("h1",{className:"font-bold text-4xl mb-5",children:"Welcome to Console Logger"}),Object(y.jsx)("p",{children:"This is a computer science oriented blogging website built in React"}),Object(y.jsx)("div",{className:"flex w-full justify-center md:justify-start mt-7",children:t?Object(y.jsx)("div",{children:Object(y.jsx)(T,{className:"mr-3",color:"primary",children:Object(y.jsx)(h.b,{to:"/posts",children:"Feed"})})}):Object(y.jsxs)("div",{children:[Object(y.jsx)(T,{className:"mr-3",color:"primary",children:Object(y.jsx)(h.b,{to:"/sign-up",children:"Sign Up"})}),Object(y.jsx)(T,{color:"primary",children:Object(y.jsx)(h.b,{to:"/sign-in",children:"Sign in"})})]})})]}),Object(y.jsx)("div",{className:"p-5 lg:w-1/2 md:w-2/3",children:Object(y.jsx)("img",{src:se,alt:"Site preview"})})]}),Object(y.jsx)("div",{className:"mt-16 md:mt-48",children:Object(y.jsxs)("ul",{className:"text-6xl flex justify-center",children:[Object(y.jsx)(ce,{children:Object(y.jsx)(te.a,{icon:ne.c})}),Object(y.jsx)(ce,{children:Object(y.jsx)(te.a,{icon:ne.a})}),Object(y.jsx)(ce,{children:Object(y.jsx)(te.a,{icon:ne.b})})]})})]})})}var re,ie,le=n(51),oe=n.n(le),je=["label"],de=g.a.textarea(re||(re=Object(O.a)(["\n  shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline\n"]))),ue=g.a.label(ie||(ie=Object(O.a)(["\n  block text-sm font-bold text-md mb-2\n"]))),be=function(e){var t=e.label,n=void 0===t?"":t,s=Object(H.a)(e,je);return Object(y.jsxs)("div",{className:"py-2",children:[n?Object(y.jsx)(ue,{children:n}):null,Object(y.jsx)(de,Object(M.a)({},s))]})},xe=function(e){var t=e.action,n=e.signedInId,s=Object(r.useState)(""),c=Object(m.a)(s,2),a=c[0],i=c[1],l=Object(r.useState)(""),o=Object(m.a)(l,2),j=o[0],u=o[1],h=Object(r.useState)(!0),O=Object(m.a)(h,2),f=O[0],g=O[1],v=Object(r.useState)([]),N=Object(m.a)(v,2),w=N[0],C=N[1],k=Object(p.i)().id,I=Object(p.g)();Object(r.useEffect)((function(){Object(x.a)(b.a.mark((function e(){var t,s;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!k){e.next=15;break}return e.prev=1,e.next=4,d.a.get("/posts/".concat(k),{withCredentials:!0});case 4:t=e.sent,(s=t.data.post).author._id!==n&&I.push("/"),i(s.title),u(s.body),g(s.published),e.next=15;break;case 12:e.prev=12,e.t0=e.catch(1),B(e.t0.response.status);case 15:case"end":return e.stop()}}),e,null,[[1,12]])})))()}),[]);return Object(y.jsx)("div",{children:Object(y.jsxs)("form",{onSubmit:function(e){e.preventDefault(),Object(x.a)(b.a.mark((function e(){var n,s;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,"create"!==t){e.next=9;break}return e.next=4,d.a.post("/posts",{title:a,body:j,published:f},{withCredentials:!0});case 4:n=e.sent,s=n.data.post,I.push("/posts/".concat(s._id)),e.next=12;break;case 9:return e.next=11,d.a.put("/posts/".concat(k),{title:a,body:j,published:f},{withCredentials:!0});case 11:I.push("/posts/".concat(k));case 12:e.next=17;break;case 14:e.prev=14,e.t0=e.catch(0),e.t0.response.data.validationErrs?C(e.t0.response.data.validationErrs.errors.map((function(e){return e.msg}))):C(["An error occured"]);case 17:case"end":return e.stop()}}),e,null,[[0,14]])})))()},children:[Object(y.jsx)("h1",{className:"text-2xl mb-3",children:"create"===t?"Create A Post":"Update A Post"}),Object(y.jsx)("ul",{className:"mb-3",children:w.map((function(e){return Object(y.jsx)("li",{className:"text-red-200",children:e},E()())}))}),Object(y.jsxs)("div",{className:"pt-4 pb-8",children:[Object(y.jsx)(V,{type:"text",name:"title",value:a,label:"Title",onChange:function(e){i(e.target.value)},className:"text-gray-700"}),Object(y.jsx)(be,{name:"body",value:j,label:"Body",onChange:function(e){u(e.target.value)},className:"h-32"}),Object(y.jsxs)("div",{className:"flex items-center",children:[Object(y.jsx)("span",{className:"font-bold mr-3",children:"Published"}),Object(y.jsx)(oe.a,{onChange:function(e){g(e)},checked:f,onColor:"#6EE7B7",onHandleColor:"#10B981",handleDiameter:20,uncheckedIcon:!1,checkedIcon:!1,boxShadow:"0px 1px 5px rgba(0, 0, 0, 0.6)",activeBoxShadow:"0px 0px 1px 10px rgba(0, 0, 0, 0.2)",height:15,width:48,className:"react-switch",id:"material-switch"})]})]}),Object(y.jsx)(T,{type:"submit",color:"primary",className:"mr-3",children:"create"===t?"Create":"Update"}),Object(y.jsx)(T,{type:"button",color:"secondary",onClick:function(){I.goBack()},children:"Cancel"})]})})},me=function(e){var t=e.comment,n=e.getPosts,s=Object(r.useState)(!1),c=Object(m.a)(s,2),a=c[0],i=c[1],l=Object(r.useState)(""),o=Object(m.a)(l,2),j=o[0],u=o[1],p=Object(r.useState)(),O=Object(m.a)(p,2),f=O[0],g=O[1];return Object(y.jsxs)("div",{className:"bg-gray-700 my-3 rounded px-3 py-3 w-2/3 md:w-1/2",children:[Object(y.jsxs)("div",{className:"flex justify-between",children:[Object(y.jsx)(h.b,{to:"/users/".concat(t.author._id),className:"font-bold",children:t.author.username}),Object(y.jsx)("span",{className:"underline",children:t._id})]}),Object(y.jsx)("p",{className:"text-sm text-gray-300",children:Object(U.a)(new Date(t.datePosted),"MM/dd/yy HH:mm:ss")}),"Comment"===t.parentModel?Object(y.jsx)("p",{className:"text-sm text-green-300",children:t.parent}):null,Object(y.jsxs)("p",{className:"pt-3",children:[t.parentComment?Object(y.jsx)("p",{className:"underline text-green-300",children:"@".concat(t.parentComment)}):null,t.message]}),Object(y.jsx)("div",{children:Object(y.jsx)(T,{type:"button",className:"text-sm mt-2",onClick:function(){i(!0)},children:"REPLY"})}),f?Object(y.jsx)("ul",{className:"mb-3",children:f.map((function(e){return Object(y.jsx)("li",{className:"text-red-200",children:e},E()())}))}):null,a?Object(y.jsxs)("form",{onSubmit:function(e){e.preventDefault(),Object(x.a)(b.a.mark((function e(){return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,d.a.post("/comments/".concat(t.parentPost),{message:j,parentComment:t._id},{withCredentials:!0});case 3:return e.next=5,n();case 5:u(""),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),e.t0.response.data.validationErrs?g(e.t0.response.data.validationErrs.errors.map((function(e){return e.msg}))):g(["An error occured"]);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})))()},children:[Object(y.jsx)(V,{type:"text",name:"comment",value:j,placeholder:"Reply with something",onChange:function(e){u(e.target.value)},onClick:function(){i(!0)},className:"bg-transparent text-gray-200",required:!0,autoComplete:"off"}),Object(y.jsxs)("div",{className:"flex justify-end",children:[Object(y.jsx)(T,{type:"button",className:"text-gray-300 mr-3",onClick:function(){i(!1)},children:"CANCEL"}),Object(y.jsx)(T,{type:"submit",className:"text-gray-300 bg-gray-600",children:"REPLY"})]})]}):null]})},pe=function(e){var t=e.postId,n=e.getPosts,s=Object(r.useState)(""),c=Object(m.a)(s,2),a=c[0],i=c[1],l=Object(r.useState)([]),o=Object(m.a)(l,2),j=o[0],u=o[1],p=Object(r.useState)(!1),h=Object(m.a)(p,2),O=h[0],f=h[1];return Object(y.jsxs)("form",{onSubmit:function(e){e.preventDefault(),Object(x.a)(b.a.mark((function e(){return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,d.a.post("/comments/".concat(t),{message:a},{withCredentials:!0});case 3:return e.next=5,n();case 5:i(""),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),e.t0.response.data.validationErrs?u(e.t0.response.data.validationErrs.errors.map((function(e){return e.msg}))):u(["An error occured"]);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})))()},children:[Object(y.jsx)(V,{type:"text",name:"message",value:a,placeholder:"Comment something",onChange:function(e){i(e.target.value)},onClick:function(){f(!0)},required:!0,className:"text-gray-700",autoComplete:"off"}),j?Object(y.jsx)("ul",{className:"mb-3",children:j.map((function(e){return Object(y.jsx)("li",{className:"text-red-200",children:e},E()())}))}):null,O?Object(y.jsxs)("div",{className:"flex justify-end",children:[Object(y.jsx)(T,{type:"button",className:"text-gray-300 mr-3",onClick:function(){f(!1)},children:"CANCEL"}),Object(y.jsx)(T,{type:"submit",className:"text-gray-300 bg-gray-600",children:"COMMENT"})]}):null]})},he=function(e){var t=e.signedInId,n=Object(r.useState)(),s=Object(m.a)(n,2),c=s[0],a=s[1],i=Object(p.i)().id,l=q().setErrorStatusCode,o=function(){var e=Object(x.a)(b.a.mark((function e(){var t;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,d.a.get("/posts/".concat(i),{withCredentials:!0});case 3:t=e.sent,a(t.data.post),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),l(e.t0.response.status);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}();return Object(r.useEffect)((function(){o()}),[]),c?Object(y.jsxs)("div",{children:[Object(y.jsxs)("section",{className:"bg-gray-700 rounded pt-3 pb-5",children:[Object(y.jsxs)("section",{className:"px-4 pb-3",children:[Object(y.jsx)("h1",{className:"text-3xl",children:c.title}),Object(y.jsxs)("div",{className:"mb-6",children:[Object(y.jsx)("div",{children:Object(y.jsxs)(h.b,{to:"/users/".concat(c.author._id),children:[Object(y.jsx)("span",{children:c.author.name}),Object(y.jsx)("span",{className:"ml-3 text-green-300",children:"@".concat(c.author.username)})]})}),Object(y.jsx)("p",{className:"text-sm text-gray-300",children:Object(U.a)(new Date(c.datePosted)," LLLL d, y 'at' h:mm a")})]}),Object(y.jsx)("p",{children:c.body})]}),t===c.author._id?Object(y.jsxs)("div",{children:[Object(y.jsx)("hr",{className:"h-0.5 border-gray-400 bg-gray-700"}),Object(y.jsx)("div",{className:"py-3 px-3",children:Object(y.jsx)(h.b,{to:"/posts/".concat(c._id,"/edit"),children:Object(y.jsx)(T,{color:"primary",children:"Edit Post"})})})]}):null,Object(y.jsx)("hr",{className:"h-0.5 border-gray-400 bg-gray-700"}),Object(y.jsx)("section",{className:"px-3 pt-3",children:Object(y.jsx)(pe,{postId:c._id,getPosts:o})})]}),c.comments.map((function(e){return Object(y.jsx)(me,{comment:e,getPosts:o},E()())}))]}):Object(y.jsx)(D,{})},Oe=function(e){var t=e.action,n=e.setUser,s=e.signedInId,c=Object(r.useState)(""),a=Object(m.a)(c,2),i=a[0],l=a[1],o=Object(r.useState)(""),j=Object(m.a)(o,2),u=j[0],h=j[1],O=Object(r.useState)(""),f=Object(m.a)(O,2),g=f[0],v=f[1],N=Object(r.useState)(""),w=Object(m.a)(N,2),C=w[0],k=w[1],I=Object(r.useState)([]),S=Object(m.a)(I,2),P=S[0],D=S[1],U=Object(p.g)(),L=Object(p.i)().id;function _(){return(_=Object(x.a)(b.a.mark((function e(s){var c,a;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(s.preventDefault(),e.prev=1,"create"!==t){e.next=10;break}return e.next=5,d.a.post("/sign-up",{name:i,email:u,username:g,password:C},{withCredentials:!0});case 5:c=e.sent,n(c.data.user),U.push("/"),e.next=15;break;case 10:return e.next=12,d.a.put("/users/".concat(L),{name:i,email:u,username:g,password:C},{withCredentials:!0});case 12:a=e.sent,n(a.data.user),U.push("/users/".concat(L));case 15:e.next=20;break;case 17:e.prev=17,e.t0=e.catch(1),e.t0.response?D(e.t0.response.data.validationErrs.errors.map((function(e){return e.msg}))):D(["An error occured"]);case 20:case"end":return e.stop()}}),e,null,[[1,17]])})))).apply(this,arguments)}return Object(r.useEffect)((function(){Object(x.a)(b.a.mark((function e(){var t,n;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!L){e.next=15;break}return L!==s&&U.push("/"),e.prev=2,e.next=5,d.a.get("/users/".concat(L),{withCredentials:!0});case 5:t=e.sent,n=t.data.user,l(n.name),h(n.email),v(n.username),e.next=15;break;case 12:e.prev=12,e.t0=e.catch(2),B(e.t0.respons.status);case 15:case"end":return e.stop()}}),e,null,[[2,12]])})))()}),[]),Object(y.jsx)("div",{className:"w-full flex-1 flex justify-center items-center",children:Object(y.jsx)("div",{className:"mx-3 w-2/3 md:w-1/2 lg:w-1/3 bg-gray-700 rounded",children:Object(y.jsxs)("form",{onSubmit:function(e){return _.apply(this,arguments)},className:"text-white w-full pt-6 px-9 pb-8",children:[Object(y.jsx)("h1",{className:"text-2xl text-center font-bold mb-5",children:"create"===t?"Sign Up":"Edit Profile"}),Object(y.jsx)("ul",{className:"mb-3",children:P.map((function(e){return Object(y.jsx)("li",{className:"text-red-200",children:e},E()())}))}),Object(y.jsx)(V,{type:"text",name:"name",value:i,label:"Name",onChange:function(e){l(e.target.value)},className:"text-gray-700",required:!0}),Object(y.jsx)(V,{type:"text",name:"email",value:u,label:"Email",onChange:function(e){h(e.target.value)},className:"text-gray-700",required:!0}),Object(y.jsx)(V,{type:"text",name:"username",value:g,label:"Username",onChange:function(e){v(e.target.value)},className:"text-gray-700",required:!0}),Object(y.jsx)(V,{type:"password",name:"password",value:C,label:"Password",onChange:function(e){k(e.target.value)},className:"text-gray-700",required:!0}),Object(y.jsx)(T,{type:"submit",color:"primary",className:"rounded w-full my-3",children:"create"===t?"Sign Up":"Update"})]})})})},fe=function(e){var t=e.component,n=e.exact,s=e.path,c=e.signedInId;return Object(y.jsx)(p.b,{exact:n,path:s,render:function(){return c?Object(y.jsx)(p.b,{component:t}):Object(y.jsx)(p.a,{to:{pathname:"/sign-in"}})}})},ge=function(e){var t=e.component,n=e.exact,s=e.path,c=e.isAdmin;return Object(y.jsx)(p.b,{exact:n,path:s,render:function(){return c?Object(y.jsx)(p.b,{component:t}):Object(y.jsx)(p.a,{to:{pathname:"/"}})}})},ve=function(){var e=Object(r.useState)(""),t=Object(m.a)(e,2),n=t[0],s=t[1],c=Object(r.useState)(!1),a=Object(m.a)(c,2),i=a[0],l=a[1],o=Object(r.useState)(!1),j=Object(m.a)(o,2),u=j[0],O=j[1],f=function(e){e?(s(e._id),l("admin"===e.role)):(s(""),l(!1))};return Object(r.useEffect)((function(){Object(x.a)(b.a.mark((function e(){var t,n;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,d.a.post("/auth",{},{withCredentials:!0});case 2:(t=e.sent).data.user&&(n=t.data.user,f(n)),O(!0);case 5:case"end":return e.stop()}}),e)})))()}),[]),Object(y.jsx)(h.a,{children:Object(y.jsx)(I,{signedInId:n,setUser:f,children:u?Object(y.jsx)(B,{children:Object(y.jsxs)(p.d,{children:[Object(y.jsx)(p.b,{exact:!0,path:"/",component:function(){return Object(y.jsx)(ae,{signedInId:n})}}),Object(y.jsx)(fe,{exact:!0,path:"/posts",component:function(){return Object(y.jsx)(Y,{isAdmin:i})},signedInId:n}),Object(y.jsx)(ge,{exact:!0,path:"/posts/new",component:function(){return Object(y.jsx)(xe,{action:"create"})},isAdmin:i}),Object(y.jsx)(fe,{exact:!0,path:"/posts/:id/edit",component:function(){return Object(y.jsx)(xe,{action:"edit",signedInId:n})},signedInId:n}),Object(y.jsx)(fe,{exact:!0,path:"/posts/:id",component:function(){return Object(y.jsx)(he,{signedInId:n})},signedInId:n}),Object(y.jsx)(fe,{exact:!0,path:"/users/:id",component:function(){return Object(y.jsx)(ee,{signedInId:n})},signedInId:n}),Object(y.jsx)(fe,{exact:!0,path:"/users/:id/edit",signedInId:n,component:function(){return Object(y.jsx)(Oe,{action:"edit",setUser:f,signedInId:n})}}),n?null:Object(y.jsxs)("div",{children:[Object(y.jsx)(p.b,{exact:!0,path:"/sign-up",component:function(){return Object(y.jsx)(Oe,{action:"create",setUser:f,signedInId:n})}}),Object(y.jsx)(p.b,{exact:!0,path:"/sign-in",component:function(){return Object(y.jsx)(X,{setUser:f})}})]}),Object(y.jsx)(p.b,{render:function(){return Object(y.jsx)(_,{statusCode:"404"})}})]})}):Object(y.jsx)(D,{})})})};n(114);d.a.defaults.baseURL="http://localhost:3001",o.a.render(Object(y.jsx)(i.a.StrictMode,{children:Object(y.jsx)(ve,{})}),document.getElementById("root"))}},[[115,1,2]]]);
//# sourceMappingURL=main.9db73ce9.chunk.js.map