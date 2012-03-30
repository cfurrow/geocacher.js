var initFormatter = function(dependencies){
  var exports = {};
  var metersToFeet = function(meters){
    var feet = meters * 3.2808399;
    return feet.toFixed(2);
  };

  var metersToMiles = function(meters){
    var feet = metersToFeet(meters);
    var miles = feet/5280;
    return miles.toFixed(2);
  };

  var outputMetersAndFeet = function(meters){
    var accuracyInFeet = metersToFeet(meters);
    var accuracyLabel = [];
    accuracyLabel.push(meters.toFixed(2));
    accuracyLabel.push("m / ");
    accuracyLabel.push(accuracyInFeet);
    accuracyLabel.push("ft");
    return accuracyLabel.join("");
  };

  var getDateTimeString = function(now){
    var nowHtml = [];
    nowHtml.push(now.getYear()+1900);
    nowHtml.push(".");
    nowHtml.push(now.getMonth()+1);
    nowHtml.push(".");
    nowHtml.push(now.getDate());
    nowHtml.push(" ");
    nowHtml.push(now.getHours());
    nowHtml.push(":");
    if(now.getMinutes() < 10){
      nowHtml.push("0"+now.getMinutes());
    }
    else{
      nowHtml.push(now.getMinutes());
    }
    nowHtml.push(":");
    if(now.getSeconds() < 10){
      nowHtml.push("0"+now.getSeconds());
    }
    else{
      nowHtml.push(now.getSeconds());
    }
    return nowHtml.join("");
  };

  exports.metersToMiles = metersToMiles;
  exports.metersToFeet = metersToFeet;
  exports.outputMetersAndFeet = outputMetersAndFeet;
  exports.getDateTimeString = getDateTimeString;
  return exports;
};
