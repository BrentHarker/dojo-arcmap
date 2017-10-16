//>>built
define("require exports ../../core/tsSupport/extendsHelper ../../core/tsSupport/decorateHelper ./Bucket ./LineTess ./style/StyleLayer".split(" "),function(u,v,q,w,r,f,t){return function(p){function c(a,b,d,e){a=p.call(this,a,b)||this;return a.extrudeVectorsDoubleBuffer=[f.allocExtrudeVectors(),f.allocExtrudeVectors()],a.firstExtrudeVectors=f.allocExtrudeVectors(),a.recycledTriangleBridge=f.allocTriangles(20),a.recycledTrianglePie=f.allocTriangles(20),a.lineVertexBuffer=d,a.lineIndexBuffer=e,a}return q(c,
p),Object.defineProperty(c.prototype,"triangleIndexStart",{get:function(){return this.triangleElementsStart},enumerable:!0,configurable:!0}),Object.defineProperty(c.prototype,"triangleIndexCount",{get:function(){return this.triangleElementsCount},enumerable:!0,configurable:!0}),Object.defineProperty(c.prototype,"connectorStart",{get:function(){return 0},enumerable:!0,configurable:!0}),Object.defineProperty(c.prototype,"connectorCount",{get:function(){return 0},enumerable:!0,configurable:!0}),c.prototype.assignBufferInfo=
function(a){a.triangleElementsStart=this.triangleElementsStart;a.triangleElementsCount=this.triangleElementsCount},c.prototype.processFeatures=function(a,b){this.triangleElementsStart=this.lineIndexBuffer.index;this.triangleElementsCount=0;a&&a.setExtent(this.layerExtent);b=new t.LineLayout(this.layer,this.zoom);for(var d=0,e=this._features;d<e.length;d++){var f=e[d].getGeometry(a);this._processFeature(b,f)}},c.prototype._processFeature=function(a,b){if(b){var d,e=b.length;for(d=0;e>d;d++)this._processGeometry(b[d],
a)}},c.prototype._processGeometry=function(a,b){if(!(2>a.length)){var d=a[0],e=a[a.length-1],h=e.x-d.x,e=e.y-d.y,d=1E-6>h*h+e*e;if(!(2>a.length)){for(var l=a[0],g=1;g<a.length;)h=a[g].x-l.x,e=a[g].y-l.y,1E-6>h*h+e*e?a.splice(g,1):(l=a[g],++g);if(!(2>a.length)){this.vertices=a;this.verticesLen=a.length;this.isClosed=d;this.cap=b.cap;this.join=b.join;this.almostParallelRads=.05;this.veryShallowRads=.1;this.miterSafeRads=f.MITER_SAFE_RADS;this.miterLimitMag=Math.min(b.miterLimit,f.SYSTEM_MAG_LIMIT);
this.roundLimitRads=Math.min(b.roundLimit,.5);this.newRoundJoinsSafeRads=2.3;var h=this.lineIndexBuffer.index,e=0,c=void 0,l=this.verticesLen;for(b=0;l>b;++b){var k=a[b],g=c===this.extrudeVectorsDoubleBuffer[b%2]?this.extrudeVectorsDoubleBuffer[(b+1)%2]:this.extrudeVectorsDoubleBuffer[b%2];if(l>b||!d?(this._computeExtrudeVectors(g,b),this._writeGPUVertices(k.x,k.y,e,g),!g.capCenter||d&&b===l-1||this._writeGPUPieElements(g),d&&0===b&&f.copyExtrudeVectors(this.firstExtrudeVectors,g)):f.copyExtrudeVectors(g,
this.firstExtrudeVectors),c&&this._writeGPUBridgeElements(c,g),l-1>b)c=a[b+1],k=f.length([c.x-k.x,c.y-k.y]),e+=k;c=g}this.triangleElementsCount+=3*(this.lineIndexBuffer.index-h)}}}},c.prototype._computeExtrudeVectors=function(a,b){var d=this.vertices,e=this.verticesLen,h=this.isClosed,c=d[b],g=[void 0,void 0],m=[void 0,void 0];if(0<b&&e-1>b){var k=d[(b+e-1)%e],n=d[(b+1)%e];f.normalize(g,[c.x-k.x,c.y-k.y]);f.normalize(m,[n.x-c.x,n.y-c.y])}else if(0===b)n=d[(b+1)%e],(f.normalize(m,[n.x-c.x,n.y-c.y]),
h)?(d=d[e-2],f.normalize(g,[c.x-d.x,c.y-d.y])):g=m;else{if(b!==e-1)return void console.error("Vertex index 'i' out of range.");k=d[(b+e-1)%e];(f.normalize(g,[c.x-k.x,c.y-k.y]),h)?(d=d[1],f.normalize(m,[d.x-c.x,d.y-c.y])):m=g}h||0!==b?h||b!==e-1?this._computeJoinExtrudeVectors(a,g,m):this._computeCapExtrudeVectors(a,g,m,f.CapPosition.END):this._computeCapExtrudeVectors(a,g,m,f.CapPosition.START)},c.prototype._computeCapExtrudeVectors=function(a,b,d,e){0===this.cap?f.buttCap(a,b,d):1===this.cap?f.roundCap(a,
b,d,e,f.getNumberOfSlices(Math.PI),e===f.CapPosition.START?-1:1):2===this.cap?f.squareCap(a,b,d,e):(f.buttCap(a,b,d),console.error("Unknown cap type!"))},c.prototype._computeJoinExtrudeVectors=function(a,b,d){var e=f.getRads(b,d);if(e>Math.PI-this.almostParallelRads)f.rectJoin(a,b,d);else if(2===this.join||e<this.veryShallowRads)e<this.almostParallelRads?f.fastMiterJoin(a,b,d):e<this.miterSafeRads?f.miterJoin(a,b,d):f.bevelJoin(a,b,d,this.miterLimitMag);else if(0===this.join)f.bevelJoin(a,b,d,1);
else if(1===this.join){var c=f.getNumberOfSlices(e);e<this.newRoundJoinsSafeRads?2>c||e<this.roundLimitRads?f.bevelJoin(a,b,d,1):f.roundJoin(a,b,d,c):f.unitRoundJoin(a,b,d,c)}},c.prototype._writeGPUVertices=function(a,b,d,e){var c;for(c=0;c<e.vectors.count;++c){var f=this.lineVertexBuffer.add(a,b,e.vectors.items[c].vector[0],e.vectors.items[c].vector[1],e.vectors.items[c].texCoords[0],e.vectors.items[c].texCoords[1],d);e.vectors.items[c].base=f}},c.prototype._writeGPUBridgeElements=function(a,b){f.bridge(this.recycledTriangleBridge,
a,b);for(a=0;a<this.recycledTriangleBridge.count;++a)b=this.recycledTriangleBridge.items[a],this.lineIndexBuffer.add(b.v1.base,b.v2.base,b.v3.base)},c.prototype._writeGPUPieElements=function(a){f.pie(this.recycledTrianglePie,a);for(a=0;a<this.recycledTrianglePie.count;++a){var b=this.recycledTrianglePie.items[a];this.lineIndexBuffer.add(b.v1.base,b.v2.base,b.v3.base)}},c}(r)});