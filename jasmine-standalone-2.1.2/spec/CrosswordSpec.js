describe("Setup tests", function(){

  it("should multiply a given value by 2", function() {
    expect(double(3)).toEqual(6);
  });

});

describe("Backbone Model tests", function(){
  it("should create a new model object with a 'letter' attribute", function(){
    var newSquare = new Backbone.Model({
      letter: "Animals"
    });
    expect(newSquare.get("letter")).toEqual("Animals");
  });
});

describe("Backbone Collection tests", function(){
  it("should create a new collection object", function(){
    // var newSquare = new Backbone.Model({letter: "Animals"});
    var newBoard = new Backbone.Collection({
      // model: newSquare,
      title: "New game board"
    });
    expect(newBoard.pluck("title")).toEqual(["New game board"]);
  });
});