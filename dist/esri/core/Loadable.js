//>>built
define("./Promise ./Accessor ./Error ./Warning dojo/aspect dojo/_base/lang dojo/Deferred".split(" "),function(d,c,e,f,g,h,k){return d.createSubclass([c],{declaredClass:"esri.core.Loadable","-chains-":h.mixin(c._meta.chains,{load:"after"}),constructor:function(){this._set("loadWarnings",[]);var b=new k;this.addResolvingPromise(b.promise);g.around(this,"load",function(a){return function(){return"not-loaded"===this.loadStatus&&(this.loadStatus="loading",a.apply(this),b.resolve(),b=null),this}});this.then(function(a){this.loadStatus=
"loaded"}.bind(this),function(a){this.loadStatus="failed";this.loadError=a}.bind(this))},properties:{loaded:{readOnly:!0,dependsOn:["loadStatus"],get:function(){return"loaded"===this.loadStatus}},loadError:null,loadStatus:"not-loaded",loadWarnings:{type:[f],readOnly:!0}},load:function(){},cancelLoad:function(){return this.isFulfilled()?this:(this.loadError=new e("load:cancelled","Cancelled"),this._promiseProps.cancel(this.loadError),this)}})});