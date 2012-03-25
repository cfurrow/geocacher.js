var mapstraction = require("mapstraction");
var getLatLng = require('navigator').getLatLng;
var formatter = require('formatter');

var centerCircle = null;
var centerCircleRadius = null;

var step = 0.001;
var currentStep = 0;
var minStep = 0.001;
var maxStep = 0.01;
var animationIntervalHandle = null;
var timeBetweenStepMs = 50;
var updateIntervalHandle = null;
var updateIntervalMs = 200;

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
    step = 0.003;
  }
  else if(maxStep <= 1){
    step = 0.005;
  }
  else{
    step = 0.008;
  }
};

var updatePositionContinuously = function(){
  updateIntervalHandle = setInterval(updatePositionFromNavigator,updateIntervalMs);
};

var updatePositionFromNavigator = function(){
  getLatLng(function(lat,lng,position){
    updatePosition(
        new mxn.LatLonPoint(lat,lng)
        ,formatter.metersToMiles(position.coords.accuracy)
    );  
  });
};

var stopUpdatingPosition = function(){
  clearInterval(updateIntervalHandle);
};


exports.dropMarker = dropMarker;
exports.updatePositionContinuously = updatePositionContinuously;
exports.stopUpdatingPosition = stopUpdatingPosition;
