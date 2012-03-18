console.log("geocacher.js - init");

var getLatLng = require('navigator').getLatLng;
var formatter = require('formatter');
var dropMarkerAndRadius = require('marker').dropMarkerAndRadius;
var storage = require('storage');
var history = require('history');
require('jquery');
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
    dropMarkerAndRadius(map,latlng,formatter.metersToMiles(pointInfo.accuracy)); 
  };

  history.removeMarkerCallback = function(marker){
    map.removeMarker(marker); 
  };

  history.restoreFromStorage();
  updateLabels(latlng,position.coords.accuracy);
};

var updateMap = function(map,latlng,position){
  console.log("Lat: " + latlng.lat + " Lng: " + latlng.lng + " Accuracy (meters): "+accuracyInMeters);
  map.setCenterAndZoom(latlng,17);

  var accuracyInMiles = formatter.metersToMiles(accuracyInMeters);
  accuracyInMeters = position.coords.accuracy;
  updateLabels(latlng,accuracyInMeters);
};

var updateLabels = function(latlng,accuracyInMeters){
  var $labels = $("#labels");
  $labels.find("#lat>span").html(latlng.lat);
  $labels.find("#lng>span").html(latlng.lng);

  $labels.find("#accuracy>span").html(formatter.outputMetersAndFeet(accuracyInMeters));
};

var addPoint = function(eventObject){
  eventObject.preventDefault();
  getLatLng(function(lat,lng,position){
    var latlng = new mxn.LatLonPoint(lat,lng);
    var marker = dropMarkerAndRadius(map,latlng,formatter.metersToMiles(position.coords.accuracy));
    marker.map = null;
    marker.mapstraction = null;
    marker.proprietary_marker = null;
    storage.store({key:new Date().getTime(),lat:lat,lng:lng,position:position,marker:marker});
    history.add(new Date(),{lat:lat,lng:lng},position.coords.accuracy);
    updateMap(map,latlng,position);
  });
};
$(".link-addpoint").click(addPoint);

getLatLng(setupMap);

