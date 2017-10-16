//>>built
define("require exports ../../core/tsSupport/declareExtendsHelper ../../core/tsSupport/decorateHelper ../../core/accessorSupport/decorators ../../core/watchUtils ./UI ./Component ../../widgets/Attribution ../../widgets/Compass ../../widgets/Zoom ../../widgets/NavigationToggle dojo/dom-geometry".split(" "),function(d,t,h,f,e,g,k,l,m,n,p,q,r){d=function(d){function a(b){b=d.call(this)||this;return b._defaultPositionLookup=null,b.components=[],b}return h(a,d),a.prototype.initialize=function(){this._handles.add([g.init(this,
"components",this._componentsWatcher.bind(this)),g.init(this,"view",this._updateViewAwareWidgets.bind(this))])},a.prototype._findComponentPosition=function(b){if(!this._defaultPositionLookup){var c=r.isBodyLtr();this._defaultPositionLookup={attribution:"manual",compass:c?"top-left":"top-right","navigation-toggle":c?"top-left":"top-right",zoom:c?"top-left":"top-right"}}return this._defaultPositionLookup[b]},a.prototype._removeComponents=function(b){var c=this;b.forEach(function(b){(b=c.find(b))&&(c.remove(b),
b.destroy())})},a.prototype._updateViewAwareWidgets=function(b){var c=this;this.components.forEach(function(a){(a=(a=c.find(a))&&a.widget)&&void 0!==a.view&&a.set("view",b)})},a.prototype._componentsWatcher=function(b,a){this._removeComponents(a);this._addComponents(b)},a.prototype._addComponents=function(b){var a=this;this.initialized&&b.forEach(function(b){return a.add(a._createComponent(b),a._findComponentPosition(b))})},a.prototype._createComponent=function(b){var a=this._createWidget(b);return a?
new l({id:b,node:a}):void 0},a.prototype._createWidget=function(a){return"attribution"===a?this._createAttribution():"compass"===a?this._createCompass():"navigation-toggle"===a?this._createNavigationToggle():"zoom"===a?this._createZoom():void 0},a.prototype._createAttribution=function(){return new m({view:this.view})},a.prototype._createCompass=function(){return new n({view:this.view})},a.prototype._createNavigationToggle=function(){return new q({view:this.view})},a.prototype._createZoom=function(){return new p({view:this.view})},
a}(e.declared(k));return f([e.property()],d.prototype,"components",void 0),d=f([e.subclass("esri.views.ui.DefaultUI")],d)});