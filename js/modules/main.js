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

  history.restoreFromStorage();
  updateLabels(latlng,position.coords.accuracy);
};

var updateMap = function(map,lat,lng,position){
  latlng = new mxn.LatLonPoint(lat,lng);
  accuracyInMeters = position.coords.accuracy;
  console.log("Lat: " + latlng.lat + " Lng: " + latlng.lng + " Accuracy (meters): "+accuracyInMeters);
  map.setCenterAndZoom(latlng,17);

  var accuracyInMiles = formatter.metersToMiles(accuracyInMeters);

  dropMarkerAndRadius(map,latlng,accuracyInMiles);
  updateLabels(latlng,accuracyInMeters);
};

var updateLabels = function(latlng,accuracyInMeters){
  var $labels = $("#labels");
  $labels.find("#lat>span").html(latlng.lat);
  $labels.find("#lng>span").html(latlng.lng);

  $labels.find("#accuracy>span").html(formatter.outputMetersAndFeet(accuracyInMeters));
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
  html.push(latlng.lat.toFixed(4));
  html.push("  </td>");

  html.push("  <td class='column column-lng'>");
  html.push(latlng.lng.toFixed(4));
  html.push("  </td>");

  html.push("  <td class='column column-accuracy'>");
  html.push(accuracy);
  html.push("  </td>");

  html.push("</tr>");

  $(html.join("")).appendTo("#position-history");
}

var addPoint = function(eventObject){
  eventObject.preventDefault();
  getLatLng(function(lat,lng,position){
    updateMap(map,lat,lng,position);
    storage.store({key:new Date().getTime(),lat:lat,lng:lng,position:position});
    history.add(new Date(),{lat:lat,lng:lng},accuracyInMeters);
  });
};
$(".link-addpoint").click(addPoint);

getLatLng(setupMap);

