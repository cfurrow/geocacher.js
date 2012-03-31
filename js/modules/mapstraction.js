var initMapstraction = function(dependencies){
	var exports = {};
	var mapstraction = null;
  var isoffline = false;
	var setup = function(){
    if(!isoffline){
      this.mapstraction = new mxn.Mapstraction('mapdiv','openlayers');
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
	return exports;
};
