// Collection Views /////////////////////////////////////////////////

// Render whole Board view
game.BoardView = Backbone.View.extend({
  el: '#crosswordapp',
  initialize: function(){
    // game.board.on('reset', this.fillBoard, this);
    game.board.on('add', this.addSquare, this);
    game.board.fetch();
  },
  events: {
    'click #board .position': 'createSquare',
    'keyup .position': 'createSquareOnTab',
    'click #reset': 'fillBoard',
    'click #check'   : 'checkAnswers',
    'click #save': 'saveBoard'
  },
  fillBoard: function(){
    //_.each(game.board.models, this.destroy); // this doesn't work
    //game.board.reset(); // does not remove all views
    var squares = $('.position');
    for(i=0; i < squares.length; i++){
      var id = squares[i].id;
      $("#" + id + " .square .remove").click();
      var target = $('#' + id);
      $(target).click();
    }
  },
  clearBoard: function(){
    setTimeout(function(){
      var squares = $('.position');
      for(i=0; i < squares.length; i++){
        var id = squares[i].id;
        var input = $("#" + id + " .square .edit").val('');
      }
    }, 1500);
  },
  createSquareOnTab: function(e){
    var origin = e.currentTarget.id;

    // CHECK the calcs for this:
    if (e.which == 38 && origin >= 6){
      var target = parseInt(origin) - game.boardWidth;
    } else if (e.which == 39 || e.which == 13 || e.which == 9){
        var target = parseInt(origin) + 1;
    } else if (e.which == 40 && origin <= (game.boardWidth * game.boardWidth)-game.boardWidth) {
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
    this.position = parseInt(clickedspace.target.id);

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
    if(exists === false && this.position > 0 && this.position <= game.boardWidth * game.boardWidth){
      console.log("nothing else here");
      game.board.create(this);
      // console.log("Position to save: " + this.position);
    } else {
      console.log("there is already something here")
    }
  },
  addSquare: function(square){
    var view = new game.SquareView({model: square});
    var num = square.attributes.position;
    var location = $('#' + num)
    $(location).append(view.render().el);
  },
  checkAnswers: function(){
    var squares = $('.position');
    for(i=0; i < squares.length; i++){
      var id = squares[i].id;
      var target = $('#' + id + " .square .edit");
      $(target).dblclick();
    }
  },
  saveBoard: function(){
    console.log(this);
    var models = game.board.models;
    // console.log("models: ");
    // console.log(models);
    $(models).each(function(){
      this.attributes.solution = this.attributes.letter;
    });
    this.clearBoard();
  }
});

// Render all clues
game.CluesView = Backbone.View.extend({
  el: '#clues',
  inititalize: function(){
    game.clues.on('add', this.addClue, this);
  },
  events: {
    'click #add-clue-across': 'createClueAcross',
    'click #add-clue-down': 'createClueDown'
  },
  addClueAcross: function(clue) {
    var view = new game.ClueView({model: clue});
    $('#clues-list-across').append(view.render().el);
  },
  addClueDown: function(clue) {
    var view = new game.ClueView({model: clue});
    $('#clues-list-down').append(view.render().el);
  },
  createClueAcross: function(){
    console.log(this);
    var model = game.board.create({cnumber: 1, ctext: "test text", clength: 4});
    this.addClueAcross(model);
  },
  createClueDown: function(){
    console.log(this);
    var model = game.board.create({cnumber: 1, ctext: "test text", clength: 4});
    this.addClueDown(model);
  }
});

// Initialisers
// Backbone.history.start();
game.boardView = new game.BoardView();
game.cluesView = new game.CluesView();
