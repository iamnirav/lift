var $n=Array.isArray,Gn=Array.from,Jn=Object.isFrozen,Qn=Object.defineProperty,Wn=Object.getOwnPropertyDescriptor,Zn=Object.prototype,Xn=Array.prototype,nr=Object.getPrototypeOf;const rr=()=>{};function On(n){for(var r=0;r<n.length;r++)n[r]()}const g=2,X=4,C=8,nn=16,m=32,K=64,x=128,L=256,E=512,d=1024,R=2048,A=4096,D=8192,Sn=16384,rn=32768,tr=65536,An=1<<18,ur=Symbol("$state"),lr=Symbol("$state.frozen");function tn(n){return n===this.v}function Cn(n,r){return n!=n?r==r:n!==r||n!==null&&typeof n=="object"||typeof n=="function"}function un(n){return!Cn(n,this.v)}function Rn(n){throw new Error("effect_in_teardown")}function Dn(){throw new Error("effect_in_unowned_derived")}function Nn(n){throw new Error("effect_orphan")}function bn(){throw new Error("effect_update_depth_exceeded")}function er(){throw new Error("hydration_failed")}function sr(n){throw new Error("props_invalid_value")}function jn(){throw new Error("state_unsafe_mutation")}function ln(n){return{f:0,v:n,reactions:null,equals:tn,version:0}}function or(n){var t;const r=ln(n);return r.equals=un,c!==null&&c.l!==null&&((t=c.l).s??(t.s=[])).push(r),r}function In(n,r){return f!==null&&z()&&f.f&g&&jn(),n.equals(r)||(n.v=r,n.version=kn(),en(n,d),z()&&i!==null&&i.f&E&&!(i.f&m)&&(_!==null&&_.includes(n)?(p(i,d),H(i)):k===null?Hn([n]):k.push(n))),r}function en(n,r){var t=n.reactions;if(t!==null)for(var u=z(),e=t.length,l=0;l<e;l++){var s=t[l],o=s.f;o&d||!u&&s===i||(p(s,r),o&(E|x)&&(o&g?en(s,R):H(s)))}}function sn(n){i===null&&f===null&&Nn(),f!==null&&f.f&x&&Dn(),V&&Rn()}function G(n,r){var t=r.last;t===null?r.last=r.first=n:(t.next=n,n.prev=t,r.last=n)}function N(n,r,t,u=!0){var e=(n&K)!==0,l={ctx:c,deps:null,nodes:null,f:n|d,first:null,fn:r,last:null,next:null,parent:e?null:i,prev:null,teardown:null,transitions:null,version:0};if(t){var s=O;try{J(!0),B(l),l.f|=Sn}catch(a){throw P(l),a}finally{J(s)}}else r!==null&&H(l);var o=t&&l.deps===null&&l.first===null&&l.nodes===null&&l.teardown===null;return!o&&!e&&u&&(i!==null&&G(l,i),f!==null&&f.f&g&&G(l,f)),l}function ir(n){const r=N(C,null,!1);return p(r,E),r.teardown=n,r}function fr(n){sn();var r=i!==null&&(i.f&C)!==0&&c!==null&&!c.m;if(r){var t=c;(t.e??(t.e=[])).push(n)}else{var u=on(n);return u}}function ar(n){return sn(),fn(n)}function _r(n){const r=N(K,n,!0);return()=>{P(r)}}function on(n){return N(X,n,!1)}function fn(n){return N(C,n,!0)}function vr(n){return fn(n)}function cr(n,r=0){return N(C|nn|r,n,!0)}function hr(n,r=!0){return N(C|m,n,!0,r)}function an(n){var r=n.teardown;if(r!==null){const t=V,u=f;Q(!0),W(null);try{r.call(null)}finally{Q(t),W(u)}}}function P(n,r=!0){var t=!1;if((r||n.f&An)&&n.nodes!==null){for(var u=n.nodes.start,e=n.nodes.end;u!==null;){var l=u===e?null:u.nextSibling;u.remove(),u=l}t=!0}if($(n,r&&!t),Y(n,0),p(n,D),n.transitions)for(const o of n.transitions)o.stop();an(n);var s=n.parent;s!==null&&n.f&m&&s.first!==null&&_n(n),n.next=n.prev=n.teardown=n.ctx=n.deps=n.parent=n.fn=n.nodes=null}function _n(n){var r=n.parent,t=n.prev,u=n.next;t!==null&&(t.next=u),u!==null&&(u.prev=t),r!==null&&(r.first===n&&(r.first=u),r.last===n&&(r.last=t))}function pr(n,r){var t=[];vn(n,t,!0),Ln(t,()=>{P(n),r&&r()})}function Ln(n,r){var t=n.length;if(t>0){var u=()=>--t||r();for(var e of n)e.out(u)}else r()}function vn(n,r,t){if(!(n.f&A)){if(n.f^=A,n.transitions!==null)for(const s of n.transitions)(s.is_global||t)&&r.push(s);for(var u=n.first;u!==null;){var e=u.next,l=(u.f&rn)!==0||(u.f&m)!==0;vn(u,r,l?t:!1),u=e}}}function wr(n){cn(n,!0)}function cn(n,r){if(n.f&A){n.f^=A,j(n)&&B(n);for(var t=n.first;t!==null;){var u=t.next,e=(t.f&rn)!==0||(t.f&m)!==0;cn(t,e?r:!1),t=u}if(n.transitions!==null)for(const l of n.transitions)(l.is_global||r)&&l.in()}}let M=!1,U=[];function hn(){M=!1;const n=U.slice();U=[],On(n)}function Er(n){M||(M=!0,queueMicrotask(hn)),U.push(n)}function Mn(){M&&hn()}function Pn(n){let r=g|d;i===null&&(r|=x);const t={deps:null,deriveds:null,equals:tn,f:r,first:null,fn:n,last:null,reactions:null,v:null,version:0};if(f!==null&&f.f&g){var u=f;u.deriveds===null?u.deriveds=[t]:u.deriveds.push(t)}return t}function mr(n){const r=Pn(n);return r.equals=un,r}function pn(n){$(n);var r=n.deriveds;if(r!==null){n.deriveds=null;for(var t=0;t<r.length;t+=1)Yn(r[t])}}function wn(n){pn(n);var r=dn(n),t=(q||n.f&x)&&n.deps!==null?R:E;p(n,t),n.equals(r)||(n.v=r,n.version=kn())}function Yn(n){pn(n),Y(n,0),p(n,D),n.first=n.last=n.deps=n.reactions=n.fn=null}const En=0,Bn=1;let I=En,b=!1,O=!1,V=!1;function J(n){O=n}function Q(n){V=n}let T=[],S=0,f=null;function W(n){f=n}let i=null,_=null,v=0,k=null;function Hn(n){k=n}let mn=0,q=!1,c=null;function kn(){return mn++}function z(){return c!==null&&c.l===null}function j(n){var s,o;var r=n.f;if(r&d)return!0;if(r&R){var t=n.deps;if(t!==null){var u=(r&x)!==0,e;if(r&L){for(e=0;e<t.length;e++)((s=t[e]).reactions??(s.reactions=[])).push(n);n.f^=L}for(e=0;e<t.length;e++){var l=t[e];if(j(l)&&wn(l),l.version>n.version)return!0;u&&!q&&!((o=l==null?void 0:l.reactions)!=null&&o.includes(n))&&(l.reactions??(l.reactions=[])).push(n)}}p(n,E)}return!1}function Un(n,r,t){throw n}function dn(n){var r=_,t=v,u=k,e=f,l=q;_=null,v=0,k=null,f=n.f&(m|K)?null:n,q=!O&&(n.f&x)!==0;try{var s=(0,n.fn)(),o=n.deps;if(_!==null){var a,h;if(o!==null){var y=v===0?_:o.slice(0,v).concat(_),F=y.length>16?new Set(y):null;for(h=v;h<o.length;h++)a=o[h],(F!==null?!F.has(a):!y.includes(a))&&Tn(n,a)}if(o!==null&&v>0)for(o.length=v+_.length,h=0;h<_.length;h++)o[v+h]=_[h];else n.deps=o=_;if(!q)for(h=v;h<o.length;h++){a=o[h];var w=a.reactions;w===null?a.reactions=[n]:w[w.length-1]!==n&&!w.includes(n)&&w.push(n)}}else o!==null&&v<o.length&&(Y(n,v),o.length=v);return s}finally{_=r,v=t,k=u,f=e,q=l}}function Tn(n,r){const t=r.reactions;let u=0;if(t!==null){u=t.length-1;const e=t.indexOf(n);e!==-1&&(u===0?r.reactions=null:(t[e]=t[u],t.pop()))}u===0&&r.f&g&&(p(r,R),r.f&(x|L)||(r.f^=L),Y(r,0))}function Y(n,r){var t=n.deps;if(t!==null)for(var u=r===0?null:t.slice(0,r),e=new Set,l=r;l<t.length;l++){var s=t[l];e.has(s)||(e.add(s),(u===null||!u.includes(s))&&Tn(n,s))}}function $(n,r=!1){var t=n.first;for(n.first=n.last=null;t!==null;){var u=t.next;P(t,r),t=u}}function B(n){var r=n.f;if(!(r&D)){p(n,E);var t=n.ctx,u=i,e=c;i=n,c=t;try{r&nn||$(n),an(n);var l=dn(n);n.teardown=typeof l=="function"?l:null,n.version=mn}catch(s){Un(s)}finally{i=u,c=e}}}function gn(){S>1e3&&(S=0,bn()),S++}function xn(n){var r=n.length;if(r!==0){gn();var t=O;O=!0;try{for(var u=0;u<r;u++){var e=n[u];if(e.first===null&&!(e.f&m))Z([e]);else{var l=[];yn(e,l),Z(l)}}}finally{O=t}}}function Z(n){var r=n.length;if(r!==0)for(var t=0;t<r;t++){var u=n[t];!(u.f&(D|A))&&j(u)&&(B(u),u.deps===null&&u.first===null&&u.nodes===null&&(u.teardown===null?_n(u):u.fn=null))}}function zn(){if(b=!1,S>1001)return;const n=T;T=[],xn(n),b||(S=0)}function H(n){I===En&&(b||(b=!0,queueMicrotask(zn)));for(var r=n;r.parent!==null;){r=r.parent;var t=r.f;if(t&m){if(!(t&E))return;p(r,R)}}T.push(r)}function yn(n,r){var t=n.first,u=[];n:for(;t!==null;){var e=t.f,l=(e&(D|A))===0,s=e&m,o=(e&E)!==0,a=t.first;if(l&&(!s||!o)){if(s&&p(t,E),e&C){if(!s&&j(t)&&(B(t),a=t.first),a!==null){t=a;continue}}else if(e&X)if(s||o){if(a!==null){t=a;continue}}else u.push(t)}var h=t.next;if(h===null){let w=t.parent;for(;w!==null;){if(n===w)break n;var y=w.next;if(y!==null){t=y;continue n}w=w.parent}}t=h}for(var F=0;F<u.length;F++)a=u[F],r.push(a),yn(a,r)}function Fn(n){var r=I,t=T;try{gn();const e=[];I=Bn,T=e,b=!1,xn(t);var u=n==null?void 0:n();return Mn(),(T.length>0||e.length>0)&&Fn(),S=0,u}finally{I=r,T=t}}async function kr(){await Promise.resolve(),Fn()}function qn(n){var r=n.f;if(r&D)return n.v;if(f!==null){var t=f.deps;_===null&&t!==null&&t[v]===n?v++:(t===null||v===0||t[v-1]!==n)&&(_===null?_=[n]:_[_.length-1]!==n&&_.push(n)),k!==null&&i!==null&&i.f&E&&!(i.f&m)&&k.includes(n)&&(p(i,d),H(i))}if(r&g){var u=n;j(u)&&wn(u)}return n.v}function dr(n){const r=f;try{return f=null,n()}finally{f=r}}const Kn=~(d|R|E);function p(n,r){n.f=n.f&Kn|r}function Vn(n){return typeof n=="object"&&n!==null&&typeof n.f=="number"}function Tr(n,r=1){var t=+qn(n);return In(n,t+r),t}function gr(n,r=!1,t){c={p:c,c:null,e:null,m:!1,s:n,x:null,l:null},r||(c.l={s:null,u:null,r1:[],r2:ln(!1)})}function xr(n){const r=c;if(r!==null){const u=r.e;if(u!==null){r.e=null;for(var t=0;t<u.length;t++)on(u[t])}c=r.p,r.m=!0}return{}}function yr(n){return Vn(n)?qn(n):n}export{pr as A,Er as B,vn as C,Ln as D,P as E,fr as F,Tr as G,Pn as H,A as I,yr as J,rn as K,on as L,fn as M,sr as N,tr as O,un as P,mr as Q,Fn as R,lr as S,ar as T,kr as U,Cn as V,ur as a,Xn as b,$n as c,Qn as d,In as e,qn as f,Wn as g,i as h,Jn as i,nr as j,er as k,Gn as l,_r as m,hr as n,Zn as o,gr as p,xr as q,c as r,ln as s,rr as t,dr as u,ir as v,or as w,vr as x,cr as y,wr as z};