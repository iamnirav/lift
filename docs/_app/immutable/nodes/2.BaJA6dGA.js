import{e as fe,j as R,b as W,h as _e,q as ce,u as re,s as G,c as N,d as ve,E as Y,v as Z,w as X,g as pe,x as de,y as he,z as ge,m as me,p as m,o as J,n as ae,t as le,r as z}from"../chunks/disclose-version.CWWOu6ic.js";import{y as Ee,c as be,z as ie,n as oe,A as Se,I as Te,B as Ae,h as ne,e as T,w as ye,s as I,C as we,D as xe,E as Ie,i as Ce,S as De,a as Re,p as ke,F as Oe,x as q,q as He,G as Le,f as a,H as M,J as B}from"../chunks/runtime.CS8Xg7a3.js";import{d as Ne,s as K}from"../chunks/render.Qpeqm3W4.js";import{p as F}from"../chunks/proxy.C0vaw4_y.js";let P=null;function Me(r,e){return e}function Ye(r,e,t,u){for(var f=[],_=e.length,n=0;n<_;n++)we(e[n].e,f,!0);var c=_>0&&f.length===0&&t!==null;if(c){var p=t.parentNode;pe(p),p.append(t),u.clear(),C(r,e[0].prev,e[_-1].next)}xe(f,()=>{for(var d=0;d<_;d++){var E=e[d];c||(u.delete(E.k),C(r,E.prev,E.next)),Ie(E.e,!c)}})}function $e(r,e,t,u,f,_=null){var n=r,c={flags:e,items:new Map,first:null};{var p=r;n=R?W(p.firstChild):p.appendChild(fe())}R&&_e();var d=null;Ee(()=>{var E=t(),s=be(E)?E:E==null?[]:Array.from(E),h=s.length,i=c.flags;i&X&&!Ce(s)&&!(De in s)&&!(Re in s)&&(i^=X,i&he&&!(i&Y)&&(i^=Y));let v=!1;if(R){var g=n.data===ce;g!==(h===0)&&(n=re(),W(n),G(!1),v=!0)}if(R){for(var b=null,A,S=0;S<h;S++){if(N.nodeType===8&&N.data===ve){n=N,v=!0,G(!1);break}var l=s[S],o=u(l,S);A=ue(N,c,b,null,l,o,S,f,i),c.items.set(o,A),b=A}h>0&&W(re())}R||ze(s,c,n,f,i,u),_!==null&&(h===0?d?ie(d):d=oe(()=>_(n)):d!==null&&Se(d,()=>{d=null})),v&&G(!0)}),R&&(n=N)}function ze(r,e,t,u,f,_){var x,$,j,ee;var n=(f&de)!==0,c=(f&(Y|Z))!==0,p=r.length,d=e.items,E=e.first,s=E,h=new Set,i=null,v=new Set,g=[],b=[],A,S,l,o;if(n)for(o=0;o<p;o+=1)A=r[o],S=_(A,o),l=d.get(S),l!==void 0&&((x=l.a)==null||x.measure(),v.add(l));for(o=0;o<p;o+=1){if(A=r[o],S=_(A,o),l=d.get(S),l===void 0){var V=s?s.e.nodes.start:t;i=ue(V,e,i,i===null?e.first:i.next,A,S,o,u,f),d.set(S,i),g=[],b=[],s=i.next;continue}if(c&&qe(l,A,o,f),l.e.f&Te&&(ie(l.e),n&&(($=l.a)==null||$.unfix(),v.delete(l))),l!==s){if(h.has(l)){if(g.length<b.length){var D=b[0],y;i=D.prev;var k=g[0],O=g[g.length-1];for(y=0;y<g.length;y+=1)se(g[y],D,t);for(y=0;y<b.length;y+=1)h.delete(b[y]);C(e,k.prev,O.next),C(e,i,k),C(e,O,D),s=D,i=O,o-=1,g=[],b=[]}else h.delete(l),se(l,s,t),C(e,l.prev,l.next),C(e,l,i===null?e.first:i.next),C(e,i,l),i=l;continue}for(g=[],b=[];s!==null&&s.k!==S;)h.add(s),b.push(s),s=s.next;if(s===null)continue;l=s}g.push(l),i=l,s=l.next}const w=Array.from(h);for(;s!==null;)w.push(s),s=s.next;var H=w.length;if(H>0){var L=f&ge&&p===0?t:null;if(n){for(o=0;o<H;o+=1)(j=w[o].a)==null||j.measure();for(o=0;o<H;o+=1)(ee=w[o].a)==null||ee.fix()}Ye(e,w,L,d)}n&&Ae(()=>{var te;for(l of v)(te=l.a)==null||te.apply()}),ne.first=e.first&&e.first.e,ne.last=i&&i.e}function qe(r,e,t,u){u&Y&&T(r.v,e),u&Z?T(r.i,t):r.i=t}function ue(r,e,t,u,f,_,n,c,p){var d=P;try{var E=(p&Y)!==0,s=(p&X)===0,h=E?s?ye(f):I(f):f,i=p&Z?I(n):n,v={i,v:h,k:_,a:null,e:null,prev:t,next:u};return P=v,v.e=oe(()=>c(r,h,i),R),v.e.prev=t&&t.e,v.e.next=u&&u.e,t===null?e.first=v:(t.next=v,t.e.next=v.e),u!==null&&(u.prev=v,u.e.prev=v.e),v}finally{P=d}}function se(r,e,t){for(var u=r.next?r.next.e.nodes.start:t,f=e?e.e.nodes.start:t,_=r.e.nodes.start;_!==u;){var n=_.nextSibling;f.before(_),_=n}}function C(r,e,t){e===null?r.first=t:(e.next=t,e.e.next=t&&t.e),t!==null&&(t.prev=e,t.e.prev=e&&e.e)}function Q(r,e,t){t?r.classList.add(e):r.classList.remove(e)}const Be=!0,je=Object.freeze(Object.defineProperty({__proto__:null,prerender:Be},Symbol.toStringTag,{value:"Module"}));function U(r){return new Date(r).toISOString().slice(14,-5)}function Fe(r,e,t,u){T(e,F(Date.now())),T(t,F(Date.now())),T(u,!0)}function Ve(r,e,t,u,f){T(e,0),T(t,!1),T(u,0),T(f,1e3*60*2)}function We(r,e,t){T(e,F(Date.now())),Le(t)}function Ge(r,e){const t=prompt("Enter weight:");t&&T(e,+t)}function Je(r,e){const t=prompt("Enter rest duration (in minutes):");t&&T(e,1e3*60*+t)}var Ke=le('<span class="svelte-1bl7yh4"> </span>'),Pe=le("<h1>Lift</h1> <p></p> <button>Complete Set</button> <p> </p> <p> </p> <button>Set Weight</button> <button>Set Rest</button> <button>Start</button> <button>Reset</button>",1);function et(r,e){ke(e,!0);let t=I(0),u=I(0),f=I(0),_=I(0),n=I(!1),c=I(0),p=I(1e3*60*2);Oe(()=>{const w=setInterval(()=>{T(t,F(Date.now()))});return()=>clearInterval(w)});const d=M(()=>[a(c)/2,a(c)*3/4,a(c),a(c),a(c),a(c),a(c)]),E=M(()=>a(t)-a(u)),s=M(()=>a(t)-a(f));var h=Pe(),i=me(h),v=m(m(i,!0));$e(v,73,()=>a(d),Me,(w,H,L)=>{var x=Ke(),$=J(x);z(x),q(()=>{Q(x,"complete",a(n)&&B(L)<a(_)),Q(x,"rest",a(n)&&B(L)===a(_)&&a(s)<a(p)),Q(x,"go",a(n)&&B(L)===a(_)&&(a(s)>=a(p)||a(_)===0)),K($,B(H))}),ae(w,x)}),z(v);var g=m(m(v,!0));g.__click=[We,f,_];var b=m(m(g,!0)),A=J(b);const S=M(()=>a(n)?U(a(s)):"00:00"),l=M(()=>U(a(p)));q(()=>K(A,`Rest time: ${a(S)} / ${a(l)}`)),z(b);var o=m(m(b,!0)),V=J(o);q(()=>K(V,`Total time: ${(a(n)?U(a(E)):"00:00")??""}`)),z(o);var D=m(m(o,!0));D.__click=[Ge,c];var y=m(m(D,!0));y.__click=[Je,p];var k=m(m(y,!0));k.__click=[Fe,u,f,n];var O=m(m(k,!0));O.__click=[Ve,_,n,c,p],q(()=>{g.disabled=!a(n),k.disabled=a(n)||!a(c)}),ae(r,h),He()}Ne(["click"]);export{et as component,je as universal};
