var formatter = require('formatter');
var storage = require('storage');
var marker = require('marker');
require('jquery');

var $historyContainer = $("#position-history");

var setHistoryContainer = function(selector){
  $historyContainer = $(selector);
};

var add = function(datetime, latlng, accuracy){
  var nowHtml = formatter.getDateTimeString(datetime);

  var html = [];
  
  html.push("<tr class='point' id='");
  html.push(datetime.getTime());
  html.push("'>");

  html.push("  <td class='column column-time'>");
  html.push("    <a href='#' title='Delete this point' class='link-delete' data-key='");
  html.push(datetime.getTime());
  html.push("'>[x]</a>");
  html.push(nowHtml);
  html.push("  </td>");

  html.push("  <td class='column column-lat'>");
  html.push(latlng.lat.toFixed(6));
  html.push("  </td>");

  html.push("  <td class='column column-lng'>");
  html.push(latlng.lng.toFixed(6));
  html.push("  </td>");

  html.push("  <td class='column column-accuracy'>");
  html.push(formatter.outputMetersAndFeet(accuracy));
  html.push("  </td>");

  html.push("</tr>");

  $(html.join("")).appendTo($historyContainer);
};

var restoreFromStorage = function(){
  storage.all(function(point){
    if(point){
      add(new Date(point.key),{lat:point.lat,lng:point.lng},point.position.coords.accuracy); 
      // add marker to map
      if(exports.addMarkerCallback){
        exports.addMarkerCallback({lat:point.lat,lng:point.lng,accuracy:point.position.coords.accuracy});
      }
    }
  });
};

exports.setHistoryContainer = setHistoryContainer;
exports.add = add;
exports.restoreFromStorage = restoreFromStorage;
exports.addMarkerCallback = function(){};
exports.removeMarkerCallback = function(){};

var deleteClick = function(eventObj){
  eventObj.preventDefault();
  var $link = $(this);
  var key = $link.attr("data-key");
  storage.get(key,function(point){
    storage.remove(point.key);
    $link.parents("tr#"+point.key).remove();
    if(point.marker){
      exports.removeMarkerCallback(point.marker);
    }
  });
};
$("body").delegate(".point .link-delete","click",deleteClick);
