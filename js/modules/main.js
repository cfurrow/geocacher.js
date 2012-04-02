window.VERSION = 0.29;
console.log("geocacher.js - init v"+window.VERSION);

(function(){
  var nav = initNavigator();
  var getLatLng = nav.getLatLng;
  var formatter = initFormatter();
  var storage = initStorage(); 
  var map = initMap();
  var marker = initMarker({map:map});
  var historyView = initHistoryView({storage:storage,map:map,marker:marker});
  var history = initHistory({marker:marker,storage:storage,formatter:formatter,historyView:historyView});

  var self = this;
  var latlng, accuracyInMeters;

  // setup: Used as a callback from navigator.getLatLng
  var setup = function(lat,lng,position){
    if(!window.navigator.onLine){
      map.setOffline();
    }
    map.setup(lat,lng);

    nav.setContinuiousUpdateCallback(
      // Success
      function(position){
        map.updatePosition(position);
        updateLabels(position);
      },
      // Error
      function(){});

    map.setCenterAndZoom(lat,lng,map.maxZoom);

    history.removeMarkerCallback = function(m){
      map.removeMarker(m); 
    };

    history.restoreFromStorage(function(pointInfo){
      marker.dropMarkerAndRadius(lat,lng,formatter.metersToMiles(pointInfo.accuracy),pointInfo.description); 
    });

    updateLabels(position);
  };

  var updateLabels = function(position){
    var $labels = $(".current-position");
    $labels.find("#lat").html(position.coords.latitude.toFixed(5));
    $labels.find("#lng").html(position.coords.longitude.toFixed(5));
    $labels.find("#accuracy").html(formatter.metersToFeet(position.coords.accuracy)+"ft");
  };

  var addPoint = function(eventObject){
    eventObject.preventDefault();
    nav.getLatLng(function(lat,lng,position){
      var m = marker.dropMarkerAndRadius(lat,lng,formatter.metersToMiles(position.coords.accuracy));
      var date = new Date();
      storage.store({key:date.getTime(),lat:lat,lng:lng,position:position,markerid:m.id});
      history.add(date,{lat:lat,lng:lng},position.coords.accuracy);
      map.setCenter(position.coords.latitude,position.coords.longitude);
    });
  };

  var whereAmI = function(eventObject){
    eventObject.preventDefault();
    nav.getLatLng(function(lat,lng,position){
      map.setCenter(position.coords.latitude,position.coords.longitude);
      updateLabels(position);
    });
  };

  $(function(){
    $(".link-addpoint").click(addPoint);
    $(".link-whereami").click(whereAmI);

    nav.getLatLng(
      // Success
      function(lat,lng,position){
        setup(lat,lng,position);
        $(".no-location").hide();
        $(".has-location").show();
      },
      // Error
      function(error){
        console.log(error); 
        $(".no-location").show();
        $(".has-location").hide();
    });

  });
})();
