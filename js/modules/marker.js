var mapstraction = require('mapstraction');
var markers = [];
var id = 0;

var dropMarkerAndRadius = function(latlng,radius){
  var marker = new mxn.Marker(latlng);
  mapstraction.mapstraction.addMarker(marker);

  var r = new mxn.Radius(latlng,15);

  var polyline = r.getPolyline(radius,"#000fff");
  polyline.setClosed(true);
  mapstraction.mapstraction.addPolyline(polyline);

  console.log("Adding marker at index: " + id);
  marker.id = id++;
  markers.push({marker:marker,polyline:polyline});
  console.log("New markers count: " + markers.length);

  return marker;
};

var removeMarkerAndRadius = function(markerid){
  var m = markers[markerid];
  if(m){
    mapstraction.mapstraction.removeMarker(m.marker);
    mapstraction.mapstraction.removePolyline(m.polyline);
    markers = removeMarker(markerid);
  }
  else{
    console.log("Marker was null, did not remove marker or polyline.");
  }
};

var removeMarker = function(index){
  markers.splice(index,1);
  return markers;
};

var reindexMarkers = function(){
  console.log("marker.reindexMarkers() markers.length: " + markers.length);
  var newArray = [];
  var i=0;
  var len = markers.length;
  for(;i<len;i++){
    newArray.push(markers[i]);
  }
  markers = newArray;
};

exports.removeMarkerAndRadius = removeMarkerAndRadius;
exports.dropMarkerAndRadius = dropMarkerAndRadius;
exports.markers = markers;
exports.reindexMarkers = reindexMarkers;
