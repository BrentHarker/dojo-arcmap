//>>built
define("require exports ../../../Color ./utils ../../../core/numberUtils ../../../symbols/support/gfxUtils".split(" "),function(y,g,p,r,t,u){function v(a,b){var d=b-a;b=[0,.25,.5,.75,1].map(function(b){return Number((a+b*d).toFixed(6))});return l(0,4,b),b}function l(a,b,d){var h=a+(b-a)/2,e=d[0],n=d[1],c=d[2],m=Math.floor(e),k=Math.floor(n),q=Math.floor(c);m===e&&q===c&&k!==n&&m!==k&&q!==k&&(d[h]=k);a+1!==h&&l(a,h,d);h+1!==b&&l(h,b,d)}Object.defineProperty(g,"__esModule",{value:!0});var w=[64,64,
64],x=[255,255,255];g.getRampBorderColor=function(a){var b=null;if("simple"===a.type)b=a.symbol;else if("uniqueValue"===a.type||"classBreaks"===a.type)b=(a=(a=a.classBreakInfos||a.uniqueValueInfos)&&a[0])&&a.symbol;return(a=(a=b&&-1===b.type.indexOf("line-symbol")?u.getStroke(b):null)&&a.color)&&0<a.a&&!(240<=a.r&&240<=a.g&&240<=a.b)?a:null};g.getRampOverlayColor=function(a){var b=new p(x);return b.a=1-a,b};g.getRampStops=function(a,b,d){var h=!1,e=[],n=[];if(b.colors||b.opacityValues)e=v(b.minDataValue,
b.maxDataValue);else if(b.stops){var c=b.stops,e=c.map(function(a){return a.value});(h=c.some(function(a){return!!a.label}))&&(n=c.map(function(a){return a.label}))}var m=e[0],c=e[e.length-1];if(null==m&&null==c)return null;var k=c-m;return e.map(function(c,g){var f;if("opacity"===b.type){f=d;void 0===f&&(f=w);f=new p(f);var l=a.getOpacity(c,{opacityInfo:b});f=(null!=l&&(f.a=l),f)}else f=a.getColor(c,{colorInfo:b});g=h?n[g]:r.getLabelPrefix(g,e.length-1)+t.format(c);return{value:c,color:f,label:g,
offset:k?1-(c-m)/k:1}}).reverse()}});