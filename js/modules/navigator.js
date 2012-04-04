var initNavigator = function(dependencies){
  var exports = {};
  var accuracySettings = {enableHighAccuracy:true,maximumAge:1000,timeout:1000};

  var getLatLng = function(callback,errorcallback){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(
        function(pos){
          callback(pos.coords.latitude,pos.coords.longitude,pos);
        },
        function(error){
          //error callback 
          console.log("Error getting current position");
          if(errorcallback){
            errorcallback(error);
          }
        },
        accuracySettings 
      );
    }
  };

  var setContinuiousUpdateCallback = function(callback,errorcallback){
    if(navigator && navigator.geolocation){
      return navigator.geolocation.watchPosition(callback,errorcallback,accuracySettings);
    }
    return null;
  };

  exports.getLatLng = getLatLng;
  exports.setContinuiousUpdateCallback = setContinuiousUpdateCallback;
  return exports;
};
