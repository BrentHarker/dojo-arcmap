//>>built
define("dojo/_base/declare dojo/_base/kernel dojo/_base/lang dojo/_base/array dojo/_base/event dojo/_base/connect dojo/dom-style dojo/dom-class dojo/dom-construct dojo/fx dijit/registry dijit/TitlePane dijit/_Container ./PortletSettings ./PortletDialogSettings".split(" "),function(n,p,h,k,q,r,e,c,l,v,m,t,u,w,x){p.experimental("dojox.widget.Portlet");return n("dojox.widget.Portlet",[t,u],{resizeChildren:!0,closable:!0,_parents:null,_size:null,dragRestriction:!1,buildRendering:function(){this.inherited(arguments);
e.set(this.domNode,"visibility","hidden")},postCreate:function(){this.inherited(arguments);c.add(this.domNode,"dojoxPortlet");c.remove(this.arrowNode,"dijitArrowNode");c.add(this.arrowNode,"dojoxPortletIcon dojoxArrowDown");c.add(this.titleBarNode,"dojoxPortletTitle");c.add(this.hideNode,"dojoxPortletContentOuter");c.add(this.domNode,"dojoxPortlet-"+(this.dragRestriction?"nonmovable":"movable"));var a=this;if(this.resizeChildren){this.subscribe("/dnd/drop",function(){a._updateSize()});this.subscribe("/Portlet/sizechange",
function(b){a.onSizeChange(b)});this.connect(window,"onresize",function(){a._updateSize()});var d=h.hitch(this,function(b,d){var c=m.byId(b);if(c.selectChild){var f=this.subscribe(b+"-selectChild",function(b){for(var d=a.domNode.parentNode;d;){if(d==b.domNode){a.unsubscribe(f);a._updateSize();break}d=d.parentNode}});b=m.byId(d);c&&b&&a._parents.push({parent:c,child:b})}}),f;this._parents=[];for(var b=this.domNode.parentNode;null!=b;b=b.parentNode){var g=b.getAttribute?b.getAttribute("widgetId"):null;
g&&(d(g,f),f=g)}}this.connect(this.titleBarNode,"onmousedown",function(a){return c.contains(a.target,"dojoxPortletIcon")?(q.stop(a),!1):!0});this.connect(this._wipeOut,"onEnd",function(){a._publish()});this.connect(this._wipeIn,"onEnd",function(){a._publish()});this.closable&&(this.closeIcon=this._createIcon("dojoxCloseNode","dojoxCloseNodeHover",h.hitch(this,"onClose")),e.set(this.closeIcon,"display",""))},startup:function(){if(!this._started){var a=this.getChildren();this._placeSettingsWidgets();
k.forEach(a,function(a){try{a.started||a._started||a.startup()}catch(f){}});this.inherited(arguments);e.set(this.domNode,"visibility","visible")}},_placeSettingsWidgets:function(){k.forEach(this.getChildren(),h.hitch(this,function(a){a.portletIconClass&&a.toggle&&!a.get("portlet")&&(this._createIcon(a.portletIconClass,a.portletIconHoverClass,h.hitch(a,"toggle")),l.place(a.domNode,this.containerNode,"before"),a.set("portlet",this),this._settingsWidget=a)}))},_createIcon:function(a,d,f){var b=l.create("div",
{"class":"dojoxPortletIcon "+a,waiRole:"presentation"});l.place(b,this.arrowNode,"before");this.connect(b,"onclick",f);d&&(this.connect(b,"onmouseover",function(){c.add(b,d)}),this.connect(b,"onmouseout",function(){c.remove(b,d)}));return b},onClose:function(a){e.set(this.domNode,"display","none")},onSizeChange:function(a){a!=this&&this._updateSize()},_updateSize:function(){this.open&&this._started&&this.resizeChildren&&(this._timer&&clearTimeout(this._timer),this._timer=setTimeout(h.hitch(this,function(){for(var a=
{w:e.get(this.domNode,"width"),h:e.get(this.domNode,"height")},d=0;d<this._parents.length;d++){var c=this._parents[d],b=c.parent.selectedChildWidget;if(b&&b!=c.child)return}if(!this._size||this._size.w!=a.w||this._size.h!=a.h){this._size=a;var g=["resize","layout"];this._timer=null;a=this.getChildren();k.forEach(a,function(a){for(var b=0;b<g.length;b++)if(h.isFunction(a[g[b]])){try{a[g[b]]()}catch(y){}break}});this.onUpdateSize()}}),100))},onUpdateSize:function(){},_publish:function(){r.publish("/Portlet/sizechange",
[this])},_onTitleClick:function(a){a.target==this.arrowNode&&this.inherited(arguments)},addChild:function(a){this._size=null;this.inherited(arguments);this._started&&(this._placeSettingsWidgets(),this._updateSize());!this._started||a.started||a._started||a.startup()},destroyDescendants:function(a){this.inherited(arguments);this._settingsWidget&&this._settingsWidget.destroyRecursive(a)},destroy:function(){this._timer&&clearTimeout(this._timer);this.inherited(arguments)},_setCss:function(){this.inherited(arguments);
e.set(this.arrowNode,"display",this.toggleable?"":"none")}})});