describe("history",function(){
  it("Restoring from localstorage calls callback",function(){
    var spy = sinon.spy();
    history.restoreFromStorage(spy);

    expect(spy.called).toBeTruthy();
  });

  it("Restoring from localstorage",function(){
  
  });
});
