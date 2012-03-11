

var getLatLng = function(callback){
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(
      function(pos){
        callback.apply(self,[pos.coords.latitude,pos.coords.longitude,pos]);
      },
      function(){
        //error callback 
        console.log("Error getting current position");
      },
      {enableHighAccuracy:true}
    );
  }
};

exports.getLatLng = getLatLng;
