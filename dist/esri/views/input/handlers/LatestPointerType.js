//>>built
define(["require","exports","../../../core/tsSupport/extendsHelper","../InputHandler"],function(c,e,f,g){Object.defineProperty(e,"__esModule",{value:!0});c=function(c){function d(a){var b=c.call(this,"LatestPointerInteraction",!0)||this;return b._onChange=a,b._value="mouse",b.registerIncoming("pointer-down",function(a){b._setValue("touch"===a.data["native"].pointerType?"touch":"mouse")}),b._moveHandler=b.registerIncoming("pointer-move",function(a){b._setValue("touch"===a.data["native"].pointerType?
"touch":"mouse")}),b._moveHandler.pause(),b}return f(d,c),d.prototype._setValue=function(a){a!==this._value&&("touch"===a?this._moveHandler.resume():this._moveHandler.pause(),this._value=a,this._onChange(a))},d}(g.InputHandler);e.LatestPointerType=c});