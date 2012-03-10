
var getLatLng = function(callback){
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(pos){
      callback.apply(pos,[pos.coords.latitude,pos.coords.longitude]);
    });
  }
};

var init = function(){
  console.log("geocacher.js - init");
  getLatLng(outputLatLngToConsole);
};
var outputLatLngToConsole = function(lat,lng){
  console.log("Lat: " + lat);
  console.log("Lng: " + lng);
};

exports.getLatLng = this.getLatLng;
init();
