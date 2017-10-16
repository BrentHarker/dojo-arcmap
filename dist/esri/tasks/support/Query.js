//>>built
define(["../../core/Accessor","../../core/kebabDictionary","../../core/lang","../../geometry/support/jsonUtils","dojo/_base/array"],function(n,d,p,q,r){var f=d({esriSpatialRelIntersects:"intersects",esriSpatialRelContains:"contains",esriSpatialRelCrosses:"crosses",esriSpatialRelEnvelopeIntersects:"envelope-intersects",esriSpatialRelIndexIntersects:"index-intersects",esriSpatialRelOverlaps:"overlaps",esriSpatialRelTouches:"touches",esriSpatialRelWithin:"within",esriSpatialRelRelation:"relation"}),
t=d({esriSRUnit_Meter:"meters",esriSRUnit_Kilometer:"kilometers",esriSRUnit_Foot:"feet",esriSRUnit_StatuteMile:"miles",esriSRUnit_NauticalMile:"nautical-miles",esriSRUnit_USNauticalMile:"us-nautical-miles"}),u=d({upperLeft:"upper-left",lowerLeft:"lower-left"});return n.createSubclass({declaredClass:"esri.tasks.support.Query",properties:{spatialRelationship:"intersects",text:null,where:"",geometry:null,geometryPrecision:null,groupByFieldsForStatistics:null,objectIds:null,returnGeometry:!1,returnDistinctValues:!1,
returnJSON:!1,maxAllowableOffset:null,multipatchOption:null,num:null,start:null,orderByFields:null,outSpatialReference:null,outFields:null,outStatistics:null,timeExtent:null,relationParam:null,pixelSize:null,distance:null,units:"meters",resultOffset:null,resultRecordCount:null,quantizationParameters:null,sqlFormat:null},toJSON:function(c){var a={text:this.text,where:this.where,returnGeometry:this.returnGeometry,spatialRel:f.toJSON(this.spatialRelationship),maxAllowableOffset:this.maxAllowableOffset,
geometryPrecision:this.geometryPrecision,returnZ:this.returnZ,returnM:this.returnM,sqlFormat:this.sqlFormat},b=c&&c.geometry||this.geometry,d=this.objectIds,g=this.outFields,e=this.outSpatialReference,h=this.groupByFieldsForStatistics,k=this.orderByFields,l=this.outStatistics;c=this.distance;if(b&&(a.geometry=b,a.geometryType=q.getJsonType(b),a.inSR=b.spatialReference.wkid||JSON.stringify(b.spatialReference.toJSON())),d&&(a.objectIds=d.join(",")),g&&(a.outFields=g.join(",")),this.returnDistinctValues&&
(a.returnDistinctValues=!0),h&&(a.groupByFieldsForStatistics=h.join(",")),k&&(a.orderByFields=k.join(",")),l){var m=[];r.forEach(l,function(a){m.push(a.toJSON())});a.outStatistics=JSON.stringify(m)}e?a.outSR=e.wkid||JSON.stringify(e.toJSON()):b&&(a.outSR=b.spatialReference.wkid||JSON.stringify(b.spatialReference.toJSON()));b=this.timeExtent;a.time=b?b.toJSON().join(","):null;b=this.relationParam;if(b&&a.spatialRel===f.toJSON("relation")&&(a.relationParam=b),c&&(a.distance=this.distance,a.units=t.toJSON(this.units)),
this.hasOwnProperty("start")&&(a.resultOffset=this.start,a.resultRecordCount=10,""===a.where&&(a.where="1\x3d1")),this.hasOwnProperty("num")&&(a.resultRecordCount=this.num),a.pixelSize=this.pixelSize?JSON.stringify(this.pixelSize.toJSON()):null,a.multipatchOption=this.multipatchOption,this.quantizationParameters)c=p.clone(this.quantizationParameters),c.originPosition&&(c.originPosition=u.toJSON(c.originPosition)),a.quantizationParameters=JSON.stringify(c);return a._ts=this._ts,a}})});