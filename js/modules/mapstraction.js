var initMapstraction = function(dependencies){
	var exports = {};
	var mapstraction = null;
	var setup = function(){
		this.mapstraction = new mxn.Mapstraction('mapdiv','openlayers');
		this.mapstraction.addControls({
			pan:false,
			zoom:'small',
			overview:false,
			scale:false,
			map_type:false});
	};

	exports.mapstraction = mapstraction;
	exports.setup = setup;
	return exports;
};
