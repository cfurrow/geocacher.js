var initMapstraction = function(dependencies){
	var exports = {};
	var mapstraction = null;
  var isoffline = false;
  var maxZoom = 21;
  var circleQuality = 10;
	var setup = function(){
    if(!isoffline){
      this.mapstraction = new mxn.Mapstraction('mapdiv','googlev3');
      this.mapstraction.addControls({
        pan:false,
        zoom:'small',
        overview:false,
        scale:false,
        map_type:false});
    }
  };

  var setOffline = function(){
    this.isoffline=true;
    this.mapstraction = {
      setCenterAndZoom:function(){},
      removeMarker:function(){},
      setCenter:function(){},
      addMarker: function(){},
      removePolyline: function(){}
    };
  };

  exports.setOffline = setOffline;
	exports.mapstraction = mapstraction;
	exports.setup = setup;
  exports.maxZoom = maxZoom;
  exports.circleQuality = circleQuality;
	return exports;
};
