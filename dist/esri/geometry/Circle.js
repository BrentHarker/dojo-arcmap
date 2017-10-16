//>>built
define("../core/lang ./Point ./Polygon ./support/geodesicUtils ./support/webMercatorUtils ./support/WKIDUnitConversion dojo/_base/lang".split(" "),function(l,q,k,r,m,h,t){var n={centimeters:.01,decimeters:.1,feet:.3048,inches:.0254,kilometers:1E3,meters:1,miles:1609.34,millimeters:.001,"nautical-miles":1852,yards:.9144,"decimal-degrees":111320},p=k.createSubclass({declaredClass:"esri.geometry.Circle",normalizeCtorArgs:function(a,b){var e;if(a&&a.center)e=a;else{if(a&&a.rings)return this.inherited(arguments);
e={center:a}}return t.mixin(this.inherited(arguments,[]),e,b)},initialize:function(){var a=this.center,b=this.numberOfPoints;if(this.hasZ=a&&a.hasZ,0===this.rings.length&&a){var e=this.radius*n[this.radiusUnit],c=a.spatialReference,d="geographic";if(c.isWebMercator?d="webMercator":(l.isDefined(h[c.wkid])||c.wkt&&0===c.wkt.indexOf("PROJCS"))&&(d="projected"),this.geodesic){var g;switch(d){case "webMercator":g=m.webMercatorToGeographic(a);break;case "projected":console.error("Creating a geodesic circle requires the center to be specified in web mercator or geographic coordinate system");
break;case "geographic":g=a}a=this._createGeodesicCircle(g,e,b);"webMercator"===d&&(a=m.geographicToWebMercator(a))}else{var f;"webMercator"===d||"projected"===d?f=e/this._convert2Meters(1,a.spatialReference):"geographic"===d&&(f=e/n["decimal-degrees"]);a=this._createPlanarCircle(a,f,b)}this.spatialReference=a.spatialReference;this.addRing(a.rings[0])}},properties:{center:{value:null,type:q},geodesic:!1,numberOfPoints:60,radius:1E3,radiusUnit:"meters"},clone:function(){return new p({rings:this.rings,
hasZ:this.hasZ,hasM:this.hasM,spatialReference:this.spatialReference})},_createGeodesicCircle:function(a,b,e){for(var c,d=0,g=Math.PI/180,f=[];d<2*Math.PI;)c=r._directGeodeticSolver(a.y*g,a.x*g,d,b),c=c.toArray(),this.hasZ&&c.push(a.z),f.push(c),d+=Math.PI/(e/2);return f.push(f[0]),new k(f)},_createPlanarCircle:function(a,b,e){for(var c,d,g=0,f=[];g<2*Math.PI;)c=a.x+Math.cos(-g)*b,d=a.y+Math.sin(-g)*b,c=[c,d],this.hasZ&&c.push(a.z),f.push(c),g+=Math.PI/(e/2);return f.push(f[0]),new k({spatialReference:a.spatialReference,
rings:[f]})},_convert2Meters:function(a,b){if(l.isDefined(h[b.wkid]))b=h.values[h[b.wkid]];else{b=b.wkt;var e=b.lastIndexOf(",")+1,c=b.lastIndexOf("]]");b=parseFloat(b.substring(e,c))}return a*b}});return p});