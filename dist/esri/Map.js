//>>built
define("require exports ./core/tsSupport/declareExtendsHelper ./core/tsSupport/decorateHelper ./core/Accessor ./core/CollectionFlattener ./core/Evented ./support/LayersMixin ./Ground ./support/basemapUtils ./support/groundUtils ./core/accessorSupport/decorators".split(" "),function(b,n,e,c,f,g,h,k,l,d,m,a){b=function(b){function a(a){a=b.call(this)||this;return a.basemap=null,a.ground=new l,a._basemapCache=d.createCache(),a}return e(a,b),Object.defineProperty(a.prototype,"allLayers",{get:function(){return new g({root:this,
rootCollectionNames:["basemap.baseLayers","ground.layers","layers","basemap.referenceLayers"],getChildrenFunction:function(a){return a.layers}})},enumerable:!0,configurable:!0}),a.prototype.castBasemap=function(a){return d.ensureType(a,this._basemapCache)},a}(a.declared(f,h,k));return c([a.property({readOnly:!0})],b.prototype,"allLayers",null),c([a.property()],b.prototype,"basemap",void 0),c([a.cast("basemap")],b.prototype,"castBasemap",null),c([a.property(),a.cast(m.ensureType)],b.prototype,"ground",
void 0),b=c([a.subclass("esri.Map")],b)});