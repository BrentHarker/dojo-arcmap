//>>built
define(["require","exports"],function(a,d){Object.defineProperty(d,"__esModule",{value:!0});a=function(){function a(c,b){void 0===b&&(b=[]);this.eventType=c;this.keyModifiers=b}return a.prototype.matches=function(c){if(c.type!==this.eventType)return!1;if(0===this.keyModifiers.length)return!0;c=c.modifiers;for(var b=0,a=this.keyModifiers;b<a.length;b++)if(!c.has(a[b]))return!1;return!0},a}();d.EventMatch=a});