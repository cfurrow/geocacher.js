console.log("geocacher.js - init");

var getLatLng = require('navigator').getLatLng;
var self = this;
var map, latlng, marker;


var setupMap = function(lat,lng){
  map = new mxn.Mapstraction('mapdiv','openlayers');
  latlng = new mxn.LatLonPoint(lat,lng);
  map.setCenterAndZoom(latlng,15);
  marker = new mxn.Marker(latlng);
  map.addMarker(marker);
};

getLatLng(setupMap);
