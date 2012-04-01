var initMap = function(dependencies){
  var exports = {};
  var map = null;
  var isoffline = false;
  var maxZoom = 21;
  var circleQuality = 10;
  var position = null;
  var positionMarker = null;

  var setup = function(lat,lng){
    var options = {};
    if(!isoffline){
      options = {
        center:new google.maps.LatLng(lat,lng),
        disableDefaultUI:true,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        scrollwheel:false,
        zoom:21,
        zoomControl:true,
        zoomControlOptions:{
          position:google.maps.ControlPosition.TOP_LEFT,
          style:google.maps.ZoomControlStyle.SMALL
        }
      };
    }
    position = {
      coords: {
        latitude:lat,
        longitude:lng,
        accuracy:0
      } 
    };
    map = new google.maps.Map(document.getElementById('mapdiv'),options);
  };

  var setOffline = function(){
    isoffline=true;
    map = {
      setCenterAndZoom:function(){},
      removeMarker:function(){},
      setCenter:function(){},
      addMarker: function(){},
      removePolyline: function(){}
    };
  };

  var addMarker = function(lat,lng){
    var latlng = new google.maps.LatLng(lat,lng);
    var options = {
      position:latlng,
      map:map
    };
    var marker = new google.maps.Marker(options);
    marker.setZIndex(1);
    return marker;
  };

  var addBouncingMarker = function(lat,lng){
    var marker = addMarker(lat,lng);
    marker.setAnimation(google.maps.Animation.BOUNCE);
    return marker;
  };

  var updateMarkerPosition = function(marker, lat, lng){
    marker.setPosition(new google.maps.LatLng(lat,lng));
  };

  var updateMarkerIcon = function(marker,iconurl){
    marker.setIcon(iconurl); //,[64,74],currentMarkerOffset);
  };

  var setCenter = function(lat,lng){
    map.setCenter(new google.maps.LatLng(lat,lng));
  };

  var setCenterAndZoom = function(lat,lng,zoom){
    this.setCenter(lat,lng);
    map.setZoom(zoom);
  };

  var updatePosition = function(pos){
    this.position = position;
    this.setCenter(pos.coords.latitude,pos.coords.longitude);
    // todo: drop marker
    if(!this.positionMarker){
      this.positionMarker = this.addBouncingMarker(pos.coords.latitude, pos.coords.longitude);
      this.positionMarker.setZIndex(100);
    }
    this.updateMarkerPosition(this.positionMarker,pos.coords.latitude, pos.coords.longitude);
  };

  exports.position = position;
  exports.setOffline = setOffline;
  exports.map = map;
  exports.setup = setup;
  exports.maxZoom = maxZoom;
  exports.circleQuality = circleQuality;

  exports.addMarker = addMarker;
  exports.addBouncingMarker = addBouncingMarker;
  exports.updateMarkerPosition = updateMarkerPosition;
  exports.setCenter = setCenter;
  exports.setCenterAndZoom = setCenterAndZoom;
  exports.updateMarkerIcon = updateMarkerIcon;
  exports.updatePosition = updatePosition;

  return exports;
};
