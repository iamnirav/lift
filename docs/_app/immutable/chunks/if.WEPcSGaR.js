import{i as N,S as P,a as r,o as S,b as A,d as O,s as m,c as x,e as u,U as d,g as h,m as b,f as _,h as D,u as I,j as k,k as L,H as j,r as F,l as g,n as E,p as R,E as M}from"./runtime.Chmf4Ubk.js";import{h as Y,b as w,d as B}from"./disclose-version.DLcyMj-p.js";function y(e,t=!0,s=null,f){if(typeof e=="object"&&e!=null&&!N(e)&&!(P in e)){if(r in e){const i=e[r];if(i.t===e||i.p===e)return i.p}const n=k(e);if(n===S||n===A){const i=new Proxy(e,H);return O(e,r,{value:{s:new Map,v:m(0),a:x(e),i:t,p:i,t:e},writable:!0,enumerable:!1}),i}}return e}function T(e,t=1){u(e,e.v+t)}const H={defineProperty(e,t,s){if(s.value){const f=e[r],n=f.s.get(t);n!==void 0&&u(n,y(s.value,f.i,f))}return Reflect.defineProperty(e,t,s)},deleteProperty(e,t){const s=e[r],f=s.s.get(t),n=s.a,i=delete e[t];if(n&&i){const a=s.s.get("length"),o=e.length-1;a!==void 0&&a.v!==o&&u(a,o)}return f!==void 0&&u(f,d),i&&T(s.v),i},get(e,t,s){var i;if(t===r)return Reflect.get(e,r);const f=e[r];let n=f.s.get(t);if(n===void 0&&(!(t in e)||(i=h(e,t))!=null&&i.writable)&&(n=(f.i?m:b)(y(e[t],f.i,f)),f.s.set(t,n)),n!==void 0){const a=_(n);return a===d?void 0:a}return Reflect.get(e,t,s)},getOwnPropertyDescriptor(e,t){const s=Reflect.getOwnPropertyDescriptor(e,t);if(s&&"value"in s){const n=e[r].s.get(t);n&&(s.value=_(n))}return s},has(e,t){var i;if(t===r)return!0;const s=e[r],f=Reflect.has(e,t);let n=s.s.get(t);return(n!==void 0||D!==null&&(!f||(i=h(e,t))!=null&&i.writable))&&(n===void 0&&(n=(s.i?m:b)(f?y(e[t],s.i,s):d),s.s.set(t,n)),_(n)===d)?!1:f},set(e,t,s,f){const n=e[r];let i=n.s.get(t);i===void 0&&(I(()=>f[t]),i=n.s.get(t)),i!==void 0&&u(i,y(s,n.i,n));const a=n.a,o=!(t in e);if(a&&t==="length")for(let c=s;c<e.length;c+=1){const l=n.s.get(c+"");l!==void 0&&u(l,d)}if(e[t]=s,o){if(a){const c=n.s.get("length"),l=e.length;c!==void 0&&c.v!==l&&u(c,l)}T(n.v)}return!0},ownKeys(e){const t=e[r];return _(t.v),Reflect.ownKeys(e)}};function Z(e,t,s,f=null,n=!1){var i=null,a=null,o=null,c=n?M:0;L(()=>{if(o===(o=!!t()))return;let l=!1;if(Y){const v=e.data===j;o===v&&(F(B),w(!1),l=!0)}o?(i?g(i):i=E(()=>s(e)),a&&R(a,()=>{a=null})):(a?g(a):f&&(a=E(()=>f(e))),i&&R(i,()=>{i=null})),l&&w(!0)},c)}export{Z as i,y as p};
