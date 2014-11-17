//  Testing Jasmine
var double = function(num){
  return num * 2;
}

// Creating board
var game = {};

// Models
game.Square = Backbone.Model.extend({
  defaults: {
    letter: ''
  }
});

// Collections
game.Board = Backbone.Collection.extend({ // a collection of squares
  model: game.Square,
  localStorage: new Store("crossword")
});

game.board = new game.Board();