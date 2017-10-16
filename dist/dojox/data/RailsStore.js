//>>built
define(["dojo","dojox","dojox/data/JsonRestStore"],function(f,g){return f.declare("dojox.data.RailsStore",g.data.JsonRestStore,{constructor:function(){},preamble:function(a){if("string"==typeof a.target&&!a.service){var d=a.target.replace(/\/$/g,"");a.service=g.rpc.Rest(this.target,!0,null,function(a,b){b=b||{};var c=d,e;f.isObject(a)?(e="",a="?"+f.objectToQuery(a)):b.queryStr&&-1!=b.queryStr.indexOf("?")?(e=b.queryStr.replace(/\?.*/,""),a=b.queryStr.replace(/[^?]*\?/g,"?")):f.isString(b.query)&&
-1!=b.query.indexOf("?")?(e=b.query.replace(/\?.*/,""),a=b.query.replace(/[^?]*\?/g,"?")):(e=a?a.toString():"",a="");-1!=e.indexOf("\x3d")&&(a=e,e="");var h=g.rpc._sync;g.rpc._sync=!1;return{url:e?c+"/"+e+".json"+a:c+".json"+a,handleAs:"json",contentType:"application/json",sync:h,headers:{Accept:"application/json,application/javascript",Range:b&&(0<=b.start||0<=b.count)?"items\x3d"+(b.start||"0")+"-"+(b.count&&b.count+(b.start||0)-1||""):void 0}}})}},fetch:function(a){function d(b){null==a.queryStr&&
(null==a.queryStr&&(a.queryStr=""),f.isObject(a.query)?a.queryStr="?"+f.objectToQuery(a.query):f.isString(a.query)&&(a.queryStr=a.query));var c=a,e=a.queryStr,d;d=-1==a.queryStr.indexOf("?")?"?":"\x26";c.queryStr=e+d+f.objectToQuery(b)}a=a||{};if(a.start||a.count){if((a.start||0)%a.count)throw Error("The start parameter must be a multiple of the count parameter");d({page:(a.start||0)/a.count+1,per_page:a.count})}if(a.sort){var c={sortBy:[],sortDir:[]};f.forEach(a.sort,function(a){c.sortBy.push(a.attribute);
c.sortDir.push(a.descending?"DESC":"ASC")});d(c);delete a.sort}return this.inherited(arguments)},_processResults:function(a,d){var c;if("undefined"==typeof this.rootAttribute&&a[0])if(a[0][this.idAttribute])this.rootAttribute=!1;else for(c in a[0])a[0][c][this.idAttribute]&&(this.rootAttribute=c);c=this.rootAttribute?f.map(a,function(a){return a[this.rootAttribute]},this):a;a=a.length;return{totalCount:d.fullLength||(d.request.count==a?(d.request.start||0)+2*a:a),items:c}}})});