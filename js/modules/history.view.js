var storage = require('storage');
var mapstraction = require('mapstraction');
var marker = require('marker');
var $historyContainer = $("#position-history");

var addNewHistoryRow = function(html){
  $(html).appendTo($historyContainer);
}

var deleteClick = function(eventObj){
  var $link = $(this);
  var key = $link.attr("data-key");
  $link.parents("tr#"+key).remove();
};

$("body").delegate(".point .link-delete","click",function(e){
  e.preventDefault();
  var key = $(this).attr("data-key");
  var self = this;
  var deleteCallback = function(context){
    deleteClick.call(context,e);
  }
  storage.get(key,function(point){
    if(point){
      console.log('Removing marker index: ' + point.markerid);
      marker.removeMarkerAndRadius(point.markerid);
      deleteCallback(self);
      storage.remove(key);
      storage.reindexMarkers();
      marker.reindexMarkers();
      console.log("Markers left: " + marker.markers.length);
      console.log("Map.Markers left: " + mapstraction.mapstraction.markers.length);
    }
    else{
      console.log("Point was null for key: " + key + ". Could not delete from storage.");
    }
  });
});

exports.addNewHistoryRow = addNewHistoryRow;
exports.addMarkerCallback = function(){};
exports.removeMarkerCallback = function(){};
