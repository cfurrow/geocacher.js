var mapstraction = null;
var setup = function(){
  this.mapstraction = new mxn.Mapstraction('mapdiv','googlev3');
  this.mapstraction.addControls({
    pan:false,
    zoom:'small',
    overview:false,
    scale:false,
    map_type:false});
};

exports.mapstraction = mapstraction;
exports.setup = setup;
