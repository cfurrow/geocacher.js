
var metersToFeet = function(meters){
  var feet = meters * 3.2808399;
  return feet.toFixed(2);
};

var metersToMiles = function(meters){
  var feet = metersToFeet(meters);
  var miles = feet/5280;
  return miles.toFixed(2);
}

var outputMetersAndFeet = function(meters){
  var accuracyInFeet = metersToFeet(meters);
  var accuracyLabel = [];
  accuracyLabel.push(meters.toFixed(2));
  accuracyLabel.push("m / ");
  accuracyLabel.push(accuracyInFeet);
  accuracyLabel.push("ft");
  return accuracyLabel.join("");
};

exports.metersToMiles = metersToMiles;
exports.metersToFeet = metersToFeet;
exports.outputMetersAndFeet = outputMetersAndFeet;
