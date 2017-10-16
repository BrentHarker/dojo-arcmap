//>>built
require({cache:{"url:esri/widgets/UnivariateColorSizeSlider/templates/UnivariateColorSizeSlider.html":'\x3cdiv class\x3d"${_css.container}"\x3e\n  \x3cdiv data-dojo-attach-point\x3d"_containerNode"\x3e\n    \x3cdiv data-dojo-attach-point\x3d"_titleNode"\x3e\x3c/div\x3e\n    \x3cdiv data-dojo-attach-point\x3d"_sliderNode"\x3e\x3c/div\x3e\n    \x3cdiv data-dojo-attach-point\x3d"_scaleNode"\x3e\x3c/div\x3e\n  \x3c/div\x3e\n\x3c/div\x3e'}});
define("./Widgette ../core/numberUtils ../renderers/support/utils ../widgets/RendererSlider ../widgets/RendererSlider/sliderUtils ../Color dijit/_TemplatedMixin dojo/_base/array dojo/_base/lang dojo/debounce dojo/dom-style dojo/dom-construct dojo/dom-class dojox/gfx dojo/text!./UnivariateColorSizeSlider/templates/UnivariateColorSizeSlider.html".split(" "),function(p,q,r,t,h,m,u,n,k,v,g,w,x,l,y){return p.createSubclass([u],{_rampNode:null,_sliderHeight:null,_barsGroup:null,_updateTimer:null,_css:null,
_defaultHeight:200,_handles:[0,1],declaredClass:"esri.widgets.UnivariateColorSizeSlider",templateString:y,properties:{visualVariables:[],values:null,minValue:{dependsOn:["statistics"],get:function(){return this.get("statistics.min")||0},set:function(a){return void 0===a?this._clearOverride("minValue"):void this._override("minValue",a)}},maxValue:{dependsOn:["statistics"],get:function(){return this.get("statistics.max")||100},set:function(a){return void 0===a?this._clearOverride("maxValue"):void this._override("maxValue",
a)}},minSize:null,maxSize:null,histogram:null,statistics:null,zoomOptions:null,histogramVisible:!0,statisticsVisible:!0,labelsVisible:!0,ticksVisible:!0,handlesVisible:!0,histogramWidth:100,rampWidth:26,symbolWidth:50},constructor:function(){this._css={container:"esri-color-and-size-slider",handlerTickSize:"esri-handler-tick-size"};this._attachSymbols=v(this._attachSymbols,0)},postCreate:function(){this.inherited(arguments);this._setUpDataDefaults()},startup:function(){this.inherited(arguments);this._slider=
new t({type:"UnivariateColorSizeSlider",values:this.values,isDate:this.isDate,minimum:this.zoomOptions?this.zoomOptions.minSliderValue:this.minValue,maximum:this.zoomOptions?this.zoomOptions.maxSliderValue:this.maxValue,_minZoomLabel:this.zoomOptions?this.minValue:null,_maxZoomLabel:this.zoomOptions?this.maxValue:null,_isZoomed:this.zoomOptions?!0:!1,labelsVisible:this.labelsVisible,ticksVisible:this.ticksVisible,handlesVisible:this.handlesVisible,handles:this._handles},this._sliderNode);this._slider.startup();
this._rampNode=this._slider._sliderAreaRight;this._sliderHeight=g.get(this._rampNode,"height")||this._defaultHeight;this._createSVGSurfaces();this._slider.on("slide",k.hitch(this,function(a){this._colorInfoAutoAdjust();this._fillRamp(a.values)}));this._slider.on("data-change",k.hitch(this,function(a){a=a.values;var b=this._getSizeVisualVariable();b.minDataValue=a[0];b.maxDataValue=a[1];this.values=a;this._colorInfoAutoAdjust();this._fillRamp();this.emit("data-change",{})}));this._slider.on("handle-value-change",
k.hitch(this,function(a){a=a.values;var b=this._getSizeVisualVariable();b.minDataValue=a[0];b.maxDataValue=a[1];this.values=a;this._updateRendererSlider();this.emit("handle-value-change",{})}));this._slider.on("data-value-change",k.hitch(this,function(a){this.set({minValue:a.min,maxValue:a.max});this._updateRendererSlider();this.emit("data-value-change",{})}));this._slider.on("stop",k.hitch(this,function(){this.emit("handle-value-change",{})}));this._slider.on("zoom-out",k.hitch(this,function(){this.zoomOptions=
null}));this.statistics&&this.statisticsVisible&&this._generateStatistics();this.histogramVisible&&(this.histogram||this.zoomOptions&&this.zoomOptions.histogram)&&this._generateHistogram();this.watch("minValue, maxValue, symbol, visualVariables, minSize, maxSize, statistics, histogram, zoomOptions",this._updateTimeout);this.watch("histogramVisible",this._toggleHistogram);this.watch("zoomOptions",this._zoomEventHandler)},destroy:function(){this._slider&&this._slider.destroy();this._avgHandleObjs&&
this._avgHandleObjs.avgHandleTooltip&&this._avgHandleObjs.avgHandleTooltip.destroy();this.countTooltips&&n.forEach(this.countTooltips,function(a){a.destroy()})},refresh:function(){this._updateTimeout()},_updateTimeout:function(){this._updateRendererSlider()},_updateRendererSlider:function(){var a=this._getSizeVisualVariable();this.set({minSize:a.minSize,maxSize:a.maxSize,values:[a.minDataValue,a.maxDataValue]});this.minValue===this.maxValue&&(0===this.minValue?this.set({maxValue:100,values:[20,80]}):
null===this.minValue?this.set({minValue:0,maxValue:100,values:[20,80]}):this.set({minValue:0,maxValue:2*this.minValue,values:[this.maxValue/5,this.maxValue/5*4]}));null!==this.zoomOptions&&!1!==this.zoomOptions?(this.toggleSliderBottom=this.zoomOptions.minSliderValue>this.minValue,this.toggleSliderTop=this.zoomOptions.maxSliderValue<this.maxValue,this._slider.set({minimum:this.zoomOptions.minSliderValue,maximum:this.zoomOptions.maxSliderValue})):(this._slider.set({minimum:this.minValue,maximum:this.maxValue}),
this._minZoomLabel=null,this._maxZoomLabel=null,this._isZoomed=!0);this._slider.set("values",this.values);this._slider._reset();this._slider._updateRoundedLabels();this._slider._generateMoveables();this._clearRect();this._createSVGSurfaces();this.statistics&&this.statisticsVisible&&this._generateStatistics();this.histogramVisible&&(this.histogram||this.zoomOptions&&this.zoomOptions.histogram)&&this._generateHistogram()},_zoomEventHandler:function(a){this.emit("zoom",{zoomed:!!this.zoomOptions})},
_setUpDataDefaults:function(){var a=this._getSizeVisualVariable();this.set({minSize:a.minSize,maxSize:a.maxSize});null!==this.zoomOptions&&!1!==this.zoomOptions&&(this.toggleSliderBottom=this.zoomOptions.minSliderValue>this.minValue,this.toggleSliderTop=this.zoomOptions.maxSliderValue<this.maxValue);null===a.minDataValue&&null===a.maxDataValue||0===a.minDataValue&&0===a.maxDataValue?null===this.minValue&&null===this.maxValue&&this.set({minValue:0,maxValue:100,values:[20,80]}):this.minValue===this.maxValue?
0===this.minValue?this.set({maxValue:100,values:[20,80]}):null===this.minValue?this.set({minValue:0,maxValue:100,values:[20,80]}):this.set({minValue:0,maxValue:2*this.minValue,values:[this.maxValue/5,this.maxValue/5*4]}):this.values=[a.minDataValue,a.maxDataValue];null===this.minValue&&(this.minValue=0);null===this.maxValue&&(this.maxValue=100)},_colorInfoAutoAdjust:function(){var a,b=this._getColorVisualVariable().stops,c=b.length-1,d=b[0].value=this._slider.values[0],e=b[c].value=this._slider.values[1];
for(a=0;c>=a;a++)b[a].value=d*(c-a)/c+e*a/c;r.updateColorStops({stops:b,changes:this._slider.values,isDate:this.isDate})},_getSizeVisualVariable:function(){var a;return n.some(this.visualVariables,function(b){return"size"===b.type?(a=b,!0):void 0}),a},_getColorVisualVariable:function(){var a;return n.some(this.visualVariables,function(b){return"color"===b.type?(a=b,!0):void 0}),a},_createSVGSurfaces:function(){this._proportionalSymbolSurface=l.createSurface(this._rampNode,this.rampWidth,this._sliderHeight);
this._surfaceRect=this._proportionalSymbolSurface.createRect({width:this.rampWidth,height:this._sliderHeight});this._histogramSurface=h.generateHistogramSurface(this._rampNode,this.histogramWidth,this._sliderHeight,this.rampWidth);this._fillRamp();this._attachSymbols()},_attachSymbols:function(){this._attachSymbol(this._slider.moveables[0],this.minSize,"min");this._attachSymbol(this._slider.moveables[1],this.maxSize,"max")},_attachSymbol:function(a,b){var c=g.get(a.handleContainer,"height"),d=this.symbol||
{type:"custom"};switch(a.symbol||(a.symbol=w.create("div",{style:"position: absolute; left: 10px;"},a)),d.type){case "simple-line-symbol":b=b===this.minSize?5:13;this._generateLineSymbol(a,b,c);break;case "simple-marker-symbol":b=b===this.minSize?12:48;this._generateCircleSymbol(a.symbol,b,c);break;default:b=b===this.minSize?12:48,this._generateCircleSymbol(a.symbol,b,c)}return a.symbol},_generateLineSymbol:function(a,b,c){var d,e=a.symbol;return x.add(a.tick,this._css.handlerTickSize),g.set(e,"top",
c/2-b+"px"),g.set(e,"height",2*b+"px"),g.set(e,"width",b-4+"px"),e.innerHTML="",d=l.createSurface(e),d.rawNode.style.position="absolute",d.rawNode.style.top=1===b?"1px":b/2+"px",this.isLeftToRight()||(d.rawNode.style.left="-45px"),d.setDimensions(this.rampWidth,b),d.createRect({width:this.rampWidth,height:b}).setFill(new m([0,0,0,.4])),d},_generateCircleSymbol:function(a,b,c){var d,e=b/2;b=12===b?!0:!1;var f=this.isLeftToRight();return g.set(a,"top",c/2-(e+1)+"px"),g.set(a,"height",2*(e+1)+"px"),
g.set(a,"width",b?2*(e+1):e+"px"),g.set(a,"left",b?"8px":"10px"),a.innerHTML="",d=l.createSurface(a),d.rawNode.style.position="absolute",this.isLeftToRight()||(d.rawNode.style.left=b?"-35px":"-53px"),b?(d.setDimensions(2*(e+1),2*(e+1)),d.createCircle({cx:7,cy:e+1,r:e}).setFill(new m([0,0,0,.4])).setStroke("#FFF")):(d.setDimensions(e+1,2*(e+1)),d.createCircle({cx:f?0:23,cy:e+1,r:e}).setFill(new m([0,0,0,.2])).setStroke("#FFF")),d},_fillRamp:function(a){var b;b=this._getColorVisualVariable();b=k.clone(b.stops);
var c=this._slider,d=c.minimum,e=c.maximum,f=this._sliderHeight,h=Math.round(f-((a?a[0]:c.values[0])-c.minimum)/(c.maximum-c.minimum)*f);a=Math.round(f-((a?a[1]:c.values[1])-c.minimum)/(c.maximum-c.minimum)*f);var c=this.rampWidth,m=this.isLeftToRight();n.forEach(b,function(a){a.offset=(e-a.value)/(e-d)});b.reverse();m?(this._proportionalSymbolSurface.clear(),this._proportionalSymbolSurface.createPath().moveTo(c,0).lineTo(c,a).lineTo(10,h).lineTo(10,f).lineTo(0,f).lineTo(0,0).closePath().setStroke("#FFF").setFill({type:"linear",
x1:0,y1:0,x2:0,y2:f,colors:b})):(this._proportionalSymbolSurface.clear(),this._proportionalSymbolSurface.createPath().moveTo(c,0).lineTo(c,f).lineTo(c-10,f).lineTo(c-10,h).lineTo(0,a).lineTo(0,0).closePath().setStroke("#FFF").setFill({type:"linear",x1:0,y1:0,x2:0,y2:f,colors:b}));g.set(this._proportionalSymbolSurface.rawNode,"overflow","visible");g.set(this._proportionalSymbolSurface.rawNode,"background-color","#d9d9d9");b={color:"#FFF",width:3};null!==this.zoomOptions&&!1!==this.zoomOptions&&(this.toggleSliderBottom&&
this.toggleSliderTop?(this._proportionalSymbolSurface.createPath("M0,1 L6.25,-1 L12.5,1 L18.75,-1 L25,1").setStroke(b).setTransform(l.matrix.translate(0,5)),this._proportionalSymbolSurface.createPath("M0,1 L6.25,-1 L12.5,1 L18.75,-1 L25,1").setStroke(b).setTransform(l.matrix.translate(0,195))):this.toggleSliderBottom?this._proportionalSymbolSurface.createPath("M0,1 L6.25,-1 L12.5,1 L18.75,-1 L25,1").setStroke(b).setTransform(l.matrix.translate(0,195)):this.toggleSliderTop&&this._proportionalSymbolSurface.createPath("M0,1 L6.25,-1 L12.5,1 L18.75,-1 L25,1").setStroke(b).setTransform(l.matrix.translate(0,
5)))},_clearRect:function(){this._proportionalSymbolSurface.destroy();this._histogramSurface.destroy()},_showHistogram:function(){this.histogram||this.zoomOptions&&this.zoomOptions.histogram?this._generateHistogram():this._barsGroup&&(this._barsGroup.destroy(),this._barsGroup=null)},_toggleHistogram:function(){this.histogramVisible?(g.set(this._barsGroup.rawNode,"display","inline-block"),this._showHistogram()):g.set(this._barsGroup.rawNode,"display","none")},_generateHistogram:function(){var a=this.zoomOptions&&
this.zoomOptions.histogram?this.zoomOptions.histogram:this.histogram;this._barsGroup=h.generateHistogram(this._histogramSurface,a,this.histogramWidth,this.rampWidth,this.isLeftToRight());this.countTooltips=h.generateCountTooltips(a,this._barsGroup)},_generateStatistics:function(){if(!(2>this.statistics.count||isNaN(this.statistics.avg))){var a,b,c,d=this.statistics;a=this._slider;var e=this.zoomOptions||null,f=h.getPrecision(this.maxValue);d.min===d.max&&d.min===d.avg?(b=0,c=2*d.avg):(b=d.min,c=d.max);
(b!==a.minimum||c!==a.maximum)&&(b=a.minimum,c=a.maximum);e&&(b=e.minSliderValue,c=e.maxSliderValue);a=this._sliderHeight*(c-d.avg)/(c-b);b=q.round([d.avg,c,b])[0];this._avgHandleObjs=h.generateAvgLine(this._histogramSurface,b,a,f,this.isLeftToRight(),this.isDate)}}})});