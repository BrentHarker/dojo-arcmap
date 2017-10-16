//>>built
define([],function(){function x(a,b,d){d=d||2;var c=b&&b.length,f=c?b[0]*d:a.length,k=G(a,0,f,d,!0),l=[];if(!k)return l;var g,h,t,e;if(c){var q=d,m,n,p;e=[];c=0;for(m=b.length;m>c;c++)n=b[c]*q,p=m-1>c?b[c+1]*q:a.length,n=G(a,n,p,q,!1),n===n.next&&(n.steiner=!0),e.push(K(n));e.sort(L);for(c=0;c<e.length;c++){b=e[c];q=k;if(q=M(b,q))b=H(q,b),y(b,b.next);k=y(k,k.next)}}if(a.length>80*d){g=t=a[0];h=c=a[1];for(q=d;f>q;q+=d)e=a[q],b=a[q+1],g>e&&(g=e),h>b&&(h=b),e>t&&(t=e),b>c&&(c=b);t=Math.max(t-g,c-h)}return z(k,
l,d,g,h,t),l}function G(a,b,d,c,f){var k;if(f===0<A(a,b,d,c))for(f=b;d>f;f+=c)k=I(f,a[f],a[f+1],k);else for(f=d-c;f>=b;f-=c)k=I(f,a[f],a[f+1],k);return k&&w(k,k.next)&&(B(k),k=k.next),k}function y(a,b){if(!a)return a;b||(b=a);var d=a;do if(a=!1,d.steiner||!w(d,d.next)&&0!==u(d.prev,d,d.next))d=d.next;else{if(B(d),d=b=d.prev,d===d.next)return null;a=!0}while(a||d!==b);return b}function z(a,b,d,c,f,k,l){if(a){if(!l&&k){var g=a,h=g;do null===h.z&&(h.z=F(h.x,h.y,c,f,k)),h.prevZ=h.prev,h=h.nextZ=h.next;
while(h!==g);h.prevZ.nextZ=null;h.prevZ=null;var g=h,t,e,q,m,n,p,v=1;do{h=g;m=g=null;for(n=0;h;){n++;e=h;for(t=p=0;v>t&&(p++,e=e.nextZ,e);t++);for(t=v;0<p||0<t&&e;)0===p?(q=e,e=e.nextZ,t--):0!==t&&e?h.z<=e.z?(q=h,h=h.nextZ,p--):(q=e,e=e.nextZ,t--):(q=h,h=h.nextZ,p--),m?m.nextZ=q:g=q,q.prevZ=m,m=q;h=e}m.nextZ=null;v*=2}while(1<n)}for(h=a;a.prev!==a.next;){q=a.prev;g=a.next;if(k)a:{e=a;t=c;var r=f,x=k;m=e.prev;n=e;p=e.next;if(0<=u(m,n,p))e=!1;else{var A=m.x>n.x?m.x>p.x?m.x:p.x:n.x>p.x?n.x:p.x,D=m.y>
n.y?m.y>p.y?m.y:p.y:n.y>p.y?n.y:p.y,v=F(m.x<n.x?m.x<p.x?m.x:p.x:n.x<p.x?n.x:p.x,m.y<n.y?m.y<p.y?m.y:p.y:n.y<p.y?n.y:p.y,t,r,x);t=F(A,D,t,r,x);for(r=e.nextZ;r&&r.z<=t;){if(r!==e.prev&&r!==e.next&&E(m.x,m.y,n.x,n.y,p.x,p.y,r.x,r.y)&&0<=u(r.prev,r,r.next)){e=!1;break a}r=r.nextZ}for(r=e.prevZ;r&&r.z>=v;){if(r!==e.prev&&r!==e.next&&E(m.x,m.y,n.x,n.y,p.x,p.y,r.x,r.y)&&0<=u(r.prev,r,r.next)){e=!1;break a}r=r.prevZ}e=!0}}else a:if(e=a,m=e.prev,n=e,p=e.next,0<=u(m,n,p))e=!1;else{for(v=e.next.next;v!==e.prev;){if(E(m.x,
m.y,n.x,n.y,p.x,p.y,v.x,v.y)&&0<=u(v.prev,v,v.next)){e=!1;break a}v=v.next}e=!0}if(e)b.push(q.i/d),b.push(a.i/d),b.push(g.i/d),B(a),h=a=g.next;else if(a=g,a===h){if(l)if(1===l){l=b;q=d;g=a;do h=g.prev,e=g.next.next,!w(h,e)&&J(h,g,g.next,e)&&C(h,e)&&C(e,h)&&(l.push(h.i/q),l.push(g.i/q),l.push(e.i/q),B(g),B(g.next),g=a=e),g=g.next;while(g!==a);a=g;z(a,b,d,c,f,k,2)}else{if(2===l)a:{l=a;do{for(q=l.next.next;q!==l.prev;){if(g=l.i!==q.i){g=l;h=q;e=void 0;if(e=g.next.i!==h.i&&g.prev.i!==h.i){e=void 0;b:{e=
g;do{if(e.i!==g.i&&e.next.i!==g.i&&e.i!==h.i&&e.next.i!==h.i&&J(e,e.next,g,h)){e=!0;break b}e=e.next}while(e!==g);e=!1}e=!e}m=void 0;if(m=e&&C(g,h)&&C(h,g)){e=g;m=!1;n=(g.x+h.x)/2;h=(g.y+h.y)/2;do e.y>h!=e.next.y>h&&n<(e.next.x-e.x)*(h-e.y)/(e.next.y-e.y)+e.x&&(m=!m),e=e.next;while(e!==g)}g=m}if(g){a=H(l,q);l=y(l,l.next);a=y(a,a.next);z(l,b,d,c,f,k);z(a,b,d,c,f,k);break a}q=q.next}l=l.next}while(l!==a)}}else z(y(a),b,d,c,f,k,1);break}}}}function L(a,b){return a.x-b.x}function M(a,b){var d,c=b,f=a.x,
k=a.y,l=-(1/0);do{if(k<=c.y&&k>=c.next.y){var g=c.x+(k-c.y)*(c.next.x-c.x)/(c.next.y-c.y);if(f>=g&&g>l){if(l=g,g===f){if(k===c.y)return c;if(k===c.next.y)return c.next}d=c.x<c.next.x?c:c.next}}c=c.next}while(c!==b);if(!d)return null;if(f===l)return d.prev;var h;b=d;for(var g=d.x,t=d.y,e=1/0,c=d.next;c!==b;)f>=c.x&&c.x>=g&&E(t>k?f:l,k,g,t,t>k?l:f,k,c.x,c.y)&&(h=Math.abs(k-c.y)/(f-c.x),(e>h||h===e&&c.x>d.x)&&C(c,a)&&(d=c,e=h)),c=c.next;return d}function F(a,b,d,c,f){return a=32767*(a-d)/f,b=32767*(b-
c)/f,a=16711935&(a|a<<8),a=252645135&(a|a<<4),a=858993459&(a|a<<2),a=1431655765&(a|a<<1),b=16711935&(b|b<<8),b=252645135&(b|b<<4),b=858993459&(b|b<<2),b=1431655765&(b|b<<1),a|b<<1}function K(a){var b=a,d=a;do b.x<d.x&&(d=b),b=b.next;while(b!==a);return d}function E(a,b,d,c,f,k,l,g){return 0<=(f-l)*(b-g)-(a-l)*(k-g)&&0<=(a-l)*(c-g)-(d-l)*(b-g)&&0<=(d-l)*(k-g)-(f-l)*(c-g)}function u(a,b,d){return(b.y-a.y)*(d.x-b.x)-(b.x-a.x)*(d.y-b.y)}function w(a,b){return a.x===b.x&&a.y===b.y}function J(a,b,d,c){return w(a,
b)&&w(d,c)||w(a,c)&&w(d,b)?!0:0<u(a,b,d)!=0<u(a,b,c)&&0<u(d,c,a)!=0<u(d,c,b)}function C(a,b){return 0>u(a.prev,a,a.next)?0<=u(a,b,a.next)&&0<=u(a,a.prev,b):0>u(a,b,a.prev)||0>u(a,a.next,b)}function H(a,b){var d=new D(a.i,a.x,a.y),c=new D(b.i,b.x,b.y),f=a.next,k=b.prev;return a.next=b,b.prev=a,d.next=f,f.prev=d,c.next=d,d.prev=c,k.next=c,c.prev=k,c}function I(a,b,d,c){a=new D(a,b,d);return c?(a.next=c.next,a.prev=c,c.next.prev=a,c.next=a):(a.prev=a,a.next=a),a}function B(a){a.next.prev=a.prev;a.prev.next=
a.next;a.prevZ&&(a.prevZ.nextZ=a.nextZ);a.nextZ&&(a.nextZ.prevZ=a.prevZ)}function D(a,b,d){this.i=a;this.x=b;this.y=d;this.nextZ=this.prevZ=this.z=this.next=this.prev=null;this.steiner=!1}function A(a,b,d,c){for(var f=0,k=d-c;d>b;b+=c)f+=(a[k]-a[b])*(a[b+1]+a[k+1]),k=b;return f}return x.deviation=function(a,b,d,c){var f=b&&b.length,k=Math.abs(A(a,0,f?b[0]*d:a.length,d));if(f)for(var f=0,l=b.length;l>f;f++)k-=Math.abs(A(a,b[f]*d,l-1>f?b[f+1]*d:a.length,d));for(f=b=0;f<c.length;f+=3){var l=c[f]*d,g=
c[f+1]*d,h=c[f+2]*d;b+=Math.abs((a[l]-a[h])*(a[g+1]-a[l+1])-(a[l]-a[g])*(a[h+1]-a[l+1]))}return 0===k&&0===b?0:Math.abs((b-k)/k)},x.flatten=function(a){for(var b=a[0][0].length,d={vertices:[],holes:[],dimensions:b},c=0,f=0;f<a.length;f++){for(var k=0;k<a[f].length;k++)for(var l=0;b>l;l++)d.vertices.push(a[f][k][l]);0<f&&(c+=a[f-1].length,d.holes.push(c))}return d},x});