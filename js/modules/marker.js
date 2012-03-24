var mapstraction = require('mapstraction');
var markers = [];

var dropMarkerAndRadius = function(latlng,radius){
  var marker = new mxn.Marker(latlng);
  mapstraction.mapstraction.addMarker(marker);

  var r = new mxn.Radius(latlng,15);

  var polyline = r.getPolyline(radius,"#000fff");
  polyline.setClosed(true);
  mapstraction.mapstraction.addPolyline(polyline);

  markers.push({marker:marker,polyline:polyline});

  return marker;
};

var removeMarkerAndRadius = function(marker){
  mapstraction.mapstraction.remove(marker);
};

exports.dropMarkerAndRadius = dropMarkerAndRadius;
exports.markers = markers;
