var rOutput = /\d+(\.\d{2,2})?/;

var metersFormatted = function(meters){
  return rOutput.exec(meters)[0];
};

var metersToFeet = function(meters){
  var feet = meters * 3.2808399;
  return rOutput.exec(feet)[0];;
};

var metersToMiles = function(meters){
  var feet = metersToFeet(meters);
  var miles = feet/5280;
  return rOutput.exec(miles)[0];
}

exports.metersToMiles = metersToMiles;
exports.metersToFeet = metersToFeet;
exports.metersFormatted = metersFormatted;
