//>>built
define("require exports ../core/tsSupport/declareExtendsHelper ../core/tsSupport/decorateHelper ../core/lang ./Symbol3D ../core/accessorSupport/decorators".split(" "),function(b,h,f,c,d,g,a){b=e=function(b){function a(a){a=b.call(this)||this;return a.type="mesh-symbol-3d",a}return f(a,b),a.prototype.clone=function(){return new e({styleOrigin:d.clone(this.styleOrigin),symbolLayers:d.clone(this.symbolLayers),thumbnail:d.clone(this.thumbnail)})},a}(a.declared(g));c([a.property()],b.prototype,"type",
void 0);c([a.shared(["fill"])],b.prototype,"_allowedLayerTypes",void 0);b=e=c([a.subclass("esri.symbols.MeshSymbol3D")],b);var e;return b});