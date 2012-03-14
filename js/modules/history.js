var conversion = require('conversion');
var storage = require('storage');
var marker = require('marker');
var $historyContainer = $("#position-history");

var setHistoryContainer = function(selector){
  $historyContainer = $(selector);
};

var add = function(datetime, latlng,accuracy){
  var nowHtml = getDateTimeString(datetime);

  var html = [];
  
  html.push("<tr>");

  html.push("  <td class='column column-time'>");
  html.push("<a class='delete' href='javascript:deleteHistory();'>[x]</a>");
  html.push(nowHtml);
  html.push("  </td>");

  html.push("  <td class='column column-lat'>");
  html.push(conversion.formatDecimals(latlng.lat,4));
  html.push("  </td>");

  html.push("  <td class='column column-lng'>");
  html.push(conversion.formatDecimals(latlng.lng,4));
  html.push("  </td>");

  html.push("  <td class='column column-accuracy'>");
  html.push(conversion.outputMetersAndFeet(accuracy));
  html.push("  </td>");

  html.push("</tr>");

  $(html.join("")).appendTo($historyContainer);
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

var deleteHistory = function(){
  console.log(this);
};

var restoreFromStorage = function(){
  storage.all(function(point){
    add(new Date(point.key),{lat:point.lat,lng:point.lng},point.position.coords.accuracy); 
    // add marker to map
    if(exports.addMarkerCallback){
      exports.addMarkerCallback({lat:point.lat,lng:point.lng,accuracy:point.position.coords.accuracy});
    }
  });
};

exports.setHistoryContainer = setHistoryContainer;
exports.add = add;
exports.restoreFromStorage = restoreFromStorage;
exports.addMarkerCallback = null;
window.deleteHistory = deleteHistory;
