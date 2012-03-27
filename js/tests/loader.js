var nav = initNavigator();
var getLatLng = nav.getLatLng;
var formatter = initFormatter();
var storage = initStorage(); 
var marker = initMarker({mapstraction:mapstraction});
var historyView = initHistoryView({storage:storage,mapstraction:mapstraction,marker:marker});
var history = initHistory({marker:marker,storage:storage,formatter:formatter,historyView:historyView});
var animatedMarker = initAnimatedMarker({mapstraction:mapstraction,navigator:nav,formatter:formatter});
