describe("history",function(){
  it("Restoring from localstorage, when empty, returns 0.",function(){
    var count = 0;
    var callback = function(info){
      count++;
    };
    history.restoreFromStorage(callback);

    expect(count).toBe(0);
  });
});
