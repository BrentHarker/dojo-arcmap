//>>built
define(["dojo/_base/lang","../request","../geometry/support/normalizeUtils","./Task","./support/IdentifyResult"],function(c,e,f,g,h){return g.createSubclass({declaredClass:"esri.tasks.IdentifyTask",properties:{gdbVersion:{value:null,type:String},parsedUrl:{get:function(){var a=this._parseUrl(this.url);return a.path+="/identify",a}},url:{}},execute:function(a,d){return f.normalizeCentralMeridian(a.geometry?[a.geometry]:[]).then(function(b){b=this._encode(c.mixin({},this.parsedUrl.query,{f:"json"},
a.toJSON({geometry:b&&b[0]})));this.gdbVersion&&(b.gdbVersion=this.gdbVersion);b={query:b,callbackParamName:"callback"};return(this.requestOptions||d)&&(b=c.mixin({},this.requestOptions,d,b)),e(this.parsedUrl.path,b)}.bind(this)).then(this._handleExecuteResponse)},_handleExecuteResponse:function(a){a=a.data;return a.results=(a.results||[]).map(function(a){return h.fromJSON(a)}),a}})});