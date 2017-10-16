//>>built
define("require exports dojox/gfx/_base dojo/_base/lang dojo/_base/Color dojo/dom dojo/dom-attr ./svg ./Surface ../gl-matrix/mat2d".split(" "),function(l,m,f,n,p,q,r,g,t,h){Object.defineProperty(m,"__esModule",{value:!0});l=function(){function c(){this.parentMatrix=this.parent=this.bbox=this.strokeStyle=this.fillStyle=this.matrix=this.shape=this.rawNode=null}return c.prototype.destroy=function(){if(this.fillStyle&&"type"in this.fillStyle){var a=this.rawNode.getAttribute("fill");(a=g.getRef(a))&&a.parentNode.removeChild(a)}this.rawNode&&
"__gfxObject__"in this.rawNode&&(this.rawNode.__gfxObject__=null);this.rawNode=null},c.prototype.getNode=function(){return this.rawNode},c.prototype.getShape=function(){return this.shape},c.prototype.getTransform=function(){return this.matrix},c.prototype.getFill=function(){return this.fillStyle},c.prototype.getStroke=function(){return this.strokeStyle},c.prototype.getParent=function(){return this.parent},c.prototype.getBoundingBox=function(){return this.bbox},c.prototype.setTransform=function(a){return this.matrix=
this.matrix?h.copy(this.matrix,a):h.clone(a),this._applyTransform()},c.prototype.setFill=function(a){if(!a)return this.fillStyle=null,this.rawNode.setAttribute("fill","none"),this.rawNode.setAttribute("fill-opacity",0),this;var b;if("object"==typeof a&&"type"in a){switch(a.type){case "linear":b=f.makeParameters(f.defaultLinearGradient,a);a=this._setFillObject(b,"linearGradient");a.setAttribute("x1",b.x1.toFixed(8));a.setAttribute("y1",b.y1.toFixed(8));a.setAttribute("x2",b.x2.toFixed(8));a.setAttribute("y2",
b.y2.toFixed(8));break;case "radial":b=f.makeParameters(f.defaultRadialGradient,a);a=this._setFillObject(b,"radialGradient");a.setAttribute("cx",b.cx.toFixed(8));a.setAttribute("cy",b.cy.toFixed(8));a.setAttribute("r",b.r.toFixed(8));break;case "pattern":b=f.makeParameters(f.defaultPattern,a),a=this._setFillObject(b,"pattern"),a.setAttribute("x",b.x.toFixed(8)),a.setAttribute("y",b.y.toFixed(8)),a.setAttribute("width",b.width.toFixed(8)),a.setAttribute("height",b.height.toFixed(8))}return this.fillStyle=
b,this}return b=f.normalizeColor(a),this.fillStyle=b,this.rawNode.setAttribute("fill",b.toCss()),this.rawNode.setAttribute("fill-opacity",b.a),this.rawNode.setAttribute("fill-rule","evenodd"),this},c.prototype.setStroke=function(a){var b=this.rawNode;if(!a)return this.strokeStyle=null,b.setAttribute("stroke","none"),b.setAttribute("stroke-opacity",0),this;("string"==typeof a||n.isArray(a)||a instanceof p)&&(a={color:a});a=this.strokeStyle=f.makeParameters(f.defaultStroke,a);if(a.color=f.normalizeColor(a.color),
a){var c=0>a.width?0:a.width;b.setAttribute("stroke",a.color.toCss());b.setAttribute("stroke-opacity",a.color.a);b.setAttribute("stroke-width",c);b.setAttribute("stroke-linecap",a.cap);"number"==typeof a.join?(b.setAttribute("stroke-linejoin","miter"),b.setAttribute("stroke-miterlimit",a.join)):b.setAttribute("stroke-linejoin",a.join);var e=a.style.toLowerCase();if(e in g.dasharray&&(e=g.dasharray[e]),e instanceof Array){for(var e=n._toArray(e),d=0;d<e.length;++d)e[d]*=c;if("butt"!==a.cap){for(d=
0;d<e.length;d+=2)e[d]-=c,1>e[d]&&(e[d]=1);for(d=1;d<e.length;d+=2)e[d]+=c}e=e.join(",")}b.setAttribute("stroke-dasharray",e);b.setAttribute("dojoGfxStrokeStyle",a.style)}return this},c.prototype._getParentSurface=function(){for(var a=this.parent;a&&!(a instanceof t["default"]);a=a.parent);return a},c.prototype._setFillObject=function(a,b){var c=g.xmlns.svg;this.fillStyle=a;var e=this._getParentSurface().defNode,d=this.rawNode.getAttribute("fill"),k=g.getRef(d);if(k)if(d=k,d.tagName.toLowerCase()!==
b.toLowerCase())k=d.id,d.parentNode.removeChild(d),d=g._createElementNS(c,b),d.setAttribute("id",k),e.appendChild(d);else for(;d.childNodes.length;)d.removeChild(d.lastChild);else d=g._createElementNS(c,b),d.setAttribute("id",f._base._getUniqueId()),e.appendChild(d);if("pattern"===b)d.setAttribute("patternUnits","userSpaceOnUse"),c=g._createElementNS(c,"image"),c.setAttribute("x",0),c.setAttribute("y",0),c.setAttribute("width",(0>a.width?0:a.width).toFixed(8)),c.setAttribute("height",(0>a.height?
0:a.height).toFixed(8)),g._setAttributeNS(c,g.xmlns.xlink,"xlink:href",a.src),d.appendChild(c);else for(d.setAttribute("gradientUnits","userSpaceOnUse"),b=0;b<a.colors.length;++b){var e=a.colors[b],k=g._createElementNS(c,"stop"),h=e.color=f.normalizeColor(e.color);k.setAttribute("offset",e.offset.toFixed(8));k.setAttribute("stop-color",h.toCss());k.setAttribute("stop-opacity",h.a);d.appendChild(k)}return this.rawNode.setAttribute("fill","url(#"+d.getAttribute("id")+")"),this.rawNode.removeAttribute("fill-opacity"),
this.rawNode.setAttribute("fill-rule","evenodd"),d},c.prototype._applyTransform=function(){var a=this.matrix;return a?this.rawNode.setAttribute("transform","matrix("+a[0].toFixed(8)+","+a[1].toFixed(8)+","+a[2].toFixed(8)+","+a[3].toFixed(8)+","+a[4].toFixed(8)+","+a[5].toFixed(8)+")"):this.rawNode.removeAttribute("transform"),this},c.prototype.setRawNode=function(a){a=this.rawNode=a;"image"!==this.shape.type&&a.setAttribute("fill","none");a.setAttribute("fill-opacity",0);a.setAttribute("stroke",
"none");a.setAttribute("stroke-opacity",0);a.setAttribute("stroke-width",1);a.setAttribute("stroke-linecap","butt");a.setAttribute("stroke-linejoin","miter");a.setAttribute("stroke-miterlimit",4);a.__gfxObject__=this},c.prototype.setShape=function(a){this.shape=f.makeParameters(this.shape,a);for(var b in this.shape)"type"!==b&&(a=this.shape[b],"width"!==b&&"height"!==b||(a=0>a?0:a),this.rawNode.setAttribute(b,a));return this.bbox=null,this},c.prototype._moveToFront=function(){return this.rawNode.parentNode.appendChild(this.rawNode),
this},c.prototype._moveToBack=function(){return this.rawNode.parentNode.insertBefore(this.rawNode,this.rawNode.parentNode.firstChild),this},c.prototype._removeClipNode=function(){var a,b=r.get(this.rawNode,"clip-path");return b&&(a=q.byId(b.match(/gfx_clip[\d]+/)[0]),a&&a.parentNode.removeChild(a)),a},c.prototype.moveToFront=function(){var a=this.getParent();return a&&(a._moveChildToFront(this),this._moveToFront()),this},c.prototype.moveToBack=function(){var a=this.getParent();return a&&(a._moveChildToBack(this),
this._moveToBack()),this},c.prototype.removeShape=function(a){return this.parent&&this.parent.remove(this,a),this},c.prototype._setParent=function(a,b){return this.parent=a,this._updateParentMatrix(b)},c.prototype._updateParentMatrix=function(a){return this.parentMatrix=a?h.clone(a):null,this._applyTransform()},c.prototype._getRealMatrix=function(){for(var a=h.clone(this.matrix||h.create()),b=this.parent;b;)b.matrix&&a&&h.multiply(a,b.matrix,a),b=b.parent;return a},c}();m["default"]=l});