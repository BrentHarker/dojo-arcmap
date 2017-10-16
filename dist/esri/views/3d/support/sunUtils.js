//>>built
define(["./mathUtils","../lib/glMatrix","../lib/SunCalc"],function(B,A,x){var n=A.vec3d,m=A.mat4d,M=B.lerp,Q=m.identity(),e={azimuth:0,altitude:0},N={local:{altitude:1500,ambientAtNight:.1,ambientAtNoon:.45,ambientAtTwilight:.2,diffuseAtNoon:.65,diffuseAtTwilight:.7},global:{altitude:8E5,ambient:.015,diffuse:.75},planarDirection:{localAltitude:1E4,globalAltitude:1E6,globalAngles:{azimuth:Math.PI/3,altitude:Math.PI/3}}},l={ambient:{color:n.create(),intensity:0},diffuse:{color:n.create(),intensity:0,
direction:n.create()}},C={settings:N,computeDirection:function(d,h,g,a){a||(a=n.create());var f=m.identity(Q);if("global"===g)x.getPosition(d,0,0,e),n.set3(0,0,-1,a),m.rotateX(f,-e.azimuth),m.rotateY(f,-e.altitude);else{var b=C.settings.planarDirection;g=b.globalAngles;b=(h.z-b.localAltitude)/(b.globalAltitude-b.localAltitude);b=B.clamp(b,0,1);1>b?(x.getPosition(d,h.y,h.x,e),e.azimuth=(1-b)*e.azimuth+b*g.azimuth,e.altitude=(1-b)*e.altitude+b*g.altitude):(e.azimuth=g.azimuth,e.altitude=g.altitude);
n.set3(0,-1,0,a);m.rotateZ(f,-e.azimuth);m.rotateX(f,-e.altitude)}m.multiplyVec3(f,a);return a},computeShadowsEnabled:function(d,h){return"global"===h?!0:d.z<C.settings.planarDirection.localAltitude},computeColorAndIntensity:function(e,h){var g=h.z,a=C.settings;n.set3(1,1,1,l.ambient.color);l.ambient.intensity=a.global.ambient;n.set3(1,1,1,l.diffuse.color);l.diffuse.intensity=a.global.diffuse;g=(g-a.local.altitude)/(a.global.altitude-a.local.altitude);g=B.clamp(g,0,1);l.globalFactor=g;h=x.getTimes(e,
h.y,h.x);if(1>g){var f,b,a=e.valueOf();h.polarException===x.POLAR_EXCEPTION.MIDNIGHT_SUN?(f=a-36E5*(e.getHours()+48)-6E4*e.getMinutes(),b=f+432E6):h.polarException===x.POLAR_EXCEPTION.POLAR_NIGHT?(f=a-2,b=a-1):(f=h.sunrise.valueOf(),b=h.sunset.valueOf());var c,r,p=b-f,t=f+p/2,q=p/4,m=t-q,q=t+q,u=.06*p,p=f-u/2;f+=u/2;var y=b-u/2;b+=u/2;var k=N.local,u=[.01,k.ambientAtNight],K=[.8,.8,1],L=[.01,.01,.01],D=[k.diffuseAtTwilight,k.ambientAtTwilight],E=[1,.75,.75],F=[.8,.8,1],G=[.9*k.diffuseAtNoon,k.ambientAtNoon],
H=[1,.98,.98],I=[.98,.98,1],A=[k.diffuseAtNoon,k.ambientAtNoon],O=[1,1,1],P=[1,1,1],k=[0,0],v=[0,0],w=[0,0],a=(p>a||a>b?(k=u,v=L,w=K,r="night"):f>a?(c=f-p,k=d(a-p,c,u,D),v=d(a-p,c,L,E),w=d(a-p,c,K,F),r="sun rising"):m>a?(c=m-f,k=d(a-f,c,D,G),v=d(a-f,c,E,H),w=d(a-f,c,F,I),r="early morning"):t>a?(c=t-m,k=d(a-m,c,G,A),v=d(a-m,c,H,O),w=d(a-m,c,I,P),r="late morning"):q>a?(c=q-t,k=d(a-t,c,A,G),v=d(a-t,c,O,H),w=d(a-t,c,P,I),r="early afternoon"):y>a?(c=y-q,k=d(a-q,c,G,D),v=d(a-q,c,H,E),w=d(a-q,c,I,F),r="late afternoon"):
b>a&&(c=b-y,k=d(a-y,c,D,u),v=d(a-y,c,E,L),w=d(a-y,c,F,K),r="sun setting"),{diffuse:{intensity:k[0],color:v},ambient:{intensity:k[1],color:w},timeOfDay:r});n.lerp(a.ambient.color,l.ambient.color,g,l.ambient.color);l.ambient.intensity=M(a.ambient.intensity,l.ambient.intensity,g);n.lerp(a.diffuse.color,l.diffuse.color,g,l.diffuse.color);l.diffuse.intensity=M(a.diffuse.intensity,l.diffuse.intensity,g)}var z,J;c=e.valueOf();h.polarException===x.POLAR_EXCEPTION.MIDNIGHT_SUN?(z=c-36E5*(e.getHours()+48)-
6E4*e.getMinutes(),J=z+432E6):h.polarException===x.POLAR_EXCEPTION.POLAR_NIGHT?(z=c-2,J=c-1):(z=h.sunrise.valueOf(),J=h.sunset.valueOf());e=1-B.clamp(Math.abs(c-(z+(J-z)/2))/432E5,0,1);return l.noonFactor=e,l}},d=function(d,e,g,a){for(var f=[],b=0;b<g.length;b++)f[b]=(a[b]-g[b])*d/e+g[b];return f};return C});