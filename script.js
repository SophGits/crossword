//  Testing Jasmine
var double = function(num){
  return num * 2;
}

// Creating board
var game = {
  boardWidth: 5
};

// Models
game.Square = Backbone.Model.extend({
  defaults: {
    letter: '-',
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
    console.log("Updated letter: ", this.model.attributes.letter);
    console.log("Updated position: ", this.model.attributes.position);
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

    // CHECK the calcs for this:
    if (e.which == 38 && origin > 6){
      var target = parseInt(origin) - game.boardWidth;
    } else if (e.which == 39 || e.which == 13 || e.which == 9){
        var target = parseInt(origin) + 1;
    } else if (e.which == 40 && origin < (game.boardWidth * game.boardWidth)-game.boardWidth) {
       var target = parseInt(origin) + game.boardWidth;
    } else if (e.which == 37 && origin > 1) {
       var target = parseInt(origin) - 1;
    } else {
      // console.log("createSquareOnTab: ",this);
    }
    console.log("target: " + target);
    var target = $('#' + target);
    $(target).click();
  },
  createSquare: function(clickedspace){
    this.position = clickedspace.target.id;

    // if coming from a direction keypress, select the target box's input
    $('#' + this.position + " input").select();

    //checking the position numbers of existing models
    var positions = [];
    modelsArray = game.board.models;
    $(modelsArray).each(function(){
      var position = this.attributes.position;
      return positions.push(position);
    });
    var exists = positions.some(function(el, i, arr){return el == clickedspace.target.id});

    // only create if there isn't one there already
    if(exists === false && this.position > 0 && this.position < game.boardWidth * game.boardWidth){
      console.log("nothing else here");
      game.board.create(this);
    } else {
      console.log("there is already something here")
    }
  },
  addSquare: function(square){
    var view = new game.SquareView({model: square});
    var num = square.attributes.position;
    var location = $('#' + num)
    $(location).append(view.render().el);
  }
});

// Initialisers
Backbone.history.start();
game.boardView = new game.BoardView();
