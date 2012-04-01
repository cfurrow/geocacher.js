var initAnimatedMarker = function(dependencies){
  var exports = {};

  var mapstraction            = dependencies.mapstraction;
  var getLatLng               = dependencies.navigator.getLatLng;
  var formatter               = dependencies.formatter;

  var centerCircle            = null;
  var centerCircleRadius      = null;
  var currentMarker           = new mxn.Marker();
  var currentMarkerOffset     = [32,64];
  var currentLatLng = null;

  var step                    = 0.001;
  var currentStep             = 0;
  var minStep                 = 0.001;
  var maxStep                 = 0.01;
  var animationIntervalHandle = null;
  var timeBetweenStepMs       = 250;
  var invertMarker            = false;
  var updateIntervalHandle    = null;
  var updateIntervalMs        = 1000;

  var dropMarker = function(latlng){
    currentLatLng = latlng;
    setCurrentPositionMarkerLocation(latlng);

    currentMarker.setLabel("Current location");
    currentMarker.setInfoBubble("You're right about here.");
    mapstraction.mapstraction.addMarker(currentMarker);

    try{
      currentMarker.proprietary_marker.setAnimation(google.maps.Animation.BOUNCE);
    }
    catch(e){}

    centerCircleRadius = new mxn.Radius(latlng,mapstraction.circleQuality);
    startAnimation();
  };
  var setCurrentPositionMarkerLocation = function(latlng){
    currentMarker.location = latlng;
    currentMarker.setIcon("/img/markers/footprint2x.png",[64,74],currentMarkerOffset);
  };
  var setCurrentPositionMarkerLocationInverted = function(latlng){
    currentMarker.location = latlng;
    currentMarker.setIcon("/img/markers/footprint2x_inverse.png",[64,74],currentMarkerOffset);
  };

  var startAnimation = function(){
    animationIntervalHandle = setInterval(stepAnimation,timeBetweenStepMs);
  };

  var stepAnimation = function(){
    if(currentStep < maxStep){
      currentStep += step;
    }
    else{
      currentStep = minStep;
    }
  };

  var stopAnimation = function(){
    clearInterval(animationIntervalHandle);
  };

  var updatePosition = function(latlng,maxradius){
    currentLatLng = latlng;
    stopAnimation();
    centerCircleRadius = new mxn.Radius(latlng,mapstraction.circleQuality);

    try{
      currentMarker.proprietary_marker.setPosition(new google.maps.LatLng(latlng.lat,latlng.lon));
    }
    catch(e){}

    currentMarker.update();

    startAnimation();
    maxStep = maxradius;
    if(maxStep <= 0.01){
      step = 0.001;
    }
    else if(maxStep <= 0.1){
      step = 0.002;
    }
    else if(maxStep <= 1){
      step = 0.003;
    }
    else{
      step = 0.004;
    }
  };

  var updatePositionContinuously = function(callback){
    updateIntervalHandle = setInterval(
      function(){
        updatePositionFromNavigator(callback);
      },updateIntervalMs);
  };

  var updatePositionFromNavigator = function(callback){
    getLatLng(function(lat,lng,position){
      var latlng = new mxn.LatLonPoint(lat,lng);
      if(callback){
        callback(latlng,position.coords.accuracy);
      }
      updatePosition(
          latlng,
          formatter.metersToMiles(position.coords.accuracy)
      );  
    });
  };

  var stopUpdatingPosition = function(){
    clearInterval(updateIntervalHandle);
  };

  var unload = function(){
    stopUpdatingPosition();
    stopAnimation();
  };

  exports.dropMarker = dropMarker;
  exports.updatePositionContinuously = updatePositionContinuously;
  exports.stopUpdatingPosition = stopUpdatingPosition;
  exports.unload = unload;
  exports.currentMarkerOffset = currentMarkerOffset;

  return exports;
};
