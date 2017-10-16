//>>built
define(["dojo/_base/lang","../../util/oo","../_Plugin","../../manager/_registry"],function(e,c,r,t){c=c.declare(r,function(a){this.domNode=a.node;var b;this.toolbar=a.scope;this.connect(this.toolbar,"onToolClick",this,function(){this.onSetPan(!1)});this.connect(this.keys,"onKeyUp",this,"onKeyUp");this.connect(this.keys,"onKeyDown",this,"onKeyDown");this.connect(this.keys,"onArrow",this,"onArrow");this.connect(this.anchors,"onAnchorUp",this,"checkBounds");this.connect(this.stencils,"register",this,
"checkBounds");this.connect(this.canvas,"resize",this,"checkBounds");this.connect(this.canvas,"setZoom",this,"checkBounds");this.connect(this.canvas,"onScroll",this,function(){this._blockScroll?this._blockScroll=!1:(b&&clearTimeout(b),b=setTimeout(e.hitch(this,"checkBounds"),200))});this._mouseHandle=this.mouse.register(this)},{selected:!1,keyScroll:!1,type:"dojox.drawing.plugins.tools.Pan",onPanUp:function(a){if(a.id==this.button.id)this.onSetPan(!1)},onKeyUp:function(a){switch(a.keyCode){case 32:this.onSetPan(!1);
break;case 39:case 37:case 38:case 40:clearInterval(this._timer)}},onKeyDown:function(a){if(32==a.keyCode)this.onSetPan(!0)},interval:20,onArrow:function(a){this._timer&&clearInterval(this._timer);this._timer=setInterval(e.hitch(this,function(a){this.canvas.domNode.parentNode.scrollLeft+=10*a.x;this.canvas.domNode.parentNode.scrollTop+=10*a.y},a),this.interval)},onSetPan:function(a){if(!0===a||!1===a)this.selected=!a;this.selected?(this.selected=!1,this.button.deselect()):(this.selected=!0,this.button.select());
this.mouse.setEventMode(this.selected?"pan":"")},onPanDrag:function(a){this.canvas.domNode.parentNode.scrollTop-=a.move.y;this.canvas.domNode.parentNode.scrollLeft-=a.move.x;this.canvas.onScroll()},onUp:function(a){this.keyScroll=a.withinCanvas?!0:!1},onStencilUp:function(a){this.checkBounds()},onStencilDrag:function(a){},checkBounds:function(){var a=-Infinity,b=-1E4,c=0,e=0,m=this.stencils.group?this.stencils.group.getTransform():{dx:0,dy:0},f=this.mouse.scrollOffset(),g=this.canvas.height,h=this.canvas.width,
n=this.canvas.zoom,k=this.canvas.parentHeight,l=this.canvas.parentWidth;this.stencils.withSelected(function(d){d=d.getBounds();a=Math.max(d.x2+m.dx,a);b=Math.max(d.y2+m.dy,b)});this.stencils.withUnselected(function(d){d=d.getBounds();a=Math.max(d.x2,a);b=Math.max(d.y2,b)});var b=b*n,p=0,q=0;b>k||f.top?(g=Math.max(b,k+f.top),e=f.top,p+=this.canvas.getScrollWidth()):!e&&g>k&&(g=k);a*=n;a>l||f.left?(h=Math.max(a,l+f.left),c=f.left,q+=this.canvas.getScrollWidth()):!c&&h>l&&(h=l);h+=2*p;g+=2*q;this._blockScroll=
!0;this.stencils.group&&this.stencils.group.applyTransform({dx:0,dy:0});this.stencils.withUnselected(function(a){a.transformPoints({dx:0,dy:0})});this.canvas.setDimensions(h,g,c,e)}});c.setup={name:"dojox.drawing.plugins.tools.Pan",tooltip:"Pan Tool",iconClass:"iconPan",button:!1};e.setObject("dojox.drawing.plugins.tools.Pan",c);t.register(c.setup,"plugin");return c});