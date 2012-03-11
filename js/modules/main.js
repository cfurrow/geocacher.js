console.log("geocacher.js - init");

var getLatLng = require('navigator').getLatLng;
var metersToMiles = require('conversion').metersToMiles;
var metersToFeet = require('conversion').metersToFeet;
var dropMarkerAndRadius = require('marker').dropMarkerAndRadius;
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

  updateMap(map,lat,lng,position);
};

var updateMap = function(map,lat,lng,position){
  latlng = new mxn.LatLonPoint(lat,lng);
  accuracyInMeters = position.coords.accuracy;
  console.log("Lat: " + latlng.lat + " Lng: " + latlng.lng + " Accuracy (meters): "+accuracyInMeters);
  map.setCenterAndZoom(latlng,15);

  var accuracyInMiles = metersToMiles(accuracyInMeters);

  dropMarkerAndRadius(map,latlng,accuracyInMiles);
  updateLabels(latlng,position.coords.accuracy);
};

var updateLabels = function(latlng,accuracyInMeters){
  var accuracyInFeet = metersToFeet(accuracyInMeters);

  var accuracyLabel = [];
  accuracyLabel.push(accuracyInMeters);
  accuracyLabel.push("m/");
  accuracyLabel.push(accuracyInFeet);
  accuracyLabel.push("ft");

  var $labels = $("#labels");
  $labels.find("#lat>span").html(latlng.lat);
  $labels.find("#lng>span").html(latlng.lng);
  $labels.find("#accuracy>span").html(accuracyLabel.join(""));
};


getLatLng(setupMap);
