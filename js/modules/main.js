console.log("geocacher.js - init");

var getLatLng = require('navigator').getLatLng;
var formatter = require('formatter');
var storage = require('storage');
var history = require('history');
var mapstraction = require('mapstraction');
var marker = require('marker');
var animatedMarker = require("animated.marker");
var self = this;
var map, latlng, marker, accuracyInMeters;

// setupMap: Used as a callback from navigator.getLatLng
var setupMap = function(lat,lng,position){
  mapstraction.setup();
  map = mapstraction.mapstraction;

  latlng = new mxn.LatLonPoint(lat,lng);
  map.setCenterAndZoom(latlng,17);
  animatedMarker.dropMarker(latlng);
  animatedMarker.updatePositionContinuously();

  history.removeMarkerCallback = function(marker){
    map.removeMarker(marker); 
  };

  history.restoreFromStorage(function(pointInfo){
    var latlng = new mxn.LatLonPoint(pointInfo.lat, pointInfo.lng);
    marker.dropMarkerAndRadius(latlng,formatter.metersToMiles(pointInfo.accuracy)); 
  });

  updateLabels(latlng,position.coords.accuracy);
};

var updateMap = function(map,latlng,position){
  console.log("Lat: " + latlng.lat + " Lng: " + latlng.lng + " Accuracy (meters): "+accuracyInMeters);
  map.setCenter(latlng);

  var accuracyInMiles = formatter.metersToMiles(accuracyInMeters);
  accuracyInMeters = position.coords.accuracy;
  updateLabels(latlng,accuracyInMeters);
};

var updateLabels = function(latlng,accuracyInMeters){
  var $labels = $(".current-position");
  $labels.find("#lat").html(latlng.lat);
  $labels.find("#lng").html(latlng.lng);
  $labels.find("#accuracy").html(formatter.outputMetersAndFeet(accuracyInMeters));
};

var addPoint = function(eventObject){
  eventObject.preventDefault();
  getLatLng(function(lat,lng,position){
    var latlng = new mxn.LatLonPoint(lat,lng);
    var m = marker.dropMarkerAndRadius(latlng,formatter.metersToMiles(position.coords.accuracy));
    var date = new Date();
    storage.store({key:date.getTime(),lat:lat,lng:lng,position:position,markerid:m.id});
    history.add(date,{lat:lat,lng:lng},position.coords.accuracy);
    updateMap(map,latlng,position);
  });
};

$(".link-addpoint").click(addPoint);

getLatLng(setupMap);

