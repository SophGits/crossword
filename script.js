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
    this.model.save({letter: value});
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
    'click #board .position': 'createSquare',
    'keyup .position': 'createSquareOnTab'
  },
  createSquareOnTab: function(e){
    var origin = e.currentTarget.id;
    if (e.which == 38 && origin > 6){
      var target = parseInt(origin) - 5;
    } else if (e.which == 39 || e.which == 13 || e.which == 9){
        var target = parseInt(origin) + 1;
    } else if (e.which == 40 && origin < 35) {
       var target = parseInt(origin) + 5;
    } else if (e.which == 37 && origin > 1) {
       var target = parseInt(origin) - 1;
    } else {
      console.log(this);
    }
    var target = $('#' + target);
    $(target).click();
  },
  createSquare: function(clickedspace){
    $(this).select();
      // $(clickedspace).select().focus();
      this.position = clickedspace.target.id;
      game.board.create(this);
      // game.board.create(this.newAttributes());
  },
  addSquare: function(square){
    var view = new game.SquareView({model: square});
    var num = square.attributes.position;
    var location = $('#' + num)
    $(location).append(view.render().el);
  },
  newAttributes: function(){
    return{
      letter: "X",
      position: this.position
    }
  }
});

// Initialisers
Backbone.history.start();
game.boardView = new game.BoardView();
