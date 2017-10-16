//>>built
define("require exports ../../../../core/tsSupport/declareExtendsHelper ../../../../core/tsSupport/decorateHelper ../../../../core/accessorSupport/decorators ../../../../core/Accessor ../../viewpointUtils ../../../navigation/Momentum ../../../3d/lib/glMatrix".split(" "),function(d,q,l,h,g,m,k,n,p){d=function(d){function f(c){var a=d.call(this)||this;return a.animationTime=0,a.momentumEstimator=new n.ScreenspaceMomentumEstimator(.05,600,6,.92),a.momentum=null,a.momentumVelocityX=0,a.momentumVelocityY=
0,a.momentumFinished=!1,a.viewpoint=k.create(),a.watch("momentumFinished",function(b){b&&a.navigation.stop()}),a}return l(f,d),f.prototype.begin=function(c,a){this.navigation.begin();this.momentumEstimator.reset();this.addToEstimator(a)},f.prototype.update=function(c,a){this.addToEstimator(a);var b=a.pointers[0];a=b.currentEvent.x;var e=b.currentEvent.y;a=(b=b.previousEvent)?b.x-a:-a;e=b?e-b.y:e;c.viewpoint=k.translateBy(this.viewpoint,c.viewpoint,[a||0,e||0])},f.prototype.end=function(c,a){this.addToEstimator(a);
this.momentum=this.momentumEstimator.evaluateMomentum();this.animationTime=0;this.momentum&&(this.momentumVelocityX=(this.momentum.dataNewest[0]-this.momentum.dataOldest[0])/this.momentum.dataTimeDelta,this.momentumVelocityY=(this.momentum.dataNewest[1]-this.momentum.dataOldest[1])/this.momentum.dataTimeDelta,this.onAnimationUpdate(c));this.navigation.end()},f.prototype.addToEstimator=function(c){var a=c.pointers[0],b=a.currentEvent.x,a=a.currentEvent.y;this.momentumEstimator.add(b,a,p.vec3.createFrom(b,
a,0),.001*c.currentState.timestamp)},f.prototype.onAnimationUpdate=function(c){var a=this;this.navigation.animationManager.animateContinous(c.viewpoint,function(b,e){a.momentumFinished=!a.momentum||a.momentum.isFinished(a.animationTime);e*=.001;if(a.notifyChange("momentumFinished"),!a.momentumFinished){var d=a.momentum.velocityFactor(a.animationTime);c.viewpoint=k.translateBy(b,b,[-(d*a.momentumVelocityX*e),d*a.momentumVelocityY*e])}a.animationTime+=e})},f.prototype.stopMomentumNavigation=function(){this.momentum&&
(this.momentumEstimator.reset(),this.momentum=null,this.navigation.stop())},f}(g.declared(m));return h([g.property()],d.prototype,"viewpoint",void 0),h([g.property()],d.prototype,"navigation",void 0),d=h([g.subclass("esri.views.2d.navigation.actions.Pan")],d)});