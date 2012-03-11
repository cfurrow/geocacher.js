
var metersFormatted = function(meters){
  return formatTwoDecimals(meters);
};

var metersToFeet = function(meters){
  var feet = meters * 3.2808399;
  return formatTwoDecimals(feet);
};

var metersToMiles = function(meters){
  var feet = metersToFeet(meters);
  var miles = feet/5280;
  return formatTwoDecimals(miles);
}

var formatTwoDecimals = function(num){
  return formatDecimals(num,2);
};

var formatDecimals = function(num,dec){
  var rDecimals = new RegExp("\\d+(\\.\\d{"+dec+","+dec+"})?");
  return rDecimals.exec(num)[0];
};

exports.metersToMiles = metersToMiles;
exports.metersToFeet = metersToFeet;
exports.metersFormatted = metersFormatted;
exports.formatTwoDecimals = formatTwoDecimals;
exports.formatDecimals = formatDecimals;
