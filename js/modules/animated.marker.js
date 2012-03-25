var mapstraction = require("mapstraction");
var getLatLng = require('navigator').getLatLng;
var animatedRadius = null;
var centerCircle = null;
var step = 0.001;
var currentStep = 0;
var maxStep = 0.01;
var timeoutHandle = null;
var timeBetweenStepMs = 50;
var centerCircleRadius = null;
var updateIntervalHandle = null;
var updateIntervalMs = 200;

var dropMarker = function(latlng){
  centerCircleRadius = new mxn.Radius(latlng,15);
  startAnimation();
};

var startAnimation = function(){
  timeoutHandle = setInterval(stepAnimation,timeBetweenStepMs);
};

var stepAnimation = function(){
  if(currentStep < maxStep){
    currentStep += step;
  }
  else{
    currentStep = 0;
  }
  mapstraction.mapstraction.removePolyline(centerCircle);
  centerCircle = centerCircleRadius.getPolyline(currentStep,"#1D5394");
  mapstraction.mapstraction.addPolyline(centerCircle);
};

var stopAnimation = function(){
  clearInterval(timeoutHandle);
};

var updatePosition = function(latlng){
  stopAnimation();
  centerCircleRadius = new mxn.Radius(latlng,15);
  startAnimation();
};

var updatePositionContinuously = function(){
  updateIntervalHandle = setInterval(updatePositionFromNavigator,updateIntervalMs);
};

var updatePositionFromNavigator = function(){
  getLatLng(function(lat,lng){
    updatePosition(new mxn.LatLonPoint(lat,lng));  
  });
};

var stopUpdatingPosition = function(){
  clearInterval(updateIntervalHandle);
};


exports.dropMarker = dropMarker;
exports.updatePositionContinuously = updatePositionContinuously;
exports.stopUpdatingPosition = stopUpdatingPosition;
