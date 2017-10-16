//>>built
define(["require","exports"],function(d,e){return function(){function c(a){if(this._cache={},this._lruQueue=[],0>=a)throw Error("LRU cache size must be bigger than zero!");this._maxSize=a}return c.prototype.has=function(a){return void 0!==this._cache[a]},c.prototype.insert=function(a,b){return null!==this.use(a)?void(this._cache[a]=b):(this._collect(),this._cache[a]=b,void this._lruQueue.unshift(a))},c.prototype.use=function(a){var b=this._cache[a];return b?(this._lruQueue.splice(this._lruQueue.indexOf(a),
1),this._lruQueue.unshift(a),b):null},c.prototype.print=function(){for(var a=0,b=this._lruQueue;a<b.length;a++);},c.prototype._collect=function(){if(!(this._lruQueue.length<this._maxSize)){var a=this._lruQueue.pop(),b=this._cache[a];b&&b.release&&b.release();delete this._cache[a]}},c}()});