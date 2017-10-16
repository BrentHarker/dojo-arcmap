//>>built
define("dojo/_base/lang ../../util/oo ../../manager/_registry ../../stencil/Path ../../annotations/Arrow ../../annotations/Label ../../tools/custom/Vector".split(" "),function(f,g,l,m,k,h,n){g=g.declare(m,function(a){this.closePath=!1;this.xArrow=new k({stencil:this,idx1:0,idx2:1});this.yArrow=new k({stencil:this,idx1:2,idx2:1});a.data&&(this.style.zAxisEnabled=1==a.data.cosphi?!0:!1,this.setData(a.data));if(this.style.zAxisEnabled){this.data.cosphi=1;var b={};f.mixin(b,a);f.mixin(b,{container:this.container.createGroup(),
style:this.style,showAngle:!1,label:null});!a.data||b.data.radius&&b.data.angle||(b.data.x2=b.data.x4,b.data.y2=b.data.y4);b.style.zAxis=!0;this.zAxis=new n(b);this.zAxis.minimumSize=5;this.connectMult([[this,"onChangeStyle",this.zAxis,"onChangeStyle"],[this,"select",this.zAxis,"select"],[this,"deselect",this.zAxis,"deselect"],[this,"onDelete",this.zAxis,"destroy"],[this,"onDrag",this,"zSet"],[this,"onTransform",this,"zSet"],[this.zAxis,"onBeforeRender",this,"zSet"],[this,"_onPostRender",this.zAxis,
"render"]])}this.points&&this.points.length&&(this.setPoints=this._postSetPoints,this.render(),a.label&&this.setLabel(a.label),a.shadow&&this.addShadow(a.shadow))},{draws:!0,type:"dojox.drawing.tools.custom.Axes",minimumSize:30,showAngle:!0,closePath:!1,baseRender:!1,zScale:.5,zPoint:function(a){a.radius=this.util.length(a);a=this.util.pointOnCircle(a.start.x,a.start.y,a.radius*this.zScale,this.style.zAngle);return{x:a.x,y:a.y,skip:!0,noAnchor:!0}},zSet:function(){if(this.zAxis){var a=this.points[1],
b=this.points[3],c=[{x:a.x,y:a.y},{x:b.x,y:b.y}];this.util.length({start:{x:a.x,y:a.y},x:b.x,y:b.y})>this.zAxis.minimumSize?this.zAxis.setPoints(c):!1;this.zAxis.cosphi=1}},createLabels:function(){var a={align:"middle",valign:"middle",util:this.util,annotation:!0,container:this.container,mouse:this.mouse,stencil:this};this.labelX=new h(f.mixin(a,{labelPosition:this.setLabelX}));this.labelY=new h(f.mixin(a,{labelPosition:this.setLabelY}));this.style.zAxisEnabled&&(this.labelZ=new h(f.mixin(a,{labelPosition:this.setLabelZ})))},
setLabelX:function(){var a=this.points[0],b=this.points[1],b=this.util.lineSub(b.x,b.y,a.x,a.y,40),a=this.util.lineSub(b.x,b.y,b.x+(b.y-a.y),b.y+(a.x-b.x),20);return{x:a.x,y:a.y,width:20}},setLabelY:function(){var a=this.points[1],b=this.points[2],a=this.util.lineSub(a.x,a.y,b.x,b.y,40),b=this.util.lineSub(a.x,a.y,a.x+(b.y-a.y),a.y+(a.x-b.x),20);return{x:b.x,y:b.y,width:20}},setLabelZ:function(){var a=this.points[1],b=this.points[3],a=this.util.lineSub(a.x,a.y,b.x,b.y,40),b=this.util.lineSub(a.x,
a.y,a.x+(a.y-b.y),a.y+(b.x-a.x),20);return{x:b.x,y:b.y,width:20}},setLabel:function(a){if(!this._labelsCreated){!this.labelX&&this.createLabels();var b="x",c="y",d="z";a&&(this.labelZ?(a=a.match(/(.*?)(and|&)(.*?)(and|&)(.*)/i),4<a.length&&(b=a[1].replace(/^\s+/,"").replace(/\s+$/,""),c=a[3].replace(/^\s+/,"").replace(/\s+$/,""),d=a[5].replace(/^\s+/,"").replace(/\s+$/,""))):(a=a.match(/(.*?)(and|&)(.*)/i),2<a.length&&(b=a[1].replace(/^\s+/,"").replace(/\s+$/,""),c=a[3].replace(/^\s+/,"").replace(/\s+$/,
""))));this.labelX.setLabel(b);this.labelY.setLabel(c);this.labelZ&&this.labelZ.setLabel(d);this._labelsCreated=!0}},getLabel:function(){return this.labelX?{x:this.labelX.getText(),y:this.labelY.getText(),z:this.labelZ?this.labelZ.getText():null}:null},anchorPositionCheck:function(a,b,c){a=this.container.getParent().getTransform();b=c.shape.getTransform();var d=this.points,e=d[1].x+a.dx,d=d[1].y+a.dy;return{x:e-(d-(b.dy+c.org.y+a.dy)),y:d-(b.dx+c.org.x+a.dx-e)}},onTransformBegin:function(a){this._isBeingModified=
!0},onTransformEnd:function(a){if(a){this._isBeingModified=!1;this._toggleSelected();var b=this.points[0],c=this.points[1];a={start:{x:c.x,y:c.y},x:b.x,y:b.y};var d=this.util.constrainAngle(a,0,89),e=this.style.zAxisEnabled?this.zPoint(a):null;d.x==b.x&&d.y==b.y?(d=this.util.snapAngle(a,this.angleSnap/180),a.x=d.x,a.y=d.y,d=a.start.x-(a.start.y-a.y),b=a.start.y-(a.x-a.start.x),0>d||0>b?console.warn("AXES ERROR LESS THAN ZERO - ABORT"):(this.points=[{x:a.x,y:a.y},{x:a.start.x,y:a.start.y,noAnchor:!0}],
this.points.push({x:d,y:b,noAnchor:!0}),e&&this.points.push(e),this.setPoints(this.points),this.onModify(this))):(this.points[0].x=d.x,this.points[0].y=d.y,b=this.points[0],d=c.x-(c.y-b.y),b=c.y-(b.x-c.x),this.points[2]={x:d,y:b,noAnchor:!0},e&&this.points.push(e),this.setPoints(this.points),this.labelX.setLabel(),this.labelY.setLabel(),this.labelZ&&this.labelZ.setLabel(),this.onModify(this))}},getBounds:function(a){var b=this.points[0],c=this.points[1],d=this.points[2];if(this.style.zAxisEnabled)var e=
this.points[3];if(a)return b={x:c.x,y:c.y,x1:c.x,y1:c.y,x2:b.x,y2:b.y,x3:d.x,y3:d.y},this.style.zAxisEnabled&&(b.x4=e.x,b.y4=e.y),b;a=this.style.zAxisEnabled?d.x<e.x?d.x:e.x:d.x;y1=d.y<b.y?d.y:b.y;x2=b.x;y2=this.style.zAxisEnabled?e.y:c.y;return{x1:a,y1:y1,x2:x2,y2:y2,x:a,y:y1,w:x2-a,h:y2-y1}},_postSetPoints:function(a){this.points[0]=a[0];this.pointsToData&&(this.data=this.pointsToData())},onTransform:function(a){a=this.points[0];var b=this.points[1];this.points[2]={x:b.x-(b.y-a.y),y:b.y-(a.x-b.x),
noAnchor:!0};this.style.zAxisEnabled&&(this.points[3]=this.zPoint({start:{x:b.x,y:b.y},x:a.x,y:a.y}));this.setPoints(this.points);if(!this._isBeingModified)this.onTransformBegin();this.render()},pointsToData:function(){var a=this.points,b={x1:a[1].x,y1:a[1].y,x2:a[0].x,y2:a[0].y,x3:a[2].x,y3:a[2].y};this.style.zAxisEnabled&&(b.x4=a[3].x,b.y4=a[3].y,b.cosphi=1);return b},getRadius:function(){var a=this.points;return this.util.length({start:{x:a[1].x,y:a[1].y},x:a[0].x,y:a[0].y})},dataToPoints:function(a){a=
a||this.data;if(a.radius||a.angle){var b=this.util.pointOnCircle(a.x,a.y,a.radius,a.angle),c,d=a.x-(a.y-b.y),e=a.y-(b.x-a.x);if(a.cosphi&&1==a.cosphi||this.style.zAxisEnabled)this.style.zAxisEnabled=!0,c=this.util.pointOnCircle(a.x,a.y,a.radius*this.zScale,this.style.zAngle);this.data=a={x1:a.x,y1:a.y,x2:b.x,y2:b.y,x3:d,y3:e};this.style.zAxisEnabled&&(this.data.x4=a.x4=c.x,this.data.y4=a.y4=c.y,this.data.cosphi=1)}this.points=[{x:a.x2,y:a.y2},{x:a.x1,y:a.y1,noAnchor:!0},{x:a.x3,y:a.y3,noAnchor:!0}];
this.style.zAxisEnabled&&this.points.push({x:a.x4,y:a.y4,skip:!0,noAnchor:!0});return this.points},onDrag:function(a){var b=this.util.constrainAngle(a,0,89);a.x=b.x;a.y=b.y;var b=a.start.x-(a.start.y-a.y),c=a.start.y-(a.x-a.start.x);0>b||0>c||(this.points=[{x:a.x,y:a.y},{x:a.start.x,y:a.start.y,noAnchor:!0}],this.points.push({x:b,y:c,noAnchor:!0}),this.style.zAxisEnabled&&(a=this.zPoint(a),this.points.push(a)),this.render())},onUp:function(a){if(this._downOnCanvas){this._downOnCanvas=!1;var b=this.points;
if(b.length){if(a=this.util.distance(b[1].x,b[1].y,b[0].x,b[0].y),b&&b.length)if(a<this.minimumSize)this.remove(this.shape,this.hit),this.xArrow.remove(this.xArrow.shape,this.xArrow.hit),this.yArrow.remove(this.yArrow.shape,this.yArrow.hit),this.zArrow&&this.zArrow.remove(this.zArrow.shape,this.zArrow.hit);else{a=b[0];b=b[1];a={start:{x:b.x,y:b.y},x:a.x,y:a.y};b=this.util.snapAngle(a,this.angleSnap/180);a.x=b.x;a.y=b.y;var b=a.start.x-(a.start.y-a.y),c=a.start.y-(a.x-a.start.x);0>b||0>c||(this.points=
[{x:a.x,y:a.y},{x:a.start.x,y:a.start.y,noAnchor:!0}],this.points.push({x:b,y:c,noAnchor:!0}),this.style.zAxisEnabled&&this.points.push(this.zPoint(a)),this.onRender(this),this.setPoints=this._postSetPoints)}}else a=a.start,this.points=[{x:a.x+100,y:a.y+100},{x:a.x,y:a.y+100,noAnchor:!0},{x:a.x,y:a.y,noAnchor:!0}],this.style.zAxisEnabled&&(a=this.zPoint({start:{x:a.x,y:a.y+100},x:a.x+100,y:a.y+100}),this.points.push(a)),this.setPoints=this._postSetPoints,this.pointsToData(),this.render(),this.onRender(this)}}});
f.setObject("dojox.drawing.tools.custom.Axes",g);g.setup={name:"dojox.drawing.tools.custom.Axes",tooltip:"Axes Tool",iconClass:"iconAxes"};l.register(g.setup,"tool");return g});