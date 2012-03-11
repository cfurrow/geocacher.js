console.log("geocacher.js - init");

var getLatLng = require('navigator').getLatLng;
var metersToMiles = require('conversion').metersToMiles;
var metersToFeet = require('conversion').metersToFeet;
var metersFormatted = require('conversion').metersFormatted;
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
  updateLabels(latlng,accuracyInMeters);
};

var updateLabels = function(latlng,accuracyInMeters){
  var accuracyInFeet = metersToFeet(accuracyInMeters);

  var accuracyLabel = [];
  accuracyLabel.push(metersFormatted(accuracyInMeters))
  accuracyLabel.push("m/");
  accuracyLabel.push(accuracyInFeet);
  accuracyLabel.push("ft");

  var $labels = $("#labels");
  $labels.find("#lat>span").html(latlng.lat);
  $labels.find("#lng>span").html(latlng.lng);
  $labels.find("#accuracy>span").html(accuracyLabel.join(""));

  addToHistory(latlng,accuracyLabel.join(""));
};
var addToHistory = function(latlng,accuracy){
  var now = new Date();
  var nowHtml = [];
  nowHtml.push(now.getYear()+1900);
  nowHtml.push(".");
  nowHtml.push(now.getMonth()+1);
  nowHtml.push(".");
  nowHtml.push(now.getDate());
  nowHtml.push(" ");
  nowHtml.push(now.getHours());
  nowHtml.push(":");
  if(now.getMinutes() < 10){
    nowHtml.push("0"+now.getMinutes());
  }
  else{
    nowHtml.push(now.getMinutes());
  }
  nowHtml.push(":");
  if(now.getSeconds() < 10){
    nowHtml.push("0"+now.getSeconds());
  }
  else{
    nowHtml.push(now.getSeconds());
  }

  var html = [];
  
  html.push("<tr>");

  html.push("  <td class='column column-time'>");
  html.push(nowHtml.join(""));
  html.push("  </td>");

  html.push("  <td class='column column-lat'>");
  html.push(latlng.lat);
  html.push("  </td>");

  html.push("  <td class='column column-lng'>");
  html.push(latlng.lng);
  html.push("  </td>");

  html.push("  <td class='column column-accuracy'>");
  html.push(accuracy);
  html.push("  </td>");

  html.push("</tr>");

  $(html.join("")).appendTo("#position-history");
}

var updatePosition = function(){
  getLatLng(function(lat,lng,position){
    updateMap(map,lat,lng,position);
  });
};


getLatLng(setupMap);
window.updatePosition = updatePosition;
