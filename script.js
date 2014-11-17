//  Testing Jasmine
var double = function(num){
  return num * 2;
}

// Creating board
var game = {};

// Models
game.Board = Backbone.Model.extend({
  defaults: {
    letter: ''
  }
});