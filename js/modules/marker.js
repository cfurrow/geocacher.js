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

  marker.id = id;
  markers.push({marker:marker,polyline:polyline});

  id++;
  return marker;
};

var removeMarkerAndRadius = function(marker){
  var matchingmarkers = _.filter(markers,function(m){
    return m.marker.id === marker.id;
  });
  _.each(matchingmarkers,function(m){
    mapstraction.mapstraction.removeMarker(m.marker);
    mapstraction.mapstraction.removePolyline(m.polyline);
  });
};

exports.removeMarkerAndRadius = removeMarkerAndRadius;
exports.dropMarkerAndRadius = dropMarkerAndRadius;
exports.markers = markers;
