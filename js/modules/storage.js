
var store = function(object){
  new Lawnchair(function(){
    this.save(object); 
  });
};

var remove = function(object){
};

var all = function(eachcallback){
  new Lawnchair(function(){
    this.keys(function(allKeys){
      var i=0;
      var len = allKeys.length;
      for(;i<len;i++){
        this.get(allKeys[i],function(point){
          eachcallback(point);
        }); 
      }
    });
  });
};

exports.store = store;
exports.remove = remove;
exports.all = all;
