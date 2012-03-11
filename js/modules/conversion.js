var metersToFeet = function(meters){
  var feet = meters * 3.2808399;
  var rOutput = /\d+(\.\d{2,2})?/;
  return rOutput.exec(feet)[0];;
};

var metersToMiles = function(meters){
  var feet = metersToFeet(meters);
  var miles = feet/5280;
  return miles;
}

exports.metersToMiles = metersToMiles;
exports.metersToFeet = metersToFeet;
