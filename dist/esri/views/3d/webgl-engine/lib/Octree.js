//>>built
define("require exports ./gl-matrix ./Util dojo/has ./PerformanceTimer".split(" "),function(v,F,A,q,B,C){function w(c,a,b){return b=b||c,b[0]=c[0]+a,b[1]=c[1]+a,b[2]=c[2]+a,b}var k=A.vec3d,x=B("dojo-debug-messages");v=function(){function c(a,b,d){this._maximumObjectsPerNode=10;this._maximumDepth=20;this._autoResize=!0;this._outsiders=[];d&&(void 0!==d.maximumObjectsPerNode&&(this._maximumObjectsPerNode=d.maximumObjectsPerNode),void 0!==d.maximumDepth&&(this._maximumDepth=d.maximumDepth),void 0!==
d.autoResize&&(this._autoResize=d.autoResize));isNaN(a[0])||isNaN(a[1])||isNaN(a[2])||isNaN(b)?this._root=new f(null,k.createFrom(0,0,0),.5):this._root=new f(null,a,b/2)}return Object.defineProperty(c.prototype,"center",{get:function(){return this._root.center},enumerable:!0,configurable:!0}),Object.defineProperty(c.prototype,"size",{get:function(){return 2*this._root.halfSize},enumerable:!0,configurable:!0}),Object.defineProperty(c.prototype,"root",{get:function(){return this._root.node},enumerable:!0,
configurable:!0}),Object.defineProperty(c.prototype,"outsiders",{get:function(){return this._outsiders.slice()},enumerable:!0,configurable:!0}),Object.defineProperty(c.prototype,"maximumObjectsPerNode",{get:function(){return this._maximumObjectsPerNode},enumerable:!0,configurable:!0}),Object.defineProperty(c.prototype,"maximumDepth",{get:function(){return this._maximumDepth},enumerable:!0,configurable:!0}),Object.defineProperty(c.prototype,"autoResize",{get:function(){return this._autoResize},enumerable:!0,
configurable:!0}),c.prototype.add=function(a){a=this._objectOrObjectsArray(a);this._grow(a);for(var b=f.acquire(),d=0;d<a.length;d++){var e=a[d];b.init(this._root);0===e.getBSRadius()||isNaN(e.getBSRadius())||!this._autoResize&&!this._fitsInsideTree(this._boundingSphereFromObject(e,t))?this._outsiders.push(e):this._add(e,b)}f.release(b)},c.prototype.remove=function(a,b){a=this._objectOrObjectsArray(a);for(var d=f.acquire(),e=!0,c=0;c<a.length;c++){var h=a[c],g=this._boundingSphereFromObject(b||h,
t);0===g.radius||isNaN(g.radius)||!this._autoResize&&!this._fitsInsideTree(g)?e=null!=q.arrayRemove(this._outsiders,h):(d.init(this._root),e=this._remove(h,g,d))}return f.release(d),this._shrink(),e},c.prototype.update=function(a,b){this.remove(a,b);this.add(a)},c.prototype.forEachAlongRay=function(a,b,d){this._forEachTest(function(d){return w(d.center,2*-d.halfSize,l),w(d.center,2*d.halfSize,m),q.rayBoxTest(a,b,l,m)},d)},c.prototype.forEachInBoundingBox=function(a,b,d){this._forEachTest(function(d){for(var e=
2*d.halfSize,c=0;3>c;c++)if(d.center[c]+e<a[c]||d.center[c]-e>b[c])return!1;return!0},d)},c.prototype.forEachNode=function(a){this._forEachNode(this._root,function(b){return a(b.node,b.center,2*b.halfSize)})},c.prototype._forEachTest=function(a,b){this._outsiders.forEach(b);this._forEachNode(this._root,function(d){return a(d)?(d=d.node,d.terminals.forEach(b),null!==d.residents&&d.residents.forEach(b),!0):!1})},c.prototype._forEachNode=function(a,b){a=f.acquire().init(a);for(var d=[a];0!==d.length;){if(a=
d.pop(),b(a)&&!a.isLeaf())for(var e=0;e<a.node.children.length;e++)a.node.children[e]&&d.push(f.acquire().init(a).advance(e));f.release(a)}},c.prototype._objectOrObjectsArray=function(a){return Array.isArray(a)||(y[0]=a,a=y),a},c.prototype._remove=function(a,b,d){n.length=0;var e,c;if(d.advanceTo(b,function(a,b){n.push(a.node,b)})?(e=null!=q.arrayRemove(d.node.terminals,a),c=0===d.node.terminals.length):(e=null!=q.arrayRemove(d.node.residents,a),c=0===d.node.residents.length),c)for(a=n.length-2;0<=
a&&this._purge(n[a],n[a+1]);a-=2);return e},c.prototype._nodeIsEmpty=function(a){if(0!==a.terminals.length)return!1;if(null!==a.residents)return 0===a.residents.length;for(var b=0;b<a.children.length;b++)if(a.children[b])return!1;return!0},c.prototype._purge=function(a,b){return 0<=b&&(a.children[b]=null),this._nodeIsEmpty(a)?(null===a.residents&&(a.residents=[]),!0):!1},c.prototype._add=function(a,b){b.advanceTo(this._boundingSphereFromObject(a,t))?b.node.terminals.push(a):(b.node.residents.push(a),
b.node.residents.length>this._maximumObjectsPerNode&&b.depth<this._maximumDepth&&this._split(b))},c.prototype._split=function(a){var b=a.node.residents;a.node.residents=null;for(var d=0;d<b.length;d++){var e=f.acquire().init(a);this._add(b[d],e);f.release(e)}},c.prototype._grow=function(a){if(0!==a.length&&this._autoResize&&(a=this._boundingSphereFromObjects(a,this._boundingSphereFromObject,p),!isNaN(a.radius)&&0!==a.radius&&!this._fitsInsideTree(a))){var b;if(x&&(b=new C(1),b.start()),this._nodeIsEmpty(this._root.node))k.set(a.center,
this._root.center),this._root.halfSize=1.25*a.radius;else{var d=f.acquire();this._rootBoundsForRootAsSubNode(a,d);this._placingRootViolatesMaxDepth(d)?this._rebuildTree(a,d):this._growRootAsSubNode(d);f.release(d)}x&&b.stop()}},c.prototype._rebuildTree=function(a,b){var d=this;k.set(b.center,u.center);u.radius=b.halfSize;a=this._boundingSphereFromObjects([a,u],function(a){return a},D);b=f.acquire().init(this._root);this._root.initFrom(null,a.center,1.25*a.radius);this._forEachNode(b,function(a){return d.add(a.node.terminals),
null!==a.node.residents&&d.add(a.node.residents),!0});f.release(b)},c.prototype._placingRootViolatesMaxDepth=function(a){var b=0;this._forEachNode(this._root,function(a){return b=Math.max(b,a.depth),!0});return b+Math.log(a.halfSize/this._root.halfSize)*Math.LOG2E>this._maximumDepth},c.prototype._rootBoundsForRootAsSubNode=function(a,b){var d=a.radius,c=a.center;a=-(1/0);for(var k=this._root.center,h=this._root.halfSize,g=0;3>g;g++){var f=Math.max(0,Math.ceil((k[g]-h-(c[g]-d))/(2*h))),l=Math.max(0,
Math.ceil((c[g]+d-(k[g]+h))/(2*h)))+1;a=Math.max(a,Math.pow(2,Math.ceil(Math.log(f+l)*Math.LOG2E)));r[g].min=f;r[g].max=l}for(g=0;3>g;g++)f=r[g].min,l=r[g].max,d=(a-(f+l))/2,f+=Math.ceil(d),l+=Math.floor(d),z[g]=k[g]-h-f*h*2+(l+f)*h;return b.initFrom(null,z,a*h,0)},c.prototype._growRootAsSubNode=function(a){var b=this._root.node;k.set(this._root.center,p.center);p.radius=this._root.halfSize;this._root.init(a);a.advanceTo(p,null,!0);a.node.children=b.children;a.node.residents=b.residents;a.node.terminals=
b.terminals},c.prototype._shrink=function(){if(this._autoResize)for(;;){var a=this._findShrinkIndex();if(-1===a)break;this._root.advance(a);this._root.depth=0}},c.prototype._findShrinkIndex=function(){if(0!==this._root.node.terminals.length||this._root.isLeaf())return-1;for(var a=null,b=this._root.node.children,d=0,c=0;c<b.length&&null==a;)d=c++,a=b[d];for(;c<b.length;)if(b[c++])return-1;return d},c.prototype._fitsInsideTree=function(a){var b=this._root.center,d=this._root.halfSize,c=a.center;return d>=
a.radius&&c[0]>=b[0]-d&&c[0]<=b[0]+d&&c[1]>=b[1]-d&&c[1]<=b[1]+d&&c[2]>=b[2]-d&&c[2]<=b[2]+d},c.prototype._boundingSphereFromObject=function(a,b){return k.set(a.getCenter(),b.center),b.radius=a.getBSRadius(),b},c.prototype._boundingSphereFromObjects=function(a,b,d){if(1===a.length){var c=b(a[0],p);k.set(c.center,d.center);d.radius=c.radius}else{l[0]=1/0;l[1]=1/0;l[2]=1/0;m[0]=-(1/0);m[1]=-(1/0);m[2]=-(1/0);for(var f=0;f<a.length;f++){var c=b(a[f],p),h=l,g=c.center,n=c.radius;h[0]=Math.min(h[0],g[0]-
n);h[1]=Math.min(h[1],g[1]-n);h[2]=Math.min(h[2],g[2]-n);h=m;g=c.center;c=c.radius;h[0]=Math.max(h[0],g[0]+c);h[1]=Math.max(h[1],g[1]+c);h[2]=Math.max(h[2],g[2]+c)}k.scale(k.add(l,m,d.center),.5);d.radius=Math.max(m[0]-l[0],m[1]-l[1],m[2]-l[2])/2}return d},c}();var f=function(){function c(a,b,d,c){void 0===d&&(d=0);void 0===c&&(c=0);this.center=k.create();this.initFrom(a,b,d,0)}return c.prototype.init=function(a){return this.initFrom(a.node,a.center,a.halfSize,a.depth)},c.prototype.initFrom=function(a,
b,d,e){return void 0===a&&(a=null),void 0===d&&(d=this.halfSize),void 0===e&&(e=this.depth),this.node=a||c.createEmptyNode(),b&&k.set(b,this.center),this.halfSize=d,this.depth=e,this},c.prototype.advance=function(a){var b=this.node.children[a];b||(b=c.createEmptyNode(),this.node.children[a]=b);this.node=b;this.halfSize/=2;this.depth++;a=E[a];return this.center[0]+=a[0]*this.halfSize,this.center[1]+=a[1]*this.halfSize,this.center[2]+=a[2]*this.halfSize,this},c.prototype.advanceTo=function(a,b,c){for(void 0===
c&&(c=!1);;){if(this.isTerminalFor(a))return b&&b(this,-1),!0;if(this.isLeaf()&&!c)return b&&b(this,-1),!1;this.isLeaf()&&(this.node.residents=null);var d=this._childIndex(a);b&&b(this,d);this.advance(d)}},c.prototype.isLeaf=function(){return null!=this.node.residents},c.prototype.isTerminalFor=function(a){return a.radius>this.halfSize/2},c.prototype._childIndex=function(a){a=a.center;for(var b=this.center,c=0,e=0;3>e;e++)b[e]<a[e]&&(c|=1<<e);return c},c.createEmptyNode=function(){return{children:[null,
null,null,null,null,null,null,null],terminals:[],residents:[]}},c.acquire=function(){if(0===this._pool.length)return new c;var a=this._pool[this._pool.length-1];return this._pool.length--,a},c.release=function(a){this._pool.push(a)},c}();f._pool=[];var E=[[-1,-1,-1],[1,-1,-1],[-1,1,-1],[1,1,-1],[-1,-1,1],[1,-1,1],[-1,1,1],[1,1,1]],y=[null],z=k.create(),l=k.create(),m=k.create(),n=[],t={center:k.create(),radius:0},p={center:k.create(),radius:0},u={center:k.create(),radius:0},D={center:k.create(),radius:0},
r=[{min:0,max:0},{min:0,max:0},{min:0,max:0}];return v});