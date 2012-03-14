console.log("geocacher.js - init");

var getLatLng = require('navigator').getLatLng;
var conversion = require('conversion');
var dropMarkerAndRadius = require('marker').dropMarkerAndRadius;
var storage = require('storage');
var history = require('history');
var self = this;
var map, latlng, marker, accuracyInMeters;

// setupMap: Used as a callback from navigator.getLatLng
var setupMap = function(lat,lng,position){
  map = new mxn.Mapstraction('mapdiv','openlayers');
  map.addControls({
    pan:false,
    zoom:'small',
    overview:false,
    scale:false,
    map_type:false});

  latlng = new mxn.LatLonPoint(lat,lng);
  map.setCenterAndZoom(latlng,17);

  history.addMarkerCallback = function(pointInfo){
    dropMarkerAndRadius(map,latlng,pointInfo.accuracy); 
  };

  history.restoreFromStorage();
  updateLabels(latlng,position.coords.accuracy);
};

var updateMap = function(map,lat,lng,position){
  latlng = new mxn.LatLonPoint(lat,lng);
  accuracyInMeters = position.coords.accuracy;
  console.log("Lat: " + latlng.lat + " Lng: " + latlng.lng + " Accuracy (meters): "+accuracyInMeters);
  map.setCenterAndZoom(latlng,17);

  var accuracyInMiles = conversion.metersToMiles(accuracyInMeters);

  dropMarkerAndRadius(map,latlng,accuracyInMiles);
  updateLabels(latlng,accuracyInMeters);
};

var updateLabels = function(latlng,accuracyInMeters){
  var $labels = $("#labels");
  $labels.find("#lat>span").html(latlng.lat);
  $labels.find("#lng>span").html(latlng.lng);

  $labels.find("#accuracy>span").html(conversion.outputMetersAndFeet(accuracyInMeters));

};

var addPoint = function(){
  getLatLng(function(lat,lng,position){
    updateMap(map,lat,lng,position);
    storage.store({key:new Date().getTime(),lat:lat,lng:lng,position:position});
    history.add(new Date(),{lat:lat,lng:lng},accuracyInMeters);
  });
};

getLatLng(setupMap);
window.addPoint = addPoint;

