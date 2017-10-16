//>>built
define(["./Zlib"],function(w){return function(){function g(a){var b,e,d,c,f;this.data=a;this.pos=8;this.palette=[];this.imgData=[];this.transparency={};this.animation=null;this.text={};for(d=null;;){b=this.readUInt32();f=a=void 0;f=[];for(a=0;4>a;++a)f.push(String.fromCharCode(this.data[this.pos++]));switch(a=f.join("")){case "IHDR":this.width=this.readUInt32();this.height=this.readUInt32();this.bits=this.data[this.pos++];this.colorType=this.data[this.pos++];this.compressionMethod=this.data[this.pos++];
this.filterMethod=this.data[this.pos++];this.interlaceMethod=this.data[this.pos++];break;case "acTL":this.animation={numFrames:this.readUInt32(),numPlays:this.readUInt32()||1/0,frames:[]};break;case "PLTE":this.palette=this.read(b);break;case "fcTL":d&&this.animation.frames.push(d);this.pos+=4;d={width:this.readUInt32(),height:this.readUInt32(),xOffset:this.readUInt32(),yOffset:this.readUInt32()};a=this.readUInt16();b=this.readUInt16()||100;d.delay=1E3*a/b;d.disposeOp=this.data[this.pos++];d.blendOp=
this.data[this.pos++];d.data=[];break;case "IDAT":case "fdAT":"fdAT"===a&&(this.pos+=4,b-=4);a=(null!=d?d.data:void 0)||this.imgData;for(f=0;0<=b?b>f:f>b;0<=b?++f:--f)a.push(this.data[this.pos++]);break;case "tRNS":switch(this.transparency={},this.colorType){case 3:if(this.transparency.indexed=this.read(b),c=255-this.transparency.indexed.length,0<c)for(b=0;0<=c?c>b:b>c;0<=c?++b:--b)this.transparency.indexed.push(255);break;case 0:this.transparency.grayscale=this.read(b)[0];break;case 2:this.transparency.rgb=
this.read(b)}break;case "tEXt":f=this.read(b);b=f.indexOf(0);a=String.fromCharCode.apply(String,f.slice(0,b));this.text[a]=String.fromCharCode.apply(String,f.slice(b+1));break;case "IEND":d&&this.animation.frames.push(d);a:{switch(this.colorType){case 0:case 3:case 4:d=1;break a;case 2:case 6:d=3;break a}d=void 0}this.colors=d;this.hasAlphaChannel=4===(e=this.colorType)||6===e;e=this.colors+(this.hasAlphaChannel?1:0);this.pixelBitlength=this.bits*e;a:{switch(this.colors){case 1:e="DeviceGray";break a;
case 3:e="DeviceRGB";break a}e=void 0}return this.colorSpace=e,void(this.imgData=new Uint8Array(this.imgData));default:this.pos+=b}if(this.pos+=4,this.pos>this.data.length)throw Error("Incomplete or corrupt PNG file");}}var u,t,m;return g.load=function(a,b,e){var d;return"function"==typeof b&&(e=b),d=new XMLHttpRequest,d.open("GET",a,!0),d.responseType="arraybuffer",d.onload=function(){var a,f;return a=new Uint8Array(d.response||d.mozResponseArrayBuffer),f=new g(a),"function"==typeof(null!=b?b.getContext:
void 0)&&f.render(b),"function"==typeof e?e(f):void 0},d.send(null)},g.prototype.read=function(a){var b,e;e=[];for(b=0;0<=a?a>b:b>a;0<=a?++b:--b)e.push(this.data[this.pos++]);return e},g.prototype.readUInt32=function(){var a,b,e,d;return a=this.data[this.pos++]<<24,b=this.data[this.pos++]<<16,e=this.data[this.pos++]<<8,d=this.data[this.pos++],a|b|e|d},g.prototype.readUInt16=function(){var a,b;return a=this.data[this.pos++]<<8,b=this.data[this.pos++],a|b},g.prototype.decodePixels=function(a){var b,
e,d,c,f,v,l,h,k,g,p,n,q,m,r;if(null==a&&(a=this.imgData),0===a.length)return new Uint8Array(0);a=new w(a);a=a.getBytes();h=this.pixelBitlength/8;n=h*this.width;k=new Uint8Array(n*this.height);v=a.length;for(e=g=p=0;v>g;){switch(a[g++]){case 0:for(c=b=0;n>b;c=b+=1)k[e++]=a[g++];break;case 1:for(c=r=0;n>r;c=r+=1)b=a[g++],f=h>c?0:k[e-h],k[e++]=(b+f)%256;break;case 2:for(c=f=0;n>f;c=f+=1)b=a[g++],d=(c-c%h)/h,q=p&&k[(p-1)*n+d*h+c%h],k[e++]=(q+b)%256;break;case 3:for(c=r=0;n>r;c=r+=1)b=a[g++],d=(c-c%h)/
h,f=h>c?0:k[e-h],q=p&&k[(p-1)*n+d*h+c%h],k[e++]=(b+Math.floor((f+q)/2))%256;break;case 4:for(c=r=0;n>r;c=r+=1)b=a[g++],d=(c-c%h)/h,f=h>c?0:k[e-h],0===p?q=m=0:(q=k[(p-1)*n+d*h+c%h],m=d&&k[(p-1)*n+(d-1)*h+c%h]),l=f+q-m,c=Math.abs(l-f),d=Math.abs(l-q),l=Math.abs(l-m),f=d>=c&&l>=c?f:l>=d?q:m,k[e++]=(b+f)%256;break;default:throw Error("Invalid filter algorithm: "+a[g-1]);}p++}return k},g.prototype.decodePalette=function(){var a,b,e,d,c,f,g,l,h;e=this.palette;f=this.transparency.indexed||[];c=new Uint8Array((f.length||
0)+e.length);b=g=a=d=0;for(l=e.length;l>g;b=g+=3)c[d++]=e[b],c[d++]=e[b+1],c[d++]=e[b+2],c[d++]=null!=(h=f[a++])?h:255;return c},g.prototype.copyToImageData=function(a,b){var e,d,c,f,g,l,h,k;if(d=this.colors,h=null,e=this.hasAlphaChannel,this.palette.length&&(h=null!=(k=this._decodedPalette)?k:this._decodedPalette=this.decodePalette(),d=4,e=!0),c=a.data||a,l=c.length,f=h||b,a=g=0,1===d)for(;l>a;)d=h?4*b[a/4]:g,k=f[d++],c[a++]=k,c[a++]=k,c[a++]=k,c[a++]=e?f[d++]:this.transparency.grayscale&&this.transparency.grayscale===
k?0:255,g=d;else for(;l>a;)d=h?4*b[a/4]:g,c[a++]=f[d++],c[a++]=f[d++],c[a++]=f[d++],c[a++]=e?f[d++]:this.transparency.rgb&&this.transparency.rgb[1]===f[d-3]&&this.transparency.rgb[3]===f[d-2]&&this.transparency.rgb[5]===f[d-1]?0:255,g=d},g.prototype.decode=function(){var a;return a=new Uint8Array(this.width*this.height*4),this.copyToImageData(a,this.decodePixels()),a},t=document.createElement("canvas"),m=t.getContext("2d"),u=function(a){var b;return m.width=a.width,m.height=a.height,m.clearRect(0,
0,a.width,a.height),m.putImageData(a,0,0),b=new Image,b.src=t.toDataURL(),b},g.prototype.decodeFrames=function(a){var b,e,d,c,f,g,l;if(this.animation){g=this.animation.frames;l=[];b=c=0;for(f=g.length;f>c;b=++c)b=g[b],e=a.createImageData(b.width,b.height),d=this.decodePixels(new Uint8Array(b.data)),this.copyToImageData(e,d),b.imageData=e,l.push(b.image=u(e));return l}},g.prototype.renderFrame=function(a,b){var e,d,c;return d=this.animation.frames,e=d[b],c=d[b-1],0===b&&a.clearRect(0,0,this.width,
this.height),1===(null!=c?c.disposeOp:void 0)?a.clearRect(c.xOffset,c.yOffset,c.width,c.height):2===(null!=c?c.disposeOp:void 0)&&a.putImageData(c.imageData,c.xOffset,c.yOffset),0===e.blendOp&&a.clearRect(e.xOffset,e.yOffset,e.width,e.height),a.drawImage(e.image,e.xOffset,e.yOffset)},g.prototype.animate=function(a){var b,e,d,c,f,g,l=this;return e=0,g=this.animation,c=g.numFrames,d=g.frames,f=g.numPlays,(b=function(){var g,k;return g=e++%c,k=d[g],l.renderFrame(a,g),1<c&&f>e/c?l.animation._timeout=
setTimeout(b,k.delay):void 0})()},g.prototype.stopAnimation=function(){var a;return clearTimeout(null!=(a=this.animation)?a._timeout:void 0)},g.prototype.render=function(a){var b,e;return a._png&&a._png.stopAnimation(),a._png=this,a.width=this.width,a.height=this.height,b=a.getContext("2d"),this.animation?(this.decodeFrames(b),this.animate(b)):(e=b.createImageData(this.width,this.height),this.copyToImageData(e,this.decodePixels()),b.putImageData(e,0,0))},g}()});