describe("history",function(){
  it("Restoring from localstorage calls callback",function(){
    var spy = sinon.spy();
    history.restoreFromStorage(spy);

    expect(spy.called).toBeTruthy();
  });

  it("Restoring from localstorage, adds history to history container.",function(){
    var spyHistoryView = sinon.spy(historyView,"addNewHistoryRow"); 
    var spyHistoryAdd = sinon.spy(history,"add");
    var spy2 = sinon.spy();

    history.restoreFromStorage(spy2);

    expect(spyHistoryAdd.called).toBeTruthy();

    historyView.addNewHistoryRow.restore();
    history.add.restore();
  });
});
