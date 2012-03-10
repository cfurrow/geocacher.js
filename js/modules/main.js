console.log("geocacher.js - init");

var getLatLng = require('navigator').getLatLng;
var metersToMiles = require('conversion').metersToMiles;
var self = this;
var map, latlng, marker, accuracyInMeters;


var setupMap = function(lat,lng,position){
  map = new mxn.Mapstraction('mapdiv','openlayers');
  latlng = new mxn.LatLonPoint(lat,lng);
  accuracyInMeters = position.coords.accuracy;
  console.log("Lat: " + latlng.lat + " Lng: " + latlng.lng + " Accuracy (meters): "+accuracyInMeters);
  map.setCenterAndZoom(latlng,15);

  var accuracyInMiles = metersToMiles(accuracyInMeters);

  dropMarkerAndRadius(map,latlng,accuracyInMiles);

};

var dropMarkerAndRadius = function(map,latlng,radius){
  marker = new mxn.Marker(latlng);
  map.addMarker(marker);

  var r = new mxn.Radius(latlng,20);

  var polyline = r.getPolyline(radius,"#000fff");
  polyline.setClosed(true);
  map.addPolyline(polyline);
};

getLatLng(setupMap);
