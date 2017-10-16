//>>built
define("require exports dojo/_base/lang dojo/Deferred dojox/gfx/matrix dojox/gfx ../../request ../../core/sniff ../../core/Error ../../core/promiseUtils ../../core/urlUtils".split(" "),function(F,m,w,x,y,z,A,r,B,t,C){function D(c){return c.map(function(e){return e.command+" "+e.values.join(",")}).join(" ").trim()}function E(c,e,f,k){var a=k&&k.node||document.createElement("div"),g=z.createSurface(a,e,f);null!=k.opacity&&(a.style.opacity=k.opacity.toString());try{c.forEach(function(a){var c=g.createGroup(),
u=0;a.forEach(function(a){var b=a.shape,e=a.fill,d=a.stroke;u+=d&&d.width||0;var f=null;b&&("path"===b.type&&"string"!=typeof b.path&&(b.path=D(b.path)),"image"===b.type&&b.src&&"data:"!==b.src.substr(0,5)&&(b.src+=(-1===b.src.indexOf("?")?"?":"\x26")+"legend\x3d1"),f=c.createShape(b).setFill(e).setStroke(d?d:{width:0}),"text"===b.type&&f.setFont(a.font))});var b=c.getBoundingBox();a=b.width;var n=b.height,d=-(b.x+a/2),h=-(b.y+n/2),l=g.getDimensions(),d={dx:d+l.width/2,dy:h+l.height/2},h=!1;if(k.scale&&
0!==b.width&&0!==b.height){var h=b.width/b.height,p=(e>f?e:f)-2*u,m=1,q=1;isNaN(p)||(1<h?(m=p/b.width,q=p/h/b.height):(q=p/b.height,m=p*h/b.width));c.applyTransform(y.scaleAt(m,q,l.width/2,l.height/2));h=!0}!h&&(a>e||n>f)&&(b=a/e>n/f,a=((b?e:f)-5)/(b?a:n),w.mixin(d,{xx:a,yy:a}));c.applyTransform(d)})}catch(l){return g.clear(),g.destroy(),null}return a}function v(c,e,f,k){if(!c)return t.reject(new B("renderUtils: imageDataSize","href not provided."));var a;if(C.isDataProtocol(c)){var g=new Image;if(g.src=
c,g.complete)a=t.resolve({data:g});else{var l=new x;a=l.promise;g.onload=function(){l.resolve({data:g})};g.onerror=l.reject}}else f||(c+=(-1===c.indexOf("?")?"?":"\x26")+"legend\x3d1"),a=A(c,{responseType:"image",allowImageDataAccess:f});return a.then(function(a){a=a.data;var c=a.width,b=a.height,g=c/b,d=e;k&&(d=Math.min(d,Math.max(c,b)));return{image:f?a:null,width:1>=g?Math.ceil(d*g):d,height:1>=g?d:Math.ceil(d/g)}}).otherwise(function(a){if(f)return v(c,e,!1,k);throw a;})}Object.defineProperty(m,
"__esModule",{value:!0});m.renderSymbol=function(c,e,f){var k=Math.ceil(e[0]);e=Math.ceil(e[1]);return c.some(function(a){return!!a.length})?E(c,k,e,f):null};m.tintImageWithColor=function(c,e,f,k){return v(c,e,!!f,k).then(function(a){var g=a.width?a.width:e,l=a.height?a.height:e;if(a.image&&f){var k=a.image.width,m=a.image.height;(r("edge")||r("ie"))&&/\.svg$/i.test(c)&&(--k,--m);var b,n;b=Math.ceil(g);n=Math.ceil(l);var d=document.createElement("canvas");d.width=b;d.height=n;d.style.width=b+"px";
d.style.height=n+"px";d=d.getContext("2d");b=(d.clearRect(0,0,b,n),d);b.drawImage(a.image,0,0,k,m,0,0,g,l);a=b.getImageData(0,0,g,l);k=f.r/255;m=f.g/255;n=f.b/255;for(var d=f.a,h=0;h<a.data.length;h+=4)a.data[h+0]*=k,a.data[h+1]*=m,a.data[h+2]*=n,a.data[h+3]*=d;b.putImageData(a,0,0);c=b.canvas.toDataURL("image/png")}return{url:c,width:g,height:l}}).otherwise(function(){return{url:c,width:e,height:e}})}});