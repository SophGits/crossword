//  Testing Jasmine
var double = function(num){
  return num * 2;
}

// Creating board
var game = {};

// Models
game.Square = Backbone.Model.extend({
  defaults: {
    letter: '',
    position: 0
  }
});

// Collections
game.Board = Backbone.Collection.extend({ // a collection of squares
  model: game.Square,
  localStorage: new Store("crossword")
});
game.board = new game.Board(); // initialise collection

// Views

// Render individual Square view
game.SquareView = Backbone.View.extend({
  className: 'square',
  template: _.template($('#board-template').html()),
  render: function(){
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },
  initialize: function(){
    this.model.on('change', this.render, this);
    this.model.on('destroy', this.remove, this);
  },
  events: {
    'keyup .edit' : 'update',
    'click .remove' : 'destroy'
  },
  update: function(){
    this.input = this.$('.edit');
    var value = this.input.val();

    var position = this.position;

    this.model.save({letter: value, position: position});
  },
  destroy: function(){
    this.model.destroy();
  }
});
// var view = new game.SquareView({model: game.Square});

// Render whole Board view
game.BoardView = Backbone.View.extend({
  el: '#crosswordapp',
  initialize: function(){
    game.board.on('add', this.addSquare, this);
    game.board.fetch();
  },
  events: {
    'click #board .position': 'createSquare'
  },
  createSquare: function(clickedspace){
      this.position = clickedspace.target.id;
      game.board.create(this.newAttributes());
  },
  addSquare: function(square){
    var view = new game.SquareView({model: square});
    var num = square.attributes.position;
    var location = $('#' + num)
    $(location).append(view.render().el);

  },
  newAttributes: function(){
    // console.log(this);
    // if(this.input){
    //   return{letter: this.input.val()}
    // } else {
      return{
        letter: "^_^",
        position: this.position
      }
    // }
  }
});

// Initialisers
Backbone.history.start();
game.boardView = new game.BoardView();
