// MODELS AND COLLECTIONS

// Creating board
var game = {
  boardWidth: 5
};

// Models /////////////////////////////////////////

game.Square = Backbone.Model.extend({
  defaults: {
    letter: '',
    solution: 'L',
    position: 0,
        cnumber: 0,
        ctext: '',
        clength: 0
  }
});

// game.Clue = Backbone.Model.extend({
//   defaults: {
//     cnumber: 0,
//     ctext: '',
//     clength: 0
//   }
// });

// Collections /////////////////////////////////////

//board
game.Board = Backbone.Collection.extend({ // a collection of squares
  model: game.Square,
  url: '#', // apparently just so an error isn't thrown later? Delete if you want.
  localStorage: new Store("Crossword"),
  saveyo: function(){
    this.save();
  }
});
game.board = new game.Board(); // initialise collection

//clues
// game.Clues = Backbone.Collection.extend({
//   model: game.Clue,
//   url: '#'
//   //localStorage: new Store("CrosswordClue") // how do I use the other store?
// })
// game.clues = new game.Clues();
