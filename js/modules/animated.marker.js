var initAnimatedMarker = function(dependencies){
  var exports = {};

  var mapstraction            = dependencies.mapstraction;
  var getLatLng               = dependencies.navigator.getLatLng;
  var formatter               = dependencies.formatter;

  var centerCircle            = null;
  var centerCircleRadius      = null;

  var step                    = 0.001;
  var currentStep             = 0;
  var minStep                 = 0.001;
  var maxStep                 = 0.01;
  var animationIntervalHandle = null;
  var timeBetweenStepMs       = 50;
  var updateIntervalHandle    = null;
  var updateIntervalMs        = 5000;

  var dropMarker = function(latlng){
    centerCircleRadius = new mxn.Radius(latlng,15);
    startAnimation();
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
    mapstraction.mapstraction.removePolyline(centerCircle);
    centerCircle = centerCircleRadius.getPolyline(currentStep,"#1111ff");
    mapstraction.mapstraction.addPolyline(centerCircle);
  };

  var stopAnimation = function(){
    clearInterval(animationIntervalHandle);
  };

  var updatePosition = function(latlng,maxradius){
    stopAnimation();
    centerCircleRadius = new mxn.Radius(latlng,15);
    startAnimation();
    maxStep = maxradius
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
      }
      ,updateIntervalMs);
  };

  var updatePositionFromNavigator = function(callback){
    getLatLng(function(lat,lng,position){
      var latlng = new mxn.LatLonPoint(lat,lng);
      if(callback){
        callback(latlng,position.coords.accuracy);
      }
      updatePosition(
          latlng
          ,formatter.metersToMiles(position.coords.accuracy)
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

  return exports;
};
