var storage = require('storage');
var mapstraction = require('mapstraction');
var marker = require('marker');
var markers = marker.markers; 
var $historyContainer = $("#position-history");

var addNewHistoryRow = function(html){
  $(html).appendTo($historyContainer);
}

var deleteClick = function(eventObj){
  eventObj.preventDefault();
  var $link = $(this);
  var key = $link.attr("data-key");
  $link.parents("tr#"+key).remove();
  return key;
};

$("body").delegate(".point .link-delete","click",function(e){
  var key = deleteClick.call(this,e);
  storage.get(key,function(point){
    storage.remove(point.key);
    marker.removeMarkerAndRadius(point.marker);
  });
});

exports.addNewHistoryRow = addNewHistoryRow;
exports.addMarkerCallback = function(){};
exports.removeMarkerCallback = function(){};
