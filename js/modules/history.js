var initHistory = function(dependencies){
  var exports = {};
  var formatter = dependencies.formatter;
  var storage = dependencies.storage;
  var marker = dependencies.marker;
  var historyView = dependencies.historyView;

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
		html.push("  <a href='#' title='View this point' class='link-view' data-key='");
    html.push(   datetime.getTime());
    html.push("'>View</a>");
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
    historyView.addNewHistoryRow(html.join(""));
  };

  var restoreFromStorage = function(callback){
    storage.all(function(point){
      if(point){
        add(new Date(point.key),{lat:point.lat,lng:point.lng},point.position.coords.accuracy); 
        // add marker to map
        if(callback){
          callback({lat:point.lat,lng:point.lng,accuracy:point.position.coords.accuracy});
        }
      }
    });
  };

  exports.setHistoryContainer = setHistoryContainer;
  exports.add = add;
  exports.restoreFromStorage = restoreFromStorage;

  return exports;
}
