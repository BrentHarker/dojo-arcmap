//>>built
define("require exports ../core/tsSupport/declareExtendsHelper ../core/tsSupport/decorateHelper ../core/accessorSupport/decorators ./support/widget ./Widget ./Attribution/AttributionViewModel".split(" "),function(b,m,k,d,g,f,l,h){b=function(b){function c(a){a=b.call(this)||this;return a._isOpen=!1,a._attributionTextOverflowed=!1,a._prevSourceNodeHeight=0,a.view=null,a.viewModel=new h,a}return k(c,b),c.prototype.render=function(){var a=(e={},e["esri-attribution--open"]=this._isOpen,e);return f.tsx("div",
{bind:this,"class":"esri-attribution esri-widget",classes:a,onclick:this._toggleState,onkeydown:this._toggleState},this._renderSourcesNode(),f.tsx("div",{"class":"esri-attribution__powered-by"},"Powered by ",f.tsx("a",{target:"_blank",href:"http://www.esri.com/","class":"esri-attribution__link"},"Esri")));var e},c.prototype._renderSourcesNode=function(){var a=this._isOpen,e=this._isInteractive(),b=e?0:-1,c=this.get("viewModel.attributionText"),a=(d={},d["esri-attribution__sources--open"]=a,d["esri-interactive"]=
e,d);return f.tsx("div",{afterCreate:this._afterSourcesNodeCreate,afterUpdate:this._afterSourcesNodeUpdate,bind:this,"class":"esri-attribution__sources",classes:a,innerHTML:c,role:e?"button":void 0,tabIndex:b});var d},c.prototype._afterSourcesNodeCreate=function(a){this._prevSourceNodeHeight=a.clientWidth},c.prototype._afterSourcesNodeUpdate=function(a){var b=!1,c=a.clientHeight;a=a.scrollWidth>=a.clientWidth;var d=this._attributionTextOverflowed!==a;if(this._attributionTextOverflowed=a,d&&(b=!0),
this._isOpen)a=c<this._prevSourceNodeHeight,this._prevSourceNodeHeight=c,a&&(this._isOpen=!1,b=!0);b&&this.scheduleRender()},c.prototype._toggleState=function(){this._isInteractive()&&(this._isOpen=!this._isOpen)},c.prototype._isInteractive=function(){return this._isOpen||this._attributionTextOverflowed},c}(g.declared(l));return d([g.aliasOf("viewModel.view")],b.prototype,"view",void 0),d([g.property({type:h}),f.renderable(["attributionText","state","view.size"])],b.prototype,"viewModel",void 0),
d([f.accessibleHandler()],b.prototype,"_toggleState",null),b=d([g.subclass("esri.widgets.Attribution")],b)});