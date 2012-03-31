window.VERSION = 0.20;
console.log("geocacher.js - init v"+window.VERSION);

(function(){
  var nav = initNavigator();
  var getLatLng = nav.getLatLng;
  var formatter = initFormatter();
  var storage = initStorage(); 
  var mapstraction = initMapstraction();
  var marker = initMarker({mapstraction:mapstraction});
  var historyView = initHistoryView({storage:storage,mapstraction:mapstraction,marker:marker});
  var history = initHistory({marker:marker,storage:storage,formatter:formatter,historyView:historyView});
  var animatedMarker = initAnimatedMarker({mapstraction:mapstraction,navigator:nav,formatter:formatter});

  var self = this;
  var map, latlng, accuracyInMeters;

  // setupMap: Used as a callback from navigator.getLatLng
  var setupMap = function(lat,lng,position){
    if(!window.navigator.onLine){
      mapstraction.setOffline();
    }
    mapstraction.setup();
    map = mapstraction.mapstraction;

    latlng = new mxn.LatLonPoint(lat,lng);
    map.setCenterAndZoom(latlng,17);
    animatedMarker.dropMarker(latlng);
    animatedMarker.updatePositionContinuously(updateLabels);

    history.removeMarkerCallback = function(m){
      map.removeMarker(m); 
    };

    history.restoreFromStorage(function(pointInfo){
      var latlng = new mxn.LatLonPoint(pointInfo.lat, pointInfo.lng);
      marker.dropMarkerAndRadius(latlng,formatter.metersToMiles(pointInfo.accuracy)); 
    });

    updateLabels(latlng,position.coords.accuracy);
  };

  var updateMap = function(map,latlng,position){
    console.log("Lat: " + latlng.lat + " Lng: " + latlng.lng + " Accuracy (meters): "+accuracyInMeters);
    map.setCenter(latlng);

    var accuracyInMiles = formatter.metersToMiles(accuracyInMeters);
    accuracyInMeters = position.coords.accuracy;
    updateLabels(latlng,accuracyInMeters);
  };

  var updateLabels = function(latlng,accuracyInMeters){
    var $labels = $(".current-position");
    $labels.find("#lat").html(latlng.lat);
    $labels.find("#lng").html(latlng.lng);
    $labels.find("#accuracy").html(formatter.outputMetersAndFeet(accuracyInMeters));
  };

  var addPoint = function(eventObject){
    eventObject.preventDefault();
    nav.getLatLng(function(lat,lng,position){
      var latlng = new mxn.LatLonPoint(lat,lng);
      var m = marker.dropMarkerAndRadius(latlng,formatter.metersToMiles(position.coords.accuracy));
      var date = new Date();
      storage.store({key:date.getTime(),lat:lat,lng:lng,position:position,markerid:m.id});
      history.add(date,{lat:lat,lng:lng},position.coords.accuracy);
      updateMap(map,latlng,position);
    });
  };

  function unloaded()
  {
    animatedMarker.unload();
  }
	$(function(){
		$(".link-addpoint").click(addPoint);
		nav.getLatLng(setupMap);
		window.onunload = unloaded;
	});
})();
