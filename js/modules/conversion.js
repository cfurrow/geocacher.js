var metersToFeet = function(meters){
  var feet = meters * 3.2808399;
  return feet;
};

var metersToMiles = function(meters){
  var feet = metersToFeet(meters);
  var miles = feet/5280;
  return miles;
}

exports.metersToMiles = metersToMiles;
exports.metersToFeet = metersToFeet;
