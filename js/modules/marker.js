var dropMarkerAndRadius = function(map,latlng,radius){
  var marker = new mxn.Marker(latlng);
  map.addMarker(marker);

  var r = new mxn.Radius(latlng,15);

  var polyline = r.getPolyline(radius,"#000fff");
  polyline.setClosed(true);
  map.addPolyline(polyline);

  return marker;
};

exports.dropMarkerAndRadius = dropMarkerAndRadius;
