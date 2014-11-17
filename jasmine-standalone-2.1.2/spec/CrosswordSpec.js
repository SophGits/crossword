describe("Setup tests", function(){

  it("should multiply a given value by 2", function() {
    expect(double(3)).toEqual(6);
  });

});

describe("Backbone Model tests", function(){
  it("should create a new model object with a 'letter' attribute", function(){
    var newBoard = new Backbone.Model({
      letter: "Animals"
    });
    expect(newBoard.get("letter")).toEqual("Animals");
  });
});