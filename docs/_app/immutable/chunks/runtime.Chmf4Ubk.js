var Nn=Array.isArray,Wn=Array.from,Xn=Object.isFrozen,Jn=Object.defineProperty,nt=Object.getOwnPropertyDescriptor,tt=Object.prototype,et=Array.prototype,rt=Object.getPrototypeOf;const I=2,tn=4,q=8,en=16,T=32,K=64,R=128,M=256,E=512,m=1024,O=2048,x=4096,k=8192,Dn=16384,rn=32768,st=65536,ut=Symbol("$state"),lt=Symbol("$state.frozen");function sn(n){return n===this.v}function Cn(n,t){return n!=n?t==t:n!==t||n!==null&&typeof n=="object"||typeof n=="function"}function un(n){return!Cn(n,this.v)}const ot=1,it=2,ft=4,at=8,_t=16,ct=64,vt=1,pt=2,dt=4,ht=8,Et=1,mt=2,Tt="[",xn="]",At="",wt=`${xn}!`,Rt={},kn=Symbol(),St=["touchstart","touchmove","touchend"];function Pn(n){throw new Error("effect_in_teardown")}function qn(){throw new Error("effect_in_unowned_derived")}function Fn(n){throw new Error("effect_orphan")}function Ln(){throw new Error("effect_update_depth_exceeded")}function yt(){throw new Error("hydration_failed")}function It(n){throw new Error("props_invalid_value")}function Hn(){throw new Error("state_unsafe_mutation")}function ln(n){return{f:0,v:n,reactions:null,equals:sn,version:0}}function Ot(n){var e;const t=ln(n);return t.equals=un,d!==null&&d.l!==null&&((e=d.l).s??(e.s=[])).push(t),t}function Mn(n,t){var e=n.v!==kn;return e&&a!==null&&z()&&a.f&I&&Hn(),n.equals(t)||(n.v=t,n.version=Tn(),G(n,m,!0),z()&&e&&f!==null&&f.f&E&&!(f.f&T)&&(v!==null&&v.includes(n)?(h(f,m),U(f)):w===null?Kn([n]):w.push(n))),t}function Nt(n){var t=document.createElement("template");return t.innerHTML=n,t.content}function Yn(n){if(Nn(n))for(var t=0;t<n.length;t++){var e=n[t];e.isConnected&&e.remove()}else n.isConnected&&n.remove()}function on(n){f===null&&a===null&&Fn(),a!==null&&a.f&R&&qn(),$&&Pn()}function Q(n,t){var e=t.last;e===null?t.last=t.first=n:(e.next=n,n.prev=e,t.last=n)}function F(n,t,e){var r=(n&K)!==0,s={ctx:d,deps:null,dom:null,f:n|m,first:null,fn:t,last:null,next:null,parent:r?null:f,prev:null,teardown:null,transitions:null};if(e){var l=D;try{W(!0),g(s),s.f|=Dn}finally{W(l)}}else t!==null&&U(s);var _=e&&s.deps===null&&s.first===null&&s.dom===null&&s.teardown===null;return!_&&!r&&(f!==null&&Q(s,f),a!==null&&a.f&I&&Q(s,a)),s}function Dt(n){on();var t=f!==null&&(f.f&q)!==0&&d!==null&&!d.m;if(t){var e=d;(e.e??(e.e=[])).push(n)}else{var r=fn(n);return r}}function Ct(n){return on(),an(n)}function xt(n){const t=F(K,n,!0);return()=>{V(t)}}function fn(n){return F(tn,n,!1)}function an(n){return F(q,n,!0)}function kt(n){return an(n)}function Pt(n,t=0){return F(q|en|t,n,!0)}function qt(n){return F(q|T,n,!0)}function _n(n){var t=n.teardown;if(t!==null){const e=$,r=a;X(!0),J(null);try{t.call(null)}finally{X(e),J(r)}}}function V(n,t=!0){var e=n.dom;if(e!==null&&t&&Yn(e),Z(n,t),b(n,0),h(n,k),n.transitions)for(const s of n.transitions)s.stop();_n(n);var r=n.parent;r!==null&&n.f&T&&r.first!==null&&cn(n),n.next=n.prev=n.teardown=n.ctx=n.dom=n.deps=n.parent=n.fn=null}function cn(n){var t=n.parent,e=n.prev,r=n.next;e!==null&&(e.next=r),r!==null&&(r.prev=e),t!==null&&(t.first===n&&(t.first=r),t.last===n&&(t.last=e))}function Ft(n,t){var e=[];vn(n,e,!0),bn(e,()=>{V(n),t&&t()})}function bn(n,t){var e=n.length;if(e>0){var r=()=>--e||t();for(var s of n)s.out(r)}else t()}function vn(n,t,e){if(!(n.f&x)){if(n.f^=x,n.transitions!==null)for(const _ of n.transitions)(_.is_global||e)&&t.push(_);for(var r=n.first;r!==null;){var s=r.next,l=(r.f&rn)!==0||(r.f&T)!==0;vn(r,t,l?e:!1),r=s}}}function Lt(n){pn(n,!0)}function pn(n,t){if(n.f&x){n.f^=x,L(n)&&g(n);for(var e=n.first;e!==null;){var r=e.next,s=(e.f&rn)!==0||(e.f&T)!==0;pn(e,s?t:!1),e=r}if(n.transitions!==null)for(const l of n.transitions)(l.is_global||t)&&l.in()}}const Ht=()=>{};function gn(n){for(var t=0;t<n.length;t++)n[t]()}let Y=!1,B=[];function dn(){Y=!1;const n=B.slice();B=[],gn(n)}function Mt(n){Y||(Y=!0,queueMicrotask(dn)),B.push(n)}function Un(){Y&&dn()}function jn(n){let t=I|m;f===null&&(t|=R);const e={deps:null,deriveds:null,equals:sn,f:t,first:null,fn:n,last:null,reactions:null,v:null,version:0};if(a!==null&&a.f&I){var r=a;r.deriveds===null?r.deriveds=[e]:r.deriveds.push(e)}return e}function Yt(n){const t=jn(n);return t.equals=un,t}function hn(n){Z(n);var t=n.deriveds;if(t!==null){n.deriveds=null;for(var e=0;e<t.length;e+=1)Bn(t[e])}}function En(n){hn(n);var t=An(n),e=(N||n.f&R)&&n.deps!==null?O:E;h(n,e),n.equals(t)||(n.v=t,n.version=Tn(),G(n,m,!1))}function Bn(n){hn(n),b(n,0),h(n,k),n.first=n.last=n.deps=n.reactions=n.fn=null}const mn=0,zn=1;let H=mn,P=!1,D=!1,$=!1;function W(n){D=n}function X(n){$=n}let y=[],C=0,a=null;function J(n){a=n}let f=null,v=null,c=0,w=null;function Kn(n){w=n}let Vn=0,N=!1,d=null;function Tn(){return Vn++}function z(){return d!==null&&d.l===null}function L(n){var S;var t=n.f,e=(t&m)!==0;if(e)return!0;var r=(t&R)!==0,s=(t&M)!==0;if(t&O){var l=n.deps;if(l!==null)for(var _=l.length,o,u=0;u<_;u++){var i=l[u];!e&&L(i)&&En(i);var p=i.version;if(r){if(p>n.version)return!0;!N&&!((S=i==null?void 0:i.reactions)!=null&&S.includes(n))&&(i.reactions??(i.reactions=[])).push(n)}else{if(n.f&m)return!0;s&&(p>n.version&&(e=!0),o=i.reactions,o===null?i.reactions=[n]:o.includes(n)||o.push(n))}}r||h(n,E),s&&(n.f^=M)}return e}function $n(n,t,e){throw n}function An(n){const t=v,e=c,r=w,s=a,l=N;v=null,c=0,w=null,a=n.f&(T|K)?null:n,N=!D&&(n.f&R)!==0;try{let _=(0,n.fn)(),o=n.deps;if(v!==null){let u;if(o!==null){const i=o.length,p=c===0?v:o.slice(0,c).concat(v),A=p.length>16&&i-c>1?new Set(p):null;for(u=c;u<i;u++){const j=o[u];(A!==null?!A.has(j):!p.includes(j))&&wn(n,j)}}if(o!==null&&c>0)for(o.length=c+v.length,u=0;u<v.length;u++)o[c+u]=v[u];else n.deps=o=v;if(!N)for(u=c;u<o.length;u++){const i=o[u],p=i.reactions;p===null?i.reactions=[n]:p[p.length-1]!==n&&!p.includes(n)&&p.push(n)}}else o!==null&&c<o.length&&(b(n,c),o.length=c);return _}finally{v=t,c=e,w=r,a=s,N=l}}function wn(n,t){const e=t.reactions;let r=0;if(e!==null){r=e.length-1;const s=e.indexOf(n);s!==-1&&(r===0?t.reactions=null:(e[s]=e[r],e.pop()))}r===0&&t.f&I&&(h(t,O),t.f&(R|M)||(t.f^=M),b(t,0))}function b(n,t){const e=n.deps;if(e!==null){const r=t===0?null:e.slice(0,t);let s;for(s=t;s<e.length;s++){const l=e[s];(r===null||!r.includes(l))&&wn(n,l)}}}function Z(n,t=!0){let e=n.first;n.first=null,n.last=null;for(var r;e!==null;)r=e.next,V(e,t),e=r}function g(n){var t=n.f;if(!(t&k)){h(n,E);var e=n.ctx,r=f,s=d;f=n,d=e;try{t&en||Z(n),_n(n);var l=An(n);n.teardown=typeof l=="function"?l:null}catch(_){$n(_)}finally{f=r,d=s}}}function Rn(){C>1e3&&(C=0,Ln()),C++}function Sn(n){var t=n.length;if(t!==0){Rn();var e=D;D=!0;try{for(var r=0;r<t;r++){var s=n[r];if(s.first===null&&!(s.f&T))nn([s]);else{var l=[];yn(s,l),nn(l)}}}finally{D=e}}}function nn(n){var t=n.length;if(t!==0)for(var e=0;e<t;e++){var r=n[e];!(r.f&(k|x))&&L(r)&&(g(r),r.deps===null&&r.first===null&&r.dom===null&&(r.teardown===null?cn(r):r.fn=null))}}function Zn(){if(P=!1,C>1001)return;const n=y;y=[],Sn(n),P||(C=0)}function U(n){H===mn&&(P||(P=!0,queueMicrotask(Zn)));for(var t=n;t.parent!==null;){t=t.parent;var e=t.f;if(e&T){if(!(e&E))return;h(t,O)}}y.push(t)}function yn(n,t){var e=n.first,r=[];n:for(;e!==null;){var s=e.f,l=(s&(k|x))===0,_=s&T,o=(s&E)!==0,u=e.first;if(l&&(!_||!o)){if(_&&h(e,E),s&q){if(!_&&L(e)&&(g(e),u=e.first),u!==null){e=u;continue}}else if(s&tn)if(_||o){if(u!==null){e=u;continue}}else r.push(e)}var i=e.next;if(i===null){let A=e.parent;for(;A!==null;){if(n===A)break n;var p=A.next;if(p!==null){e=p;continue n}A=A.parent}}e=i}for(var S=0;S<r.length;S++)u=r[S],t.push(u),yn(u,t)}function In(n,t=!0){var e=H,r=y;try{Rn();const l=[];H=zn,y=l,P=!1,t&&Sn(r);var s=n==null?void 0:n();return Un(),(y.length>0||l.length>0)&&In(),C=0,s}finally{H=e,y=r}}async function bt(){await Promise.resolve(),In()}function On(n){const t=n.f;if(t&k)return n.v;if(a!==null){const e=(a.f&R)!==0,r=a.deps;v===null&&r!==null&&r[c]===n&&!(e&&f!==null)?c++:(r===null||c===0||r[c-1]!==n)&&(v===null?v=[n]:v[v.length-1]!==n&&v.push(n)),w!==null&&f!==null&&f.f&E&&!(f.f&T)&&w.includes(n)&&(h(f,m),U(f))}return t&I&&L(n)&&En(n),n.v}function G(n,t,e){var r=n.reactions;if(r!==null)for(var s=z(),l=r.length,_=0;_<l;_++){var o=r[_],u=o.f;if(!(u&m||(!e||!s)&&o===f)){h(o,t);var i=(u&O)!==0,p=(u&R)!==0;(u&E||i&&p)&&(o.f&I?G(o,O,e):U(o))}}}function gt(n){const t=a;try{return a=null,n()}finally{a=t}}const Gn=~(m|O|E);function h(n,t){n.f=n.f&Gn|t}function Qn(n){return typeof n=="object"&&n!==null&&typeof n.f=="number"}function Ut(n,t=1){var e=+On(n);return Mn(n,e+t),e}function jt(n,t=!1,e){d={p:d,c:null,e:null,m:!1,s:n,x:null,l:null},t||(d.l={s:null,u:null,r1:[],r2:ln(!1)})}function Bt(n){const t=d;if(t!==null){const r=t.e;if(r!==null){t.e=null;for(var e=0;e<r.length;e++)fn(r[e])}d=t.p,t.m=!0}return{}}function zt(n){return Qn(n)?On(n):n}export{Nt as $,ot as A,it as B,ct as C,vn as D,rn as E,bn as F,V as G,wt as H,x as I,_t as J,ft as K,at as L,Dt as M,Ut as N,jn as O,zt as P,xn as Q,Rt as R,lt as S,At as T,kn as U,In as V,yt as W,Wn as X,xt as Y,St as Z,d as _,ut as a,Et as a0,mt as a1,an as a2,It as a3,st as a4,dt as a5,un as a6,vt as a7,pt as a8,Yt as a9,ht as aa,Ct as ab,bt as ac,et as b,Nn as c,Jn as d,Mn as e,On as f,nt as g,f as h,Xn as i,rt as j,Pt as k,Lt as l,Ot as m,qt as n,tt as o,Ft as p,Ht as q,Yn as r,ln as s,fn as t,gt as u,jt as v,kt as w,Bt as x,Tt as y,Mt as z};
