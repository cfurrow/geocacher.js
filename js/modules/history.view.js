var storage = require('storage');
var mapstraction = require('mapstraction').mapstraction;
var $historyContainer = $("#position-history");

var addNewHistoryRow = function(html){
  $(html).appendTo($historyContainer);
}

var deleteClick = function(eventObj){
  eventObj.preventDefault();
  var $link = $(this);
  var key = $link.attr("data-key");

  storage.get(key,function(point){
    storage.remove(point.key);
    $link.parents("tr#"+point.key).remove();
    if(point.marker){
      mapstraction.removeMarker(point.marker);
    }
  });
};
$("body").delegate(".point .link-delete","click",deleteClick);

exports.addNewHistoryRow = addNewHistoryRow;
exports.addMarkerCallback = function(){};
exports.removeMarkerCallback = function(){};
