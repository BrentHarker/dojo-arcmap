//>>built
define("require exports ../../../../geometry/Point ../../lib/glMatrix ../../support/projectionUtils ../../webgl-engine/lib/Util ./Graphics3DSymbolCommonCode ./graphicUtils".split(" "),function(d,l,E,F,G,H,v,I){Object.defineProperty(l,"__esModule",{value:!0});var J=H.VertexAttrConstants;d=F.vec3d;var n=new E,g=d.create(),b=d.create(),h=d.create(),q={verticalDistanceToGround:0,terrainElevation:0};l.perVertexElevationAligner=function(p,a,m,f){n.spatialReference=m.spatialReference;for(var w=p.getGeometryRecords(),
y=w.length,z="absolute-height"!==a.mode,A=0,r=0;y>r;r++){var c=w[r].geometry,k=w[r].getShaderTransformation();b[0]=k[12];b[1]=k[13];b[2]=k[14];c.invalidateBoundingInfo();for(var k=c.getData().getVertexAttr(),t=k[J.POSITION],c=t.data,k=k.mapPos.data,t=t.size,d=c.length/t,e=0,x=0,B=!1,C=0,D=0;d>D;D++){n.x=k[x++];n.y=k[x++];n.z=k[x++];h[0]=c[e];h[1]=c[e+1];h[2]=c[e+2];var u=v.computeElevation(m,n,a,z?q:null);z&&(C+=q.terrainElevation);g[0]=c[e]+b[0];g[1]=c[e+1]+b[1];g[2]=c[e+2]+b[2];f.setAltitude(u,
g,0);c[e]=g[0]-b[0];c[e+1]=g[1]-b[1];c[e+2]=g[2]-b[2];u=l.updateThresholdInMeters/f.unitInMeters;(Math.abs(h[0]-c[e])>=u||Math.abs(h[1]-c[e+1])>=u||Math.abs(h[2]-c[e+2])>=u)&&(B=!0);e+=t}A+=C/d;B&&p.geometryVertexAttrsUpdated(r)}return A/y};l.perObjectElevationAligner=function(p,a,m,f){var b=a.centerPointInElevationSR,d=0,h=0;if(p.metadata.usesVerticalDistanceToGround)d=v.computeElevation(m,b,a,q),I.updateVertexAttributeAuxpos1w(p,q.verticalDistanceToGround),h=q.terrainElevation;else{var n="absolute-height"!==
a.mode,d=v.computeElevation(m,b,a,n?q:null);n&&(h=q.terrainElevation)}a=p.getObjectTransformation();m=[a[12],a[13],a[14]];l.iterativeUpdatesEnabled?f.setAltitudeOfTransformation(d,a):(g[0]=b.x,g[1]=b.y,g[2]=d,G.computeLinearTransformation(b.spatialReference,g,a,f.spatialReference)&&p.setObjectTransformation(a));f=l.updateThresholdInMeters/f.unitInMeters;return(Math.abs(a[12]-m[0])>=f||Math.abs(a[13]-m[1])>=f||Math.abs(a[14]-m[2])>=f)&&p.setObjectTransformation(a),h};l.applyElevationAligner=function(b,
a,d,f){b=b(a.stageObject,a.elevationInfo,d,f);null!=b&&(a.alignedTerrainElevation=b)};l.updateThresholdInMeters=.01;l.iterativeUpdatesEnabled=!0});