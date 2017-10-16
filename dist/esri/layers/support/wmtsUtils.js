//>>built
define("require exports ../../geometry/Extent ../../geometry/Point ../../geometry/SpatialReference ../../geometry/support/WKIDUnitConversion ./TileInfo".split(" "),function(K,r,B,u,C,t,D){function m(a,b){return(a=b.getElementsByTagName(a))&&0<a.length?a[0]:null}function p(a,b){return Array.prototype.slice.call(b.getElementsByTagName(a)).map(function(a){return a.textContent})}function h(a,b){return a.split("\x3e").forEach(function(a){b=m(a,b)}),b&&b.textContent}function q(a,b,f,e){var c;return Array.prototype.slice.call(e.childNodes).some(function(e){if(-1<
e.nodeName.indexOf(a)){var d=m(b,e),d=d&&d.textContent;return d===f||f.split(":")&&f.split(":")[1]===d?(c=e,!0):!1}}),c}function v(a){var b,f,e,c,g=[],d=w[a],k=Array.prototype.slice.call(d.getElementsByTagName("ResourceURL")),d=d.getElementsByTagName("Dimension");return d.length&&(b=h("Identifier",d[0]),f=p("Default",d[0])||p("Value",d[0])),1<d.length&&(e=h("Identifier",d[1]),c=p("Default",d[1])||p("Value",d[1])),n[a]={dimensions:f,dimensions2:c},k.forEach(function(a){var d=a.getAttribute("template");
if(b&&f.length)if(-1<d.indexOf("{"+b+"}"))d=d.replace("{"+b+"}","{dimensionValue}");else{var l=d.toLowerCase().indexOf("{"+b.toLowerCase()+"}");-1<l&&(d=d.substring(0,l)+"{dimensionValue}"+d.substring(l+b.length+2))}e&&c.length&&(-1<d.indexOf("{"+e+"}")?d=d.replace("{"+e+"}","{dimensionValue2}"):(l=d.toLowerCase().indexOf("{"+e.toLowerCase()+"}"),-1<l&&(d=d.substring(0,l)+"{dimensionValue2}"+d.substring(l+e.length+2))));g.push({template:d,format:a.getAttribute("fomrat"),resourceType:a.getAttribute("resourceType")})}),
g}function F(a){return Array.prototype.slice.call(a.getElementsByTagName("Style")).map(function(a){var b=m("LegendURL",a),e=m("Keywords",a),e=e&&p("Keyword",e);return{"abstract":h("Abstract",a),id:h("Identifier",a),isDefault:"true"===a.getAttribute("isDefault"),keywords:e,legendUrl:b&&b.getAttribute("xlink:href"),title:h("Title",a)}})}function G(a,b){return p("TileMatrixSet",a).map(function(f){return H(f,a,b)})}function H(a,b,f){b=q("TileMatrixSetLink","TileMatrixSet",a,b);b=p("TileMatrix",b);var e=
q("TileMatrixSet","Identifier",a,f);f=I(e);var c=f.spatialReference,g=c.wkid,d=m("TileMatrix",e),d=[parseInt(h("TileWidth",d),10),parseInt(h("TileHeight",d),10)],k=[];b.length?b.forEach(function(c,b){c=q("TileMatrix","Identifier",c,e);k.push(x(c,g,b,a))}):Array.prototype.slice.call(e.getElementsByTagName("TileMatrix")).forEach(function(c,b){k.push(x(c,g,b,a))});b=J(e,f,d,k[0]);return{id:a,fullExtent:b,tileInfo:new D({dpi:96,spatialReference:c,size:d,origin:f,lods:k})}}function I(a){var b=h("SupportedCRS",
a);b&&(b=b.toLowerCase());var f=parseInt(b.split(":").pop(),10);900913!==f&&3857!==f||(f=102100);var e=!1;-1<b.indexOf("crs84")||-1<b.indexOf("crs:84")?(f=4326,e=!0):-1<b.indexOf("crs83")||-1<b.indexOf("crs:83")?(f=4269,e=!0):(-1<b.indexOf("crs27")||-1<b.indexOf("crs:27"))&&(f=4267,e=!0);var c,g=new C({wkid:f});a=m("TileMatrix",a);var d=h("TopLeftCorner",a).split(" ");a=d[0].split("E").map(function(a){return Number(a)});var d=d[1].split("E").map(function(a){return Number(a)}),k=a[0],l=d[0];1<a.length&&
(k=a[0]*Math.pow(10,a[1]));1<d.length&&(l=d[0]*Math.pow(10,d[1]));var E=e&&4326===f&&90===k&&-180===l;return y.some(function(a,d){var h=Number(b.split(":").pop());return h>=a[0]&&h<=a[1]||4326===f&&(!e||E)?(c=new u(l,k,g),!0):(d===y.length-1&&(c=new u(k,l,g)),!1)}),c}function J(a,b,f,e){var c,g,d=m("BoundingBox",a);d&&(c=h("LowerCorner",d).split(" "),g=h("UpperCorner",d).split(" "));c&&1<c.length&&g&&1<g.length?(a=parseFloat(c[0]),f=parseFloat(c[1]),c=parseFloat(g[0]),g=parseFloat(g[1])):(a=m("TileMatrix",
a),c=parseFloat(h("MatrixWidth",a)),d=parseFloat(h("MatrixHeight",a)),a=b.x,g=b.y,c=a+c*f[0]*e.resolution,f=g-d*f[1]*e.resolution);return new B(a,f,c,g,b.spatialReference)}function x(a,b,f,e){var c=h("Identifier",a);a=h("ScaleDenominator",a).split("E").map(function(a){return Number(a)});a=1<a.length?a[0]*Math.pow(10,a[1]):a[0];b=z(b,a,e);return a*=96/A,{level:f,levelValue:c,scale:a,resolution:b}}function z(a,b,f){var e;return e=t.hasOwnProperty(String(a))?t.values[t[a]]:"default028mm"===f?6370997*
Math.PI/180:6378137*Math.PI/180,7*b/25E3/e}Object.defineProperty(r,"__esModule",{value:!0});var A=90.71428571428571,y=[[3819,3819],[3821,3824],[3889,3889],[3906,3906],[4001,4025],[4027,4036],[4039,4047],[4052,4055],[4074,4075],[4080,4081],[4120,4176],[4178,4185],[4188,4216],[4218,4289],[4291,4304],[4306,4319],[4322,4326],[4463,4463],[4470,4470],[4475,4475],[4483,4483],[4490,4490],[4555,4558],[4600,4646],[4657,4765],[4801,4811],[4813,4821],[4823,4824],[4901,4904],[5013,5013],[5132,5132],[5228,5229],
[5233,5233],[5246,5246],[5252,5252],[5264,5264],[5324,5340],[5354,5354],[5360,5360],[5365,5365],[5370,5373],[5381,5381],[5393,5393],[5451,5451],[5464,5464],[5467,5467],[5489,5489],[5524,5524],[5527,5527],[5546,5546],[2044,2045],[2081,2083],[2085,2086],[2093,2093],[2096,2098],[2105,2132],[2169,2170],[2176,2180],[2193,2193],[2200,2200],[2206,2212],[2319,2319],[2320,2462],[2523,2549],[2551,2735],[2738,2758],[2935,2941],[2953,2953],[3006,3030],[3034,3035],[3038,3051],[3058,3059],[3068,3068],[3114,3118],
[3126,3138],[3150,3151],[3300,3301],[3328,3335],[3346,3346],[3350,3352],[3366,3366],[3389,3390],[3416,3417],[3833,3841],[3844,3850],[3854,3854],[3873,3885],[3907,3910],[4026,4026],[4037,4038],[4417,4417],[4434,4434],[4491,4554],[4839,4839],[5048,5048],[5105,5130],[5253,5259],[5269,5275],[5343,5349],[5479,5482],[5518,5519],[5520,5520],[20004,20032],[20064,20092],[21413,21423],[21473,21483],[21896,21899],[22171,22177],[22181,22187],[22191,22197],[25884,25884],[27205,27232],[27391,27398],[27492,27492],
[28402,28432],[28462,28492],[30161,30179],[30800,30800],[31251,31259],[31275,31279],[31281,31290],[31466,31700]],n=new Map,w=new Map;r.parseCapabilities=function(a,b){a=a.replace(/ows:/gi,"");a=(new DOMParser).parseFromString(a,"text/xml").documentElement;var f=m("Contents",a);if(!f)return void console.error("The WMTS capabilities XML is not valid");var e,c,g,d=m("OperationsMetadata",a).querySelector("[name\x3d'GetTile']").getElementsByTagName("Get"),d=Array.prototype.slice.call(d),k=b.serviceMode;
d.some(function(a){var b=m("Constraint",a);return!b||q("AllowedValues","Value",k,b)?(c=a.attributes[0].nodeValue,!0):(!b||q("AllowedValues","Value","RESTful",b)?g=a.attributes[0].nodeValue:(!b||q("AllowedValues","Value","KVP",b))&&(e=a.attributes[0].nodeValue),!1)});c||("KVP"===k&&g?(c=g,k="RESTful"):"RESTful"===k&&e&&(c=e,k="KVP"));-1===c.indexOf("/1.0.0/")&&"RESTful"===k&&(c+="/");"KVP"===k&&(c+=-1<c.indexOf("?")?"":"?");b=h("ServiceIdentification\x3eAccessConstraints",a);a=Array.prototype.slice.call(f.getElementsByTagName("Layer")).map(function(a){var b=
h("Identifier",a);w[b]=a;var c=h("Abstract",a),d=p("Format",a),e,g=m("WGS84BoundingBox",a);e=g?h("LowerCorner",g).split(" "):["-180","-90"];g=g?h("UpperCorner",g).split(" "):["180","90"];e={xmin:parseFloat(e[0]),ymin:parseFloat(e[1]),xmax:parseFloat(g[0]),ymax:parseFloat(g[1]),spatialReference:{wkid:4326}};var g=F(a),k=h("Title",a);a=G(a,f);return{id:b,fullExtent:e,description:c,formats:d,styles:g,title:k,tileMatrixSets:a}});return{copyright:b,layers:a,tileUrl:c,serviceMode:k}};r.parseResourceInfo=
function(a){return a.layers.forEach(function(a){a.tileMatrixSets.forEach(function(a){var b=a.tileInfo;96!==b.dpi&&(b.lods.forEach(function(c){c.scale=96*c.scale/b.dpi;c.resolution=z(b.spatialReference.wkid,c.scale*A/96,a.id)}),b.dpi=96)})}),a};r.getTileUrlFromResourceUrls=function(a,b,f,e,c,g){var d=v(a),h=n[a].dimensions&&n[a].dimensions[0];a=n[a].dimensions2&&n[a].dimensions2[0];var l="";return d&&0<d.length&&(l=d[c%d.length].template.replace(/\{Style\}/gi,f).replace(/\{TileMatrixSet\}/gi,b).replace(/\{TileMatrix\}/gi,
e).replace(/\{TileRow\}/gi,c).replace(/\{TileCol\}/gi,g).replace(/\{dimensionValue\}/gi,h).replace(/\{dimensionValue2\}/gi,a)),l};r.getTileUrlTemplateFromResourceUrls=function(a,b,f,e){f=v(a);var c="";if(f&&0<f.length){var g=n[a].dimensions&&n[a].dimensions[0];a=n[a].dimensions2&&n[a].dimensions2[0];c=f[0].template;c.indexOf(".xxx")===c.length-4&&(c=c.slice(0,c.length-4));c=c.replace(/\{Style\}/gi,e);c=c.replace(/\{TileMatrixSet\}/gi,b);c=c.replace(/\{TileMatrix\}/gi,"{level}");c=c.replace(/\{TileRow\}/gi,
"{row}");c=c.replace(/\{TileCol\}/gi,"{col}");c=c.replace(/\{dimensionValue\}/gi,g);c=c.replace(/\{dimensionValue2\}/gi,a)}return c}});