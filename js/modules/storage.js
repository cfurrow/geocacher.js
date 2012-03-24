
var store = function(object){
  new Lawnchair(function(){
    this.save(object); 
  });
};

var get = function(key,callback){
  new Lawnchair(function(){
    this.get(key,callback);
  });
};

var remove = function(key){
  new Lawnchair(function(){
    this.remove(key);
  });
};

var all = function(eachcallback){
  new Lawnchair(function(){
    this.keys(function(allKeys){
      var i=0;
      var len = allKeys.length;
      for(;i<len;i++){
        this.get(allKeys[i],function(point){
          if(point){
            eachcallback(point);
          }
        }); 
      }
    });
  });
};

var reindexMarkers = function(){
  var index=0;
  all(function(point){
    point.markerid=index++; 
    store(point); // does this update?
  });
};

exports.store = store;
exports.remove = remove;
exports.all = all;
exports.get = get;
exports.reindexMarkers = reindexMarkers;
