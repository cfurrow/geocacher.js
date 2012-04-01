var initMarker  = function(dependencies){
  var exports = {};
  var map = dependencies.map;
  var markers = [];
  var id = 0;

  var dropMarkerAndRadius = function(lat,lng,radius,description){
    var m = map.addMarker(lat,lng);
    //map.updateMarkerIcon(m,"/img/markers/map2x.png");

    m.id = id++;
    markers.push({marker:m,description:description});

    return m;
  };

  var removeMarkerAndRadius = function(markerid){
    var m = markers[markerid];
    if(m){
      map.removeMarker(m.marker);
      map.removePolyline(m.polyline);
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

  exports.dropMarkerAndRadius = dropMarkerAndRadius;
  exports.removeMarkerAndRadius = removeMarkerAndRadius;
  exports.markers = markers;
  exports.reindexMarkers = reindexMarkers;
  return exports;
};
