describe("Marker",function(){
  it("Can drop a new marker, and markers increase by 1",function(){
    var oldCount = marker.markers.length;
    var newCount = 0;
    marker.dropMarkerAndRadius(new mxn.LatLonPoint(0,0),1);
    newCount = marker.markers.length;

    expect(newCount).toEqual(oldCount+1);
  });

  it("Reindexes markers on delete",function(){
  
  });
});
