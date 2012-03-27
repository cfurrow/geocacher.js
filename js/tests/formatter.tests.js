describe("formatter",function(){
  it("Can convert meters to miles.",function(){
    var meters = 1;
    var miles = meters * 0.000621371192;

    expect(formatter.metersToMiles(meters)).toEqual(miles.toFixed(2));
  });

  it("Can convert meters to feet.",function(){
    var meters = 1;  
    var feet = meters * 3.2808399;
    
    expect(formatter.metersToFeet(meters)).toEqual(feet.toFixed(2));
  });

  it("Can output a date to a date time string 24h format",function(){
    var date = new Date("1/1/2012 12:00"); 

    expect(formatter.getDateTimeString(date)).toEqual("2012.1.1 12:00:00");
  });
});
