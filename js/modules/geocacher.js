
var getLagLng = function(){
  var lat = 0;
  var lng = 0;
  if(navigation.geolocation){
    navigator.geolocation.getCurrentPosition(function(pos){
      lat = pos.coords.latitude;
      lng = pos.coords.longitude;
    });
  }
  return {lat:lat,lng:lng};
};

var init = function(){
  console.log("geocacher.js - init");
  var latlng = getLatLng();

  console.log("Current Location: " + latlng.lat + ", " + latlng.lng);
};

exports.getLatLng = this.getLatLng;
init();
