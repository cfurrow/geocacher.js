var initNavigator = function(dependencies){
	var exports = {};
	var getLatLng = function(callback){
		if(navigator.geolocation){
			navigator.geolocation.getCurrentPosition(
				function(pos){
					callback(pos.coords.latitude,pos.coords.longitude,pos);
				},
				function(){
					//error callback 
					console.log("Error getting current position");
				},
				{enableHighAccuracy:true}
			);
		}
	};

	exports.getLatLng = getLatLng;
	return exports;
};
